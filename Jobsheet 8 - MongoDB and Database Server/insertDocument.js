// Mengimport modul MongoClient dan ObjectId dari 'mongodb'.
const { MongoClient, ObjectId } = require('mongodb');

// Mendefinisikan URL MongoDB server yang akan digunakan untuk koneksi.
const url = 'mongodb://127.0.0.1:27017';

// Membuat instance MongoClient dengan URL koneksi yang telah didefinisikan sebelumnya.
const client = new MongoClient(url);

// Mendefinisikan nama database yang akan digunakan.
const namaDatabase = 'testsaja';

// Membuat instance ObjectId baru. ObjectId digunakan untuk menghasilkan unik identifier.
const id = new ObjectId();


/* BAGIAN INI MENCETAK INFORMASI ObjectID()  */
// Mencetak ObjectId yang baru dibuat ke konsol.
console.log(id);

// Mencetak representasi hexadecimal dari ObjectId.
console.log(id.id);

// Mencetak panjang dari representasi hexadecimal ObjectId ke konsol.
console.log(id.id.length);

// Mencetak timestamp kapan ObjectId tersebut dibuat.
console.log(id.getTimestamp());

// Mencetak panjang dari representasi ObjectId dalam bentuk string heksadesimal.
console.log(id.toHexString().length);


/* -------------------------- FUNGSI UTAMA -------------------------- */
async function main() {
    try {
        // Menghubungkan ke server MongoDB.
        await client.connect();
        console.log('Berhasil terhubung ke MongoDB database server');

        // Memilih database 'testsaja'.
        const db = client.db(namaDatabase);

        // Memilih koleksi 'pengguna'.
        const clPengguna = db.collection('pengguna');

        // Memilih koleksi 'tugas'.
        const clTugas = db.collection('tugas');


        /* --------------------- MEMASUKKAN SATU DATA --------------------- */

        const insertPengguna = await clPengguna.insertOne({
            _id: id,
            nama: 'Naila',
            usia: 20
        });
        console.log('Memasukkan data Pengguna ke koleksi =>', insertPengguna);

        /* --------------------- MEMASUKKAN BANYAK DATA --------------------- */

        const insertTugas = await clTugas.insertMany([
            { Deskripsi: 'Membersihkan rumah', StatusPenyelesaian: true },
            { Deskripsi: 'Mengerjakan tugas kuliah', StatusPenyelesaian: false },
            { Deskripsi: 'Memberikan bimbingan', StatusPenyelesaian: false }
        ]);
        console.log('Memasukkan data Tugas ke koleksi =>', insertTugas);

        return 'Data selesai dimasukkan.';

    } catch (err) {
        // Menangani kesalahan.
        console.error(err);

    } finally {
        // Menutup koneksi ke server MongoDB.
        client.close();
    }
}

// Memanggil fungsi 'main'.
main()
    .then(console.log)
    .catch(console.error);
