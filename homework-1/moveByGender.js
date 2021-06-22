const fs = require('fs')
const path = require('path')

const dir18Path = path.join(__dirname, 'dec-2020', '18-00')
const dir20Path = path.join(__dirname, 'dec-2020', '20-00')

const boysPath = path.join(__dirname, 'dec-2020', 'boys')
const girlsPAth = path.join(__dirname, 'dec-2020', 'girls')

fs.mkdir(boysPath, (err => {}))
fs.mkdir(girlsPAth, (err => {}))

function moveByGender() {

  fs.readdir(dir18Path, (err, files) => {
    if (err) console.log(err)
    files.forEach(file => {
      fs.readFile(path.join(dir18Path, file), (err, data) => {
        const checkedFile = JSON.parse(data.toString())

        for (let fileElement of checkedFile) {
          fileElement.gender === 'male'
            ? fs.rename(path.join(dir18Path, file), path.join(boysPath, file), err => {})
            : fs.rename(path.join(dir18Path, file), path.join(girlsPAth, file), err => {})
        }
      })
    })
  })

  fs.readdir(dir20Path, (err, files) => {
    if (err) console.log(err)
    files.forEach(file => {
      fs.readFile(path.join(dir20Path, file), (err, data) => {
        const checkedFile = JSON.parse(data.toString())

        for (let fileElement of checkedFile) {
          fileElement.gender === 'male'
            ? fs.rename(path.join(dir20Path, file), path.join(boysPath, file), err => {})
            : fs.rename(path.join(dir20Path, file), path.join(girlsPAth, file), err => {})
        }
      })
    })
  })
}

module.exports = moveByGender