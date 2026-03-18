# Project Scaffolder

<p align="center">
  <strong>项目脚手架工具 | CLI Project Scaffolding Tool</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-green" alt="Node.js 18+">
  <img src="https://img.shields.io/badge/TypeScript-5.4-blue" alt="TypeScript 5.4">
  <img src="https://img.shields.io/badge/License-MIT-yellow" alt="MIT License">
</p>

<p align="center">
  <a href="#english">English</a> | <a href="#中文">中文</a>
</p>

---

<a name="english"></a>
## English

A CLI tool to scaffold new projects from templates. Get your project up and running in seconds with pre-configured templates.

### ✨ Features

- 📁 **Multiple Templates** - Node.js, Vue 3, CLI tools, and more
- 🎨 **Template Variables** - Customize project name, description, etc.
- ⚡ **Fast Generation** - Projects ready in seconds
- 📦 **Ready to Use** - Pre-configured with best practices
- 🔧 **Extensible** - Add your own templates

### 📦 Installation

```bash
npm install -g project-scaffolder
```

### 🚀 Usage

```bash
# Interactive mode - select template from list
create-project

# Direct mode - specify template and directory
create-project node-ts my-project
create-project vue3 my-vue-app

# Specify target directory
create-project cli ./tools/my-cli
```

### 📋 Available Templates

| Template | Description | Features |
|----------|-------------|----------|
| `node-ts` | Node.js + TypeScript | TypeScript, ESLint, tsconfig |
| `vue3` | Vue 3 + Vite | Vue 3, Vite, TypeScript, Router, Pinia |
| `cli` | CLI Tool | Commander, TypeScript, tsup |

### 🛠 Template Details

#### node-ts
```
my-project/
├── src/
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

#### vue3
```
my-vue-app/
├── src/
│   ├── main.ts
│   └── App.vue
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

#### cli
```
my-cli/
├── src/
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

### 💡 Interactive Prompts

When running without arguments, you'll be prompted:

```
? Select a template: (Use arrow keys)
❯ node-ts      Node.js + TypeScript
  vue3         Vue 3 + Vite
  cli          CLI Tool

? Project name: (my-project)

? Description:

? Author:
```

### ⚙️ Project Setup

After scaffolding:

```bash
cd my-project
npm install
npm run dev
```

### 🔧 Adding Custom Templates

Templates are defined in the source code. Each template includes:

1. **Questions** - Interactive prompts for customization
2. **Files** - List of files to generate
3. **Handlers** - Template variable processing

### 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| Node.js + TypeScript | Runtime & Language |
| Commander | CLI Framework |
| Inquirer | Interactive Prompts |
| Handlebars | Template Engine |
| fs-extra | File Operations |

### 📁 Project Structure

```
src/
├── index.ts      # CLI entry point
└── templates/    # Template definitions
```

### 📄 License

[MIT](LICENSE)

---

<a name="中文"></a>
## 中文

CLI项目脚手架工具。使用预配置模板快速启动项目。

### ✨ 特性

- 📁 **多种模板** - Node.js、Vue 3、CLI工具等
- 🎨 **模板变量** - 自定义项目名称、描述等
- ⚡ **快速生成** - 秒级创建项目
- 📦 **开箱即用** - 预配置最佳实践
- 🔧 **可扩展** - 添加自定义模板

### 📦 安装

```bash
npm install -g project-scaffolder
```

### 🚀 使用

```bash
# 交互模式 - 从列表选择模板
create-project

# 直接模式 - 指定模板和目录
create-project node-ts my-project
create-project vue3 my-vue-app

# 指定目标目录
create-project cli ./tools/my-cli
```

### 📋 可用模板

| 模板 | 描述 | 特性 |
|------|------|------|
| `node-ts` | Node.js + TypeScript | TypeScript, ESLint, tsconfig |
| `vue3` | Vue 3 + Vite | Vue 3, Vite, TypeScript, Router, Pinia |
| `cli` | CLI工具 | Commander, TypeScript, tsup |

### 🛠 模板详情

#### node-ts
```
my-project/
├── src/
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

#### vue3
```
my-vue-app/
├── src/
│   ├── main.ts
│   └── App.vue
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

#### cli
```
my-cli/
├── src/
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

### 💡 交互式提示

不带参数运行时，会有交互式提示：

```
? 选择模板: (使用方向键)
❯ node-ts      Node.js + TypeScript
  vue3         Vue 3 + Vite
  cli          CLI工具

? 项目名称: (my-project)

? 描述:

? 作者:
```

### ⚙️ 项目设置

创建项目后：

```bash
cd my-project
npm install
npm run dev
```

### 🔧 添加自定义模板

模板在源代码中定义，每个模板包含：

1. **Questions** - 自定义交互提示
2. **Files** - 要生成的文件列表
3. **Handlers** - 模板变量处理

### 🛠 技术栈

| 技术 | 用途 |
|------|------|
| Node.js + TypeScript | 运行时与语言 |
| Commander | CLI框架 |
| Inquirer | 交互式提示 |
| Handlebars | 模板引擎 |
| fs-extra | 文件操作 |

### 📁 项目结构

```
src/
├── index.ts      # CLI入口
└── templates/    # 模板定义
```

### 📄 许可证

[MIT](LICENSE)

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/Carlos-Zen">Carlos-Zen</a>
</p>