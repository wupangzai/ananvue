const { program } = require("commander");

const helpOptions = () => {
  // 使用 --help时，增加options
  program.option("-a --anan", "anan-vue-cli");

  // 自定义命令传入的参数
  program.option(
    "-d --dirname <dirname>",
    "a dirname folder, for example, -d ./src/components"
  );

  // 可以监听具体的指令
  program.on("--help", () => {
    console.log("");
    console.log("others: \n aaa");
  });
};

module.exports = helpOptions;
