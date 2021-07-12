const request = require('postman-request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=eadf7a3a64f37c3b61601cbc649b1c02&query=' + latitude + ',' + longitude


    request(url, (error, response, body) => {
        const data = JSON.parse(body)
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (data.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, data.current.weather_descriptions[0] + ' It is currently ' + data.current.temperature + ' degrees out. it feels like ' + data.current.feelslike + ' degrees out. ')
        }
    });
}

module.exports = forecast