/**
 * 执行终端相关的命令
 */

const { spawn } = require("child_process"); // 子进程模块

const commandSpawn = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args);

    /**
     * 将子进程的输出流赋值给当前进程，以显示各种执行信息
     */
    childProcess.stdout.pipe(process.stdout);
    childProcess.stderr.pipe(process.stderr);

    childProcess.on("close", () => {
      resolve();
    });
  });
};

module.exports = { commandSpawn };
