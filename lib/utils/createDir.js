const path = require('path')
const fs = require('fs')

// /a/b/c/d
const createDir = (dirPath) => {
    if(fs.existsSync(dirPath)) {
        return
    }

    const dirname = path.dirname(dirPath)
    const isDirExist = path.dirname(dirPath)

    createDir(dirname)

    if(isDirExist) {
        fs.mkdirSync(dirPath)
    }
}

module.exports = createDir