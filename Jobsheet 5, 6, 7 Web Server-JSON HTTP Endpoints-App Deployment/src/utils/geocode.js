const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        encodeURIComponent(address) +
        '.json?access_token=pk.eyJ1IjoibmFpbGFyYXN5YWQiLCJhIjoiY21oMmExbWo3MHc3M3lwcXB2MjJvMGd0eCJ9.5TaRoKN8qFYIJXxO1kS8bQ&limit=1'

    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Tidak dapat terkoneksi ke layanan', undefined)
        } else if (!body.features || body.features.length === 0) {
            callback('Tidak dapat menemukan lokasi. Coba lokasi lain.', undefined)
        } else {
            const feature = body.features[0]
            callback(undefined, {
                latitude: feature.center[1],
                longitude: feature.center[0],
                location: feature.place_name
            })
        }
    })
}

module.exports = geocode
