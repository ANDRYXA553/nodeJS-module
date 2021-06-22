const fs = require('fs')
const path = require('path')

const dir18Path = path.join(__dirname, 'dec-2020', '18-00')
const dir20Path = path.join(__dirname, 'dec-2020', '20-00')

function switchUsers() {

  fs.readdir(dir18Path, (err, files) => {
    if (err) console.log(err)
    files.forEach(file => {
      fs.rename(path.join(dir18Path, file), path.join(dir20Path, file), err => {})
    })
  })

  fs.readdir(dir20Path, (err, files) => {
    if (err) console.log(err)
    files.forEach(file => {
      fs.rename(path.join(dir20Path, file), path.join(dir18Path, file), err => {})
    })
  })
}

module.exports = switchUsers