const request =require('request')

const geocode=(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1Ijoic3VtaXRzYWh1IiwiYSI6ImNrZGp2eW50NzBqMTkyeXBkMmlkMHdkb2sifQ.OCpa0KBjt8aO_Df1sP8KHQ'
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback("Currently we cannot connect to weather service",undefined)
        }
        else if(body.error || body.features.length===0)
        {
            callback("Not able to find the given location",undefined)
        }
        else
        {
            callback(undefined,{
                latitude:body.features[0].geometry.coordinates[1],
                longitude:body.features[0].geometry.coordinates[0],
                location:body.features[0].place_name
            })
        }
    })
}

module.exports=geocode