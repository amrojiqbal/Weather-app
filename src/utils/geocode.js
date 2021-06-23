
const request=require('request')

const geocode=(address,callback) => {
    
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW1yb2ppcWJhbCIsImEiOiJja3Bza25tZ3MwNTZuMnZwaWs5ZHdqdWVmIn0.rmAXH8lu2COoca9VI0wV5w&limit=1'

    request({ url: url, json:true}, (error,response)=>{

        if(error){
            callback('Unable to Access Geo_Code Service!',undefined)
        }
        else if(response.body.features.length===0){
            callback('Unable to find location, Try another',undefined)
        }
        else{
            const longitude=response.body.features[0].center[0]
            const latitude=response.body.features[0].center[1]
            const place=response.body.features[0].place_name
            callback(undefined,{
                longitude: longitude,
                latitude: latitude,
                place: place
                })
        }

    })
}

module.exports=geocode
