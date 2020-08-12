const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c2211bd8d873833492478d1aca7da8d1&query=' +latitude+ ',' +longitude+'&units=m'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback("Currently we cannot connect to weather service",undefined)
        }else if(body.error)
            {
                callback('Not Able to find the Given location',undefined)
            }
        else {
            let info=body.current.weather_descriptions+". Its currently " + body.current.temperature + "\' degree out." +"There is " + body.current.precip + "% chance of raining."+" Observed at "+body.current.observation_time
            callback(undefined,info)
        }
    })
}

module.exports=forecast