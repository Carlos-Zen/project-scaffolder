import { Command } from 'commander'
import inquirer from 'inquirer'
import chalk from 'chalk'
import fs from 'fs-extra'
import path from 'path'
import Handlebars from 'handlebars'

interface TemplateConfig {
  name: string
  description: string
  questions?: inquirer.QuestionCollection
  files: {
    source: string
    target: string
    template?: boolean
  }[]
  postInstall?: string[]
}

// 内置模板
const BUILTIN_TEMPLATES: Record<string, TemplateConfig> = {
  'node-ts': {
    name: 'Node.js + TypeScript',
    description: 'Node.js project with TypeScript',
    questions: [
      { type: 'input', name: 'name', message: 'Project name:', default: 'my-project' },
      { type: 'input', name: 'description', message: 'Description:' },
      { type: 'input', name: 'author', message: 'Author:' }
    ],
    files: [
      { source: 'package.json.hbs', target: 'package.json', template: true },
      { source: 'tsconfig.json', target: 'tsconfig.json' },
      { source: 'src/index.ts', target: 'src/index.ts' },
      { source: 'README.md.hbs', target: 'README.md', template: true },
      { source: 'gitignore', target: '.gitignore' }
    ]
  },
  'vue3': {
    name: 'Vue 3 + Vite',
    description: 'Vue 3 project with Vite and TypeScript',
    questions: [
      { type: 'input', name: 'name', message: 'Project name:', default: 'my-vue-app' },
      { type: 'input', name: 'description', message: 'Description:' },
      { type: 'confirm', name: 'router', message: 'Add Vue Router?', default: true },
      { type: 'confirm', name: 'pinia', message: 'Add Pinia?', default: true }
    ],
    files: [
      { source: 'package.json.hbs', target: 'package.json', template: true },
      { source: 'vite.config.ts', target: 'vite.config.ts' },
      { source: 'tsconfig.json', target: 'tsconfig.json' },
      { source: 'index.html', target: 'index.html' },
      { source: 'src/main.ts', target: 'src/main.ts' },
      { source: 'src/App.vue', target: 'src/App.vue' }
    ]
  },
  'cli': {
    name: 'CLI Tool',
    description: 'Command-line tool with TypeScript',
    questions: [
      { type: 'input', name: 'name', message: 'CLI name:', default: 'my-cli' },
      { type: 'input', name: 'description', message: 'Description:' }
    ],
    files: [
      { source: 'package.json.hbs', target: 'package.json', template: true },
      { source: 'tsconfig.json', target: 'tsconfig.json' },
      { source: 'src/index.ts', target: 'src/index.ts' },
      { source: 'README.md.hbs', target: 'README.md', template: true }
    ]
  }
}

async function scaffoldProject(templateName: string, targetDir: string) {
  const template = BUILTIN_TEMPLATES[templateName]
  if (!template) {
    console.error(chalk.red(`Template "${templateName}" not found`))
    process.exit(1)
  }

  console.log(chalk.blue(`\n📦 Creating ${template.name}...\n`))

  // 收集用户输入
  const answers = await inquirer.prompt(template.questions || [])

  // 创建目标目录
  const projectDir = path.resolve(targetDir, answers.name || '.')
  await fs.ensureDir(projectDir)

  // 模板目录（实际项目中应该从模板文件读取）
  const templatesDir = path.join(__dirname, '..', 'templates', templateName)

  // 复制文件
  for (const file of template.files) {
    const sourcePath = path.join(templatesDir, file.source)
    const targetPath = path.join(projectDir, file.target)

    await fs.ensureDir(path.dirname(targetPath))

    if (file.template && await fs.pathExists(sourcePath)) {
      // 处理模板文件
      const content = await fs.readFile(sourcePath, 'utf-8')
      const compiled = Handlebars.compile(content)
      const result = compiled({ ...answers, name: answers.name || path.basename(projectDir) })
      await fs.writeFile(targetPath, result)
    } else if (await fs.pathExists(sourcePath)) {
      // 直接复制
      await fs.copy(sourcePath, targetPath)
    } else {
      // 生成默认文件
      await generateDefaultFile(targetPath, file.source, answers)
    }

    console.log(chalk.green('  ✓'), file.target)
  }

  // 完成
  console.log(chalk.green.bold('\n✨ Project created successfully!\n'))
  console.log(chalk.white('Next steps:'))
  console.log(chalk.cyan(`  cd ${answers.name || '.'}`))
  console.log(chalk.cyan('  npm install'))
  console.log(chalk.cyan('  npm run dev\n'))
}

async function generateDefaultFile(targetPath: string, sourceName: string, answers: any) {
  const name = answers.name || 'my-project'

  if (sourceName === 'package.json.hbs') {
    const content = {
      name,
      version: '0.1.0',
      description: answers.description || '',
      author: answers.author || '',
      scripts: {
        dev: 'tsx src/index.ts',
        build: 'tsc'
      },
      devDependencies: {
        typescript: '^5.4.0',
        tsx: '^4.7.0'
      }
    }
    await fs.writeJson(targetPath, content, { spaces: 2 })
  } else if (sourceName === 'tsconfig.json') {
    const content = {
      compilerOptions: {
        target: 'ESNext',
        module: 'ESNext',
        moduleResolution: 'bundler',
        strict: true,
        esModuleInterop: true,
        outDir: 'dist'
      },
      include: ['src/**/*'],
      exclude: ['node_modules']
    }
    await fs.writeJson(targetPath, content, { spaces: 2 })
  } else if (sourceName === 'src/index.ts') {
    await fs.writeFile(targetPath, `console.log('Hello, ${name}!')\n`)
  } else if (sourceName === 'README.md.hbs') {
    await fs.writeFile(targetPath, `# ${name}\n\n${answers.description || ''}\n`)
  } else if (sourceName === 'gitignore') {
    await fs.writeFile(targetPath, 'node_modules\ndist\n.env\n')
  }
}

// CLI
const program = new Command()

program
  .name('create-project')
  .description('Scaffold a new project from templates')
  .version('0.1.0')
  .argument('[template]', 'Template name')
  .argument('[directory]', 'Target directory', '.')
  .action(async (template, directory) => {
    if (!template) {
      // 显示模板列表
      console.log(chalk.blue('\nAvailable templates:\n'))
      Object.entries(BUILTIN_TEMPLATES).forEach(([key, config]) => {
        console.log(chalk.green(`  ${key.padEnd(12)}`), config.description)
      })
      console.log()

      const { selected } = await inquirer.prompt([{
        type: 'list',
        name: 'selected',
        message: 'Select a template:',
        choices: Object.keys(BUILTIN_TEMPLATES)
      }])

      template = selected
    }

    await scaffoldProject(template, directory)
  })

program.parse()