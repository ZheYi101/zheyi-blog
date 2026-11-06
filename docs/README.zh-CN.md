# 🍥Fuwari

基于 [Astro](https://astro.build) 开发的静态博客模板。

[**🖥️在线预览（Vercel）**](https://fuwari.vercel.app)

![Preview Image](https://raw.githubusercontent.com/saicaca/resource/main/fuwari/home.png)

## ✨ 功能特性

- [x] 基于 Astro 和 Tailwind CSS 开发
- [x] 流畅的动画和页面过渡
- [x] 亮色 / 暗色模式
- [x] 自定义主题色和横幅图片
- [x] 响应式设计
- [ ] 评论
- [x] 搜索
- [x] 文内目录

## 👀 要求

- Node.js <= 22
- pnpm <= 9

## 🚀 使用方法 1

使用 [create-fuwari](https://github.com/L4Ph/create-fuwari) 在本地初始化项目。

```sh
# npm
npm create fuwari@latest

# yarn
yarn create fuwari

# pnpm
pnpm create fuwari@latest

# bun
bun create fuwari@latest

# deno
deno run -A npm:create-fuwari@latest
```

1. 通过配置文件 `src/config.ts` 自定义博客
2. 执行 `pnpm new-post <filename>` 创建新文章，并在 `src/content/posts/` 目录中编辑
3. 参考[官方指南](https://docs.astro.build/zh-cn/guides/deploy/)将博客部署至 Vercel, Netlify, GitHub Pages 等；部署前需编辑 `astro.config.mjs` 中的站点设置。

## 🚀 使用方法 2

1. 使用此模板[生成新仓库](https://github.com/saicaca/fuwari/generate)或 Fork 此仓库
2. 进行本地开发，Clone 新的仓库，执行 `pnpm install` 和 `pnpm add sharp` 以安装依赖  
   - 若未安装 [pnpm](https://pnpm.io)，执行 `npm install -g pnpm`
3. 通过配置文件 `src/config.ts` 自定义博客
4. 执行 `pnpm new-post <filename>` 创建新文章，并在 `src/content/posts/` 目录中编辑
5. 参考[官方指南](https://docs.astro.build/zh-cn/guides/deploy/)将博客部署至 Vercel, Netlify, GitHub Pages 等；部署前需编辑 `astro.config.mjs` 中的站点设置。

## 🌐 英文优先的双语发布

英文首页位于 `/`，文章位于 `/posts/{slug}/`，归档、关于和友链分别位于 `/archive/`、`/about/`、`/friendLink/`。
中文页面使用相同路径并加上 `/zh/` 前缀；分页分别为 `/2/` 和 `/zh/2/`。
`src/config.ts` 中的 `siteConfig.defaultLocale` 为 `"en"`。界面语言由访问的 URL 决定，不会被浏览器语言或已保存的偏好覆盖。

先写英文原文，再以相同目录和文件名添加中文译文：

```sh
pnpm new-post misc/my-post          # 创建 misc/my-post.en.md
pnpm new-post misc/my-post.zh.md    # 创建 misc/my-post.zh.md
pnpm new-post misc/interactive.en.mdx
```

未指定语言的 `.md`、`.mdx` 文件名会自动添加 `.en`；显式指定的 `.en`、`.zh` 后缀会保留。
两个版本共享不带语言后缀的文章 slug。旧的无语言后缀文章仍识别为中文。
缺少译文时，两种界面都会显示已有的版本，因此可以先发布英文，稍后补充中文。
英文文内链接使用 `/posts/.../`，中文使用 `/zh/posts/.../`。文章分类由目录决定，无需填写 `category`。

英文 RSS 为 `/rss-en.xml`，中文为 `/zh/rss.xml`。
Vercel 上的 `/rss.xml` 会永久重定向至中文 RSS，保留旧文章的订阅标识；旧 `/en/...` 链接会永久重定向至对应的英文页面。
重定向规则位于 `vercel.json`，`pnpm preview` 不会执行这些规则；其他托管平台需配置等效规则。
原来不带语言前缀的文章 URL 现在提供英文版本。

## ⚙️ 文章 Frontmatter

```yaml
---
title: My First Blog Post
published: 2023-09-09
description: This is the first post of my new Astro blog.
image: ./cover.jpg
tags: [Foo, Bar]
draft: false
lang: en      # 文章内容语言；中文译文使用 zh-CN
---
```

## 🧞 指令

下列指令均需要在项目根目录执行：

| Command                           | Action                            |
|:----------------------------------|:----------------------------------|
| `pnpm install` 并 `pnpm add sharp` | 安装依赖                              |
| `pnpm dev`                        | 在 `localhost:4321` 启动本地开发服务器      |
| `pnpm build`                      | 构建网站至 `./dist/`                   |
| `pnpm preview`                    | 本地预览已构建的网站                        |
| `pnpm new-post <filename>`        | 创建新文章                             |
| `pnpm astro ...`                  | 执行 `astro add`, `astro check` 等指令 |
| `pnpm astro --help`               | 显示 Astro CLI 帮助                   |
