const { promisify } = require("util");
const download = promisify(require("download-git-repo")); // 转化为promise函数
const { vueRepo } = require("../config/repo-config");
const { commandSpawn } = require("../utils/terminal");
const path = require("path");
const open = (...args) => import("open").then((m) => m.default(...args)); // 新版本open是esmodule
const useSpinner = require("../utils/useSpinner");
const compile_template = require("../utils/compile_template");
const writeToFile = require('../utils/writeToPath')
const { program } = require("commander");
const createDir =require('../utils/createDir')


const isWin = /^win/.test(process.platform);
const useNpm = isWin ? "npm.cmd" : "npm";

const createProjectAction = async (project) => {
  // 1.clone 项目

  const spinnerDownload = await useSpinner("🚀 模板拉取中...\n");
  await download(vueRepo, project, { clone: true });
  spinnerDownload.succeed("模板拉取完毕\n");

  // 2.安装依赖
  const staticOptions = {
    cwd: path.resolve(`./${project}`),
    shell: isWin, // win版本必须加上shell，不然高版本node报错
  };

  // 初始化git仓库，为项目的husky做准备
  const spinnerGit = await useSpinner("🐧 初始化git仓库...\n");
  await commandSpawn("git", ["init"], staticOptions);
  spinnerGit.succeed("git init 完毕\n");

  const spinnerDeps = await useSpinner("⚡ 正在进行依赖安装...\n");
  await commandSpawn(useNpm, ["install"], staticOptions);
  spinnerDeps.succeed("依赖安装完毕\n");

  // 3.执行运行命令
  const spinnerRun = await useSpinner("😀 运行项目中...");

  /**
   * 这里不使用await，是因为子进程运行项目后，并不会关闭，所以promise并不会resolve
   */
  commandSpawn(useNpm, ["run", "dev"], staticOptions);

  // 4.打开浏览器, 使用open库
  //   open("http://localhost:5173");
};

// 添加组件的action
const addCpnAction = async (name, target) => {
  // 1.使用ejs编译ejs 模板文件，并得到转译后的string
  const templateStr = await compile_template(
    path.resolve(__dirname, "../templates/vue-template.ejs"),
    { data: { name }}
  );

  // 2.创建对应文件夹，如果指定的文件夹不存在的话，递归创建
  const options = program.opts()
  const dirPath = path.resolve(process.cwd(), options.dirname || './src/components')

  createDir(dirPath)

  // 3.写入对应文件
  const filePath = path.resolve(dirPath, `${name}.vue`)

  writeToFile(filePath, templateStr)


};

module.exports = {
  createProjectAction,
  addCpnAction,
};
