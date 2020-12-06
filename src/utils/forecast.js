const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const forecastURL = `http://api.weatherstack.com/current?access_key=${process.env.FORECAST_API_KEY}&query=${latitude},${longitude}&units=m`

    request({url: forecastURL, json: true}, (error, {body}) => {
        if(error){
            callback('Please check your network connection.', undefined)
        }else if(body.error){
            callback('Location not found.Please try again!', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees. Feels like " + body.current.feelslike + " degrees. The humidity is " + body.current.humidity+"%.")
        }
    })
}

module.exports = forecast