const { MongoClient, ObjectId } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const namaDatabase = 'testsaja';

async function main() {
    try {
        await client.connect();
        console.log('Berhasil terhubung ke MongoDB database server');

        const db = client.db(namaDatabase);

        // ===========================
        // Memperbaharui Data (updateOne)
        // ===========================
        const updateOnePromise = db.collection('pengguna').updateOne(
            { _id: new ObjectId('691b210d938d21b93ea87935') },
            {
                //$set: { nama: 'Rasyad' },
                // Contoh tambahan:
                $inc: { usia: 1 }
            }
        );

        // // UPDATE 1
        // await pengguna.updateOne(
        //     { _id: new ObjectId("691b210d938d21b93ea87935") },
        //     { $set: { nama: "Naila Rasyad", usia: 20 } }
        // );

        // // UPDATE 2
        // await pengguna.updateOne(
        //     { _id: new ObjectId("691b24139603628f87dda370") },
        //     { $set: { nama: "Fikran Rasyad", usia: 18 } }
        // );

        // updateOnePromise
        //     .then((result) => {
        //         console.log(result);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     })
        //     .finally(() => {
        //         client.close();
        //     });
        // ===========================
        // Contoh updateMany (dinonaktifkan)
        // ===========================
        
        db.collection('tugas').updateMany(
            { StatusPenyelesaian: false },
            { $set: { StatusPenyelesaian: true } }
        )
        .then((result) => {
            console.log(result.modifiedCount);
        })
        .catch((error) => {
            console.error(error);
        })
        .finally(() => {
            client.close();
        });
        
    } catch (error) {
        console.error(error);
    }
}
main();
