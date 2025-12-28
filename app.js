// const fs = require('fs')

// const yargs = require("yargs");
// const { require } = require("yargs");

// // fs.writeFileSync ('catatan.txt', 'Nama Saya Naila Rasyad')
// fs.appendFileSync('catatan.txt', ' Saya tinggal di Pariaman')

// const catatan = require('./catatan.js')
// const pesan = catatan()
// console.log(pesan)

// const validator = require('validator')
// const ambilCatatan = require('./catatan.js')
// const pesan = ambilCatatan()
// console.log(pesan)
// console.log(validator.isURL('https://naila.com'))

// const chalk = require('chalk');

// console.log(chalk.blue.bgRed.bold('print warna biru sukses'));

// console.log('Halo Naila!');

// console.log('Hello World');

// const ambilCatatan = require('./catatan.js')

// const command = process.argv[2]
// console.log(process.argv[3])

// if (command === 'tambah') { 
//     console.log('Tambah Catatan') 
// } else if (command === 'hapus') { 
//     console.log('Hapus Catatan') 
// }


const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const catatan = require('./catatan.js');
const { argv } = require('yargs');
//kostumisasi versi yargs
const cli = yargs(hideBin(process.argv));

cli.version('10.1.0');

//membuat perintah (command) 'tambah'
cli.command({
    command: 'tambah',
    describe: 'tambah sebuah catatan baru',
    bluider: {
        judul: {
            describe: 'Judul catatan',
            demandOption: true,
            type: 'string'
        },
        isi: {
            describe: 'Isi catatan',
            demandOption: true,
            typr: 'string'
        }
    },
    handler: function (argv) {
        // console.log('Judul: ' + argv.judul)
        // console.log('Isi: ' + argv.isi)
        catatan.tambahCatatan(argv.judul, argv.isi)
    }
})

//perintah hapus
cli.command({
    command: 'hapus',
    describe: 'hapus catatan',
    bluider: {
        judul: {
            describe: 'Judul catatan yang ingin dihapus',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        // console.log('Catatan berhasil dihapus');
        catatan.hapusCatatan(argv.judul)
    }
});

//Menampilkan catatan
cli.command({
    command: 'list',
    describe: 'Menampilkan semua catatan',
    handler() {
        catatan.listCatatan();
    }
});

//Membaca catatan
cli.command({
    command: 'read',
    describe: 'Membaca sebuah catatan',
    builder: {
        judul: {
            describe: 'Judul catatan yang ingin dibaca',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        catatan.bacaCatatan(argv.judul);
    }
});

//latakan bagian ini pada baris terakhir
cli.parse();