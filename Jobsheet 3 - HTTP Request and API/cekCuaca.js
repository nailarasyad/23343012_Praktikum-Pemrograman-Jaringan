const request = require('postman-request')
const urlCuaca =
'http://api.weatherstack.com/current?access_key=984941fced4a20dbbae33961334850eb&query=-0.8972474428263635,%20100.35078330452824&units=m'

request({ url: urlCuaca, json: true }, (error, response) => {
    const suhu = response.body.current.temperature
    const hujan = response.body.current.precip
    const deskripsi = response.body.current.weather_descriptions[0]

    console.log('Cuaca saat di lokasi')
    console.log('Deskripsi cuaca: ' + deskripsi)
    console.log('suhu udara: ' + suhu + '°C')
    console.log('kemungkinan hujan: ' + hujan + '%')
})
