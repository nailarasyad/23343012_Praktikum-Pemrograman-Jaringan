const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/prediksiCuaca')
const axios = require('axios')
// const req = require('express/lib/request')
// const res = require('express/lib/response')


const app = express()
const port = process.env.PORT || 4000


//Maendefenisikan jalur/path untuk konfigurasi Express
const direktoriPublic = path.join(__dirname, '../public')
const direktoriViews = path.join(__dirname, '../templates/views')
const direktoriPartials = path.join(__dirname, '../templates/partials')

//Setup handlebars engine dan lokasi folder views
app.set('view engine', 'hbs')
app.set('views', direktoriViews)
hbs.registerPartials(direktoriPartials)

//Setup direktori statis
app.use(express.static(direktoriPublic))

// ini halaman/page utama
app.get('', (req, res) =>{
    res.render('index', {
        judul: 'Aplikasi Cek Cuaca',
        nama: 'Naila Rasyad',
    })
})

// ini halaman bantuan/FAQ (Freequently Asked Quetions)
app.get('/bantuan', (req, res) => {
    res.render('bantuan', {
        judul: 'Bantuan apa yang dibutuhkan?',
        teksBantuan: 'ini adalah teks bantuan',
        nama: 'Naila Rasyad',
    })
})

// halaman infoCuaca
app.get('/infoCuaca', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Kamu harus memasuki lokasi yang ingin dicari'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, dataPrediksi) => {
            if(error){
                return res.send({error})
            }
            res.send({
                prediksiCuaca: dataPrediksi,
                lokasi: location,
                address: req.query.address
            })
        })
    })
})

// halaman tentang
app.get('/tentang', (req, res) => {
    res.render('tentang', {
        judul: 'Tentang Saya',
        nama: 'Naila Rasyad',
    })
})

// === Halaman Berita ===
app.get('/berita', async (req, res) => {
    const API_KEY = '85b3585dade3eb225d3bc2de13cc7029'; 
    try {
        const url = `http://api.mediastack.com/v1/news?access_key=${API_KEY}&limit=10`;
        const response = await axios.get(url);

        const berita = response.data.data;

        if (!berita || berita.length === 0) {
            return res.render('berita', {
                judul: 'Berita Terkini',
                error: 'Belum ada berita untuk saat ini. Coba lagi nanti.',
                nama: 'Naila Rasyad'
            });
        }

        res.render('berita', {
            judul: 'Berita Terkini',
            berita,
            nama: 'Naila Rasyad',
        });

    } catch (error) {
        console.error(error);
        res.render('berita', {
            judul: 'Berita Terkini',
            error: 'Gagal memuat berita. Periksa koneksi atau API key kamu.'
        });
    }
});

app.use('/bantuan', (req, res) => {
    res.render('404', {
        judul: '404',
        nama: 'Naila Rasyad',
        pesanKesalahan: 'Artikel yang dicari tidak ditemukan.'
    })
})

app.use((req, res) => {
    res.render('404', {
        judul: '404',
        nama: 'Naila Rasyad',
        pesanKesalahan: 'Halaman tidak ditemukan.'
    })
})
  
// jalankan server
app.listen(port, () => {
    console.log('Server berjalan pada port ' + port)
})

