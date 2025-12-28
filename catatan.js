// const ambilCatatan = function() {
//     return 'Ini Catatan Naila Rasyad...'
// }
// module.exports = ambilCatatan

const fs = require('fs')
const chalk = require('chalk')

const ambilCatatan = function () {
    return 'Ini Catatan Naila Rasyad...'
}

const tambahCatatan = function (judul, isi) {
    const catatan = muatCatatan()
    const catatanGanda = catatan.filter(function (note){
        return note.title === judul
    })

    if (catatanGanda.length === 0) {
        catatan.push({
            judul: judul,
            isi: isi
        })
        simpanCatatan(catatan)
        console.log('Catatan baru ditambahakan!')
    } else {
        console.log('Judul catatan telah dipakai')
    }
}

const simpanCatatan = function (catatan){
    const dataJSON = JSON.stringify(catatan)
    fs.writeFileSync('catatan.json', dataJSON)
}

const muatCatatan = function () {
    try {
        const dataBuffer = fs.readFileSync('catatan.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const hapusCatatan = function (judul) {
    const catatan = muatCatatan()
    const catatanUntukDisimpan = catatan.filter(function (note) {
        return note.judul !== judul
    })

    if (catatan.length > catatanUntukDisimpan.length) {
        console.log(chalk.green.inverse('Catatan dihapus!'))
        simpanCatatan(catatanUntukDisimpan)
    } else {
        console.log(chalk.red.inverse('Catatan tidak ditemukan!'))
    }     
}

const listCatatan = () => {
    const catatan = muatCatatan();
    console.log(chalk.inverse('Daftar Catatan Kamu:'));
    catatan.forEach((note, index) => {
        console.log(`${index + 1}. ${note.judul}`);
    });
};

const bacaCatatan = (judul) => {
    const catatan = muatCatatan();
    const ditemukan = catatan.find((note) => note.judul === judul);

    if (ditemukan) {
        console.log(chalk.inverse(ditemukan.judul));
        console.log(ditemukan.isi);
    } else {
        console.log(chalk.red('Catatan tidak ditemukan!'));
    }
};



module.exports = {
    ambilCatatan: ambilCatatan,
    tambahCatatan: tambahCatatan,
    hapusCatatan: hapusCatatan,
    listCatatan: listCatatan,
    bacaCatatan: bacaCatatan
}

