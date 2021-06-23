const request=require('request')

const weather=(address,callback) => {

    const url='http://api.weatherstack.com/current?access_key=55505dfd9ec1a6b5f64ba3a7a8061f6c&query=' + address

    request({url: url, json: true},(error,response={}) => {

        if(error)
        {
            callback('Unable to reach weather service!',undefined)
        }
        else if(response.body.error){
            
            callback('Unable to find location, Please try another!',undefined)
        }
        else{
            callback(undefined,{
                desc: response.body.current.weather_descriptions[0],
                curr_temp: response.body.current.temperature,
                feels_like: response.body.current.feelslike,
                humidity: response.body.current.humidity
            })
        }
    })

}

module.exports=weather