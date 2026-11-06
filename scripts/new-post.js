/* Create an English original, or an explicitly named Chinese translation. */
import fs from "node:fs";
import path from "node:path";

function getDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

const [name] = process.argv.slice(2);
if (!name) {
	console.error("Usage: pnpm new-post <category/name[.en|.zh][.md|.mdx]>");
	process.exit(1);
}

const extension = /\.mdx?$/i.exec(name)?.[0] || ".md";
const stem = name.replace(/\.mdx?$/i, "");
const locale = /\.zh$/i.test(stem) ? "zh" : "en";
const localizedStem = /\.(en|zh)$/i.test(stem) ? stem : `${stem}.en`;
const targetDir = path.resolve("src/content/posts");
const fullPath = path.resolve(targetDir, `${localizedStem}${extension}`);
const relativePath = path.relative(targetDir, fullPath);

if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
	console.error("Error: Post must be inside src/content/posts.");
	process.exit(1);
}
if (fs.existsSync(fullPath)) {
	console.error(`Error: File ${fullPath} already exists`);
	process.exit(1);
}

const title = path.basename(stem).replace(/\.(en|zh)$/i, "");
const content = `---
title: ${JSON.stringify(title)}
published: ${getDate()}
description: ''
image: ''
tags: []
draft: false
lang: ${locale === "zh" ? "zh-CN" : "en"}
---
`;

fs.mkdirSync(path.dirname(fullPath), { recursive: true });
fs.writeFileSync(fullPath, content, { flag: "wx" });
console.log(`Post ${fullPath} created`);
