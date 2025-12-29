const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=984941fced4a20dbbae33961334850eb&query=-0.8972474428263635,%20100.35078330452824' +
        latitude + ',' + longitude + '&units=m'

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Tidak dapat terkoneksi ke layanan cuaca', undefined)
        } else if (body.error) {
            callback('Tidak dapat menemukan lokasi cuaca', undefined)
        } else {
            callback(undefined, 
                `Info Cuaca: ${body.current.weather_descriptions[0]}. ` +
                `Suhu saat ini ${body.current.temperature} derajat. ` +
                `Index UV: ${body.current.uv_index}. ` +
                `Visibilitas: ${body.current.visibility} km.`
            )
        }
    })
}

module.exports = forecast
