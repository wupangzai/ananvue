const ejs = require("ejs");

const compile_template = function (template, data) {
    console.log('[ data ] >', data)
  return new Promise((resolve, reject) => {
    ejs.renderFile(template, data, (err, str) => {
      if (err) {
        reject(err);
      }

      resolve(str);
    });
  });
};

module.exports = compile_template;
