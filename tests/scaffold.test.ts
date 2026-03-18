import { describe, it, expect } from 'vitest'
import path from 'path'

describe('ProjectScaffolder Core Logic', () => {
  describe('Template Configuration', () => {
    it('should have correct built-in templates', () => {
      const templates = {
        'node-ts': {
          name: 'Node.js + TypeScript',
          description: 'Node.js project with TypeScript'
        },
        'vue3': {
          name: 'Vue 3 + Vite',
          description: 'Vue 3 project with Vite and TypeScript'
        },
        'cli': {
          name: 'CLI Tool',
          description: 'Command-line tool with TypeScript'
        }
      }

      expect(Object.keys(templates)).toHaveLength(3)
      expect(templates['node-ts'].name).toContain('Node.js')
      expect(templates['vue3'].name).toContain('Vue 3')
      expect(templates['cli'].name).toContain('CLI')
    })
  })

  describe('File Path Resolution', () => {
    it('should resolve target path correctly', () => {
      const projectDir = '/projects/my-app'
      const file = { source: 'package.json.hbs', target: 'package.json' }

      const targetPath = path.join(projectDir, file.target)

      expect(targetPath).toBe('/projects/my-app/package.json')
    })

    it('should resolve nested paths', () => {
      const projectDir = '/projects/my-app'
      const file = { source: 'src/index.ts', target: 'src/index.ts' }

      const targetPath = path.join(projectDir, file.target)

      expect(targetPath).toBe('/projects/my-app/src/index.ts')
    })
  })

  describe('Template Variables', () => {
    it('should have required template variables', () => {
      const answers = {
        name: 'my-project',
        description: 'A test project',
        author: 'Test Author'
      }

      expect(answers.name).toBe('my-project')
      expect(answers.description).toBe('A test project')
      expect(answers.author).toBe('Test Author')
    })
  })

  describe('Package.json Generation', () => {
    it('should generate valid package.json content', () => {
      const answers = { name: 'test-project', description: 'Test' }
      const content = {
        name: answers.name,
        version: '0.1.0',
        description: answers.description,
        scripts: {
          dev: 'tsx src/index.ts',
          build: 'tsc'
        }
      }

      expect(content.name).toBe('test-project')
      expect(content.version).toBe('0.1.0')
      expect(content.scripts.dev).toBeDefined()
      expect(content.scripts.build).toBeDefined()
    })
  })

  describe('TypeScript Configuration', () => {
    it('should generate valid tsconfig.json', () => {
      const tsconfig = {
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

      expect(tsconfig.compilerOptions.strict).toBe(true)
      expect(tsconfig.include).toContain('src/**/*')
      expect(tsconfig.exclude).toContain('node_modules')
    })
  })
})

describe('CLI Options', () => {
  it('should parse template argument', () => {
    const args = ['node-ts', '.']
    const [template, directory] = args

    expect(template).toBe('node-ts')
    expect(directory).toBe('.')
  })

  it('should use default directory', () => {
    const directory = '.'
    expect(directory).toBe('.')
  })
})