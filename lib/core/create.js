const { program } = require("commander");
const { createProjectAction, addCpnAction } = require("./actions");

const createCommands = () => {
  program
    // 创建指令
    .command("create <project> [others...]")
    // 描述
    .description("clone a vite-vue-ts-template respository into a folder")
    .action((project, others) => {
      createProjectAction(project, others);
    });

  program
    .command("addcpn <component>")
    .description("add a default vue component, e.g. ananvue add hello-word")
    .action((name, other) => {
      addCpnAction(name);
    });
};

module.exports = createCommands;
