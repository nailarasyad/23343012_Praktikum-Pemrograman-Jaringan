const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const namaDatabase = 'testsaja';

async function main() {
    try {
        await client.connect();
        console.log('Berhasil terhubung ke MongoDB database server');

        const db = client.db(namaDatabase);

        // Menghapus semua dokumen dengan usia = 20
        db.collection('pengguna')
            .deleteMany({ usia: 20 })
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.error(error);
            });
        
         db.collection('tugas').deleteOne({
            // contoh hapus berdasarkan nama tugas atau field lain
            Deskripsi: "Memberikan bimbingan"
            })
            .then(result => {
                console.log("Hasil deleteOne:");
                console.log(result);
            })
            .catch(error => {
                console.error("Error deleteOne:", error);
            });

    } catch (error) {
        console.error(error);
    }
}

main();
