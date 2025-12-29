// const request = require('postman-request')
// const url = 'http://api.weatherstack.com/current?access_key=984941fced4a20dbbae33961334850eb&query=-0.8972474428263635,%20100.35078330452824'
// request({url: url}, (error, response) => {
//     // console.log(response)
//     const data = JSON.parse(response.body)
//     // console.log(data)
//     // console.log(data.current)
//     console.log(data.current.temperature)
// })

// const geocodeURL =
// 'https://api.mapbox.com/geocoding/v5/mapbox.places/Padang.json?access_token=pk.eyJ1IjoibmFpbGFyYXN5YWQiLCJhIjoiY21oMjVmcDJmMWtiMDJvb2psYWZkdHdqaCJ9._pP7U68PhIPCr7JeOLV8DQ&limit=3'

// request({ url: geocodeURL, json: true}, (error, 
//     response) => {
//         const latitude = response.body.features[2].center[1]
//         const langitude = response.body.features[1].center[0]
//         console.log(latitude, langitude)
//     })


const request = require('postman-request')

const lokasi = 'Padang'

const mapboxToken = 'pk.eyJ1IjoibmFpbGFyYXN5YWQiLCJhIjoiY21oMjVmcDJmMWtiMDJvb2psYWZkdHdqaCJ9._pP7U68PhIPCr7JeOLV8DQ'
const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(lokasi)}.json?access_token=${mapboxToken}&limit=1`

request({ url: geocodeURL, json: true }, (error, response) => {
    if (error) {
        return console.log('Tidak dapat terhubung ke Mapbox API.')
    }

    const data = response.body

    if (data.features.length === 0) {
        return console.log(' Lokasi tidak ditemukan.')
    }

    const latitude = data.features[0].center[1]
    const longitude = data.features[0].center[0]
    const query = data.query[0]
    const placeName = data.features[0].place_name
    const placeType = data.features[0].place_type[0]

    console.log(`Koordinat lokasi anda adalah ${latitude}, ${longitude}`)
    console.log(`Data yang anda cari adalah: ${query}`)
    console.log(`Data yang ditemukan adalah: ${placeName}`)
    console.log(`Tipe lokasi adalah: ${placeType}`)


    const weatherToken = '984941fced4a20dbbae33961334850eb'
    const weatherURL = `http://api.weatherstack.com/current?access_key=${weatherToken}&query=${latitude},${longitude}&units=m`

    request({ url: weatherURL, json: true }, (error, response) => {
        if (error) {
            return console.log('Tidak dapat mengakses Weatherstack API.')
        }

        const weather = response.body.current

        console.log(`Saat ini suhu di ${lokasi} mencapai ${weather.temperature} derajat celcius.`)
        console.log(`Kemungkinan terjadinya hujan adalah ${weather.precip}%`)
    })
})
