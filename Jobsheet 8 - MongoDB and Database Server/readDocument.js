const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const namaDatabase = 'testsaja';

async function main() {
    try {
        await client.connect();
        console.log('Berhasil terhubung ke MongoDB database server');

        const db = client.db(namaDatabase);

        // Mencari satu dokumen dalam koleksi 'pengguna' berdasarkan nama 'Naila'.
        const byNama = await db
            .collection('pengguna')
            .findOne({ nama: 'Naila' });

        // Mencari satu dokumen berdasarkan ObjectId tertentu.
        const byObjectID = await db
            .collection('pengguna')
            .findOne({ _id: new ObjectId("691b24139603628f87dda370") });

        // Mencari beberapa dokumen dengan usia 20 dan mengubahnya menjadi array.
        const toArray = await db
            .collection('pengguna')
            .find({ usia: 20 })
            .toArray();

        // Mengecek apakah semua hasil pencarian tersedia.
        if (byNama && byObjectID && toArray) {
            console.log('Data Pengguna ditemukan (berdasarkan nama):', byNama);
            console.log('Data Pengguna ditemukan (berdasarkan ID Objek):', byObjectID);
            console.log('Data Pengguna ditemukan (dalam format Array):', toArray);
        } else {
            console.log('Data Pengguna tidak ditemukan');
        }

    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
}

// Menjalankan fungsi utama
main().catch(console.error);
