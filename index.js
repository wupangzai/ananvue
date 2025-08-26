#!/usr/bin/env node

const { program } = require("commander");
const helpOptions = require("./lib/core/help");
const createCommands = require("./lib/core/create");

// 实现版本 --versionananvue
program.version(require("./package.json").version);

// helpOptions模块
helpOptions();

// 创建其他的指令
createCommands();

// 解析node参数
program.parse(process.argv);
