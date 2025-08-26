const fs = require('fs')

const writeToFile = (filePath, content) => {
    fs.promises.writeFile(filePath, content)
}

module.exports = writeToFile