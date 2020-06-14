# vue-cli

[TOC]

## vue-cli

https://cli.vuejs.org/zh/

<u>vue-cli</u> 是 <u>vue</u> 提供的一个用于自动化构建和开发项目的工具，也称为：<u>脚手架</u>，它是一系列工具的集合，它主要有：

- 根据配置选项自动构建项目，并安装所需要的依赖
- 启动一个本地开发服务器，通过这个服务器可以基于服务器环境访问本地项目，同时提供了跨域代理服务
- 项目的自动编译、打包
- 项目测试（单元测试、e2e测试）

### 安装

```bash
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

安装成功以后，会提供一个 `vue` 的命令

**查看版本**

```bash
vue --version
# OR
vue -V
```

**帮助**

```bash
vue --help
# OR
vue -h
```

### 创建项目

<u>vue-cli</u> 提供了两种方式来创建项目

- 命令行 - cli
- 图形界面（基于浏览器） - ui

#### 命令行方式创建项目 

```bash
vue create 项目名称
```

#### 基于浏览器图形界面方式创建项目

```bash
vue ui
```

### 运行

项目创建成功以后，进入项目根目录，打开 <u>package.json</u> 文件，我们可以看到

```json
{
  ...,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build"
  },
	...
}
```

[https://cli.vuejs.org/zh/guide/cli-service.html#%E4%BD%BF%E7%94%A8%E5%91%BD%E4%BB%A4](https://cli.vuejs.org/zh/guide/cli-service.html#使用命令)

### 打包

打包的具体命令，我们在后期项目开发完成以后再说

### 项目目录结构文件说明

![vue-directory](vue-directory.png)

**src**

先来说一个最重要的目录 <u>src</u> ，这个就是存放的就是我们项目源码的目录，我们开发过程中大部分的时间就在这个目录中

- main.js

项目的入口文件

- App.vue

首先，这是 <u>vue</u> 提供的一种单文件组件的文件模式（后续会讲），一个 <u>.vue</u> 文件就是一个独立的组件，这里的 <u>App.vue</u> 是应用的根组件

- components 目录

存放组件的目录

- assets 目录

存放静态资源的目录，比如：图片，css 等。这里的文件与外层 <u>public</u> 目录存放的静态资源的最大区别是：<u>assets</u> 存放的资源是通过 <u>import</u> 等方式作为模块导入，最后打包处理的。而 <u>public</u> 中的资源并不通过模块方式导入，一般都是通过 <u>script</u> 、<u>link</u> 、<u>img</u> 等方式从浏览器引入的资源，比如无法通过模块化处理的 js 文件（这样的需求情况并不多）

**public**

一些并非通过模块方式引入的资源文件存放的位置，一般都是通过 script 、link 、img 等方式从浏览器引入的资源，比如无法通过模块化处理的 js 文件（这样的需求情况并不多）