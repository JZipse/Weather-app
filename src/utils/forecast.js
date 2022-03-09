const request = require('request')

const forecast = (lat, long, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=c1315a8a612adbe85e088cfec453fa83&query=${lat},${long}&units=f`
    request({ url: url, json: true}, (e, {body}) => {
        if(e){
             callback("Unable to connect to weather service", undefined);
            } else if (body.error){
                console.log(body)
            callback('Unable to find location', undefined);
            } else {
                callback(undefined, body.current.weather_descriptions[0] + '.' + ' It is currently ' + body.current.temperature + ' degrees out. With the wind it feels like ' + body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + '.')
            }
    })
}

module.exports = forecast