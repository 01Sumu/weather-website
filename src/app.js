const express=require('express')
const path=require('path')
const hbs=require('hbs')
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')

const app=express()
const port=process.env.PORT || 3000

const publicpath=path.join(__dirname,'../public')
app.use(express.static(publicpath))

const viewpath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Sumit'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        desp:'Hey, i am sumit, i have made this app using Node.js. I have used weather forecasting from www.weatherstack.com. Basically its a project of mine, i made it while pursuading my Node.js course in Udemy. ',
        name:'Sumit'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        desp:'If you are not able to find your location please try to locate through your Zip-Code. If in both way you are not able to find your location then we are extremely sorry for your inconvinence, this app only locates with the most matched result.',
        greeting:'THANK YOU',
        name:'Sumit'
    })
})

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'Help Article Not Found'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'Please Provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
            return res.send({
                error:error
            })
        }
        forecast(latitude,longitude,(error,forecast)=>{
            if(error)
            {
                return res.send({
                    error:error
                })
            }
            res.send({
                location:location,
                forecast:forecast
            })
        })
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'404 Page'
    })
})




app.listen(port,()=>{
    console.log('Server is Running now in '+port)
})