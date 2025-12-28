const fs = require('fs')

// const book = {
//     judul: 'Pemrograman Jaringan',
//     penulis: 'Naila Rasyad'
// }

// const bookJson = JSON.stringify(book)
// fs.writeFileSync('1-jsontest.json', bookJson)

const dataBuffer = fs.readFileSync('1-jsontest.json')
const dataJSON = dataBuffer.toString()
const data = JSON.parse(dataJSON)
// console.log(data)
console.log(data.penulis)