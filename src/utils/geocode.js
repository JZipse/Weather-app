const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoianppcHNlMzMiLCJhIjoiY2wwZ3lrZXcxMDNoNTNrbWpoOWJvY3BsNiJ9.rTzlQQve68X4icmLFMN30g&limit=1`
    request({url: url, json: true}, (e, {body}) => {
        if(e){
            callback('Unable to connect to location services', undefined);
        } else if (body.message){
            callback('Could not find location', undefined)
        } else if (body.features.length === 0){
            callback('Could not find location', undefined)
        } else {
            const data = {
                lat: body.features[0].center[1],
                long: body.features[0].center[0],
                location: body.features[0].place_name
            }
            callback(undefined, data)
        }
    });
}


module.exports = geocode