
const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const weather=require('./utils/weather')

const { title } = require('process')

// console.log(__dirname)  // Current directory path
// console.log(__filename) // Current file path

// This will return path of public folder
// Paths define for Express config
const Indexpath=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')


// Calling express, all function are accessed by app 
const app=express()

// Initiating handle bar file for dynamic page
// Setup handlebars engine and views location
hbs.registerPartials(partialPath)   // For parials in hbs
app.set('view engine', 'hbs')
app.set('views',viewspath)

// This will send html file that is created in index.html file 
// Setup static directory for serve
app.use(express.static(Indexpath))

// whenever we make request for given url the 'get' function will be called by web server and thus we can send response back to server

// here when we access localhost:3000 then this function will be called and thus it will send Hello

// We can send HTML page or JSON file as well

// app.get('',(req,res) => {
//     res.send('<h1>Home Page</h1>')  //sending html 
// })

// here when we access 'localhost:3000/help' then this function will be called
// app.get('/help',(req,res) => {
//     res.send('<h2>Help Page</h2>')
// })


// app.get('/about',(req,res) => {
//     res.send('<h2>About Page</h2>')
// })

app.get('',(req,res) => {

    // Now, this will serve home page as dynamic
    // render will send index.hbs page 
    res.render('index',{    // Object to send to index.hbs file
        title: 'Weather Report',
        name: 'Iqbal Khan'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About Page',
        name: 'Iqbal Khan'
    })
})
app.get('/help',(req,res) => {
    res.render('help',{
        title: 'Help Page',
        name: 'Iqbal Khan',
        msg: 'Please contact for help'
    })
})


app.get('/weather',(req,res) => {
    
    // Query string URL 
    
    //  If no location is provided
    if(!req.query.search){
        return res.send({
            error: 'Plaease provide location'
        })
    }
    const address=req.query.search
    geocode(address,(error,data={}) => {
        if(error)
        {
            return res.send({
                error: error
            })
        }
        weather(data.place,(msg,forecast_data) => {
            if(msg)
            {
                return res.send({
                    error: msg
                })
            }
            res.send({
                Forecast: 'It is ' + forecast_data.desc + '.Temperature is: ' + forecast_data.curr_temp + ' degree.And it feels like ' + forecast_data.feels_like + ' degree.',
                Location: data.place,
                Address: address
            })
        })
    })

    // res.send({      // sending object as JSON file
    //     location: req.query.search,
    //     temperature: 28
    // })
})

// handling wrong url accss
// error page
app.get('/help/*',(req,res) => {
    res.render('error',{
        error_msg: 'Help aricle not found',
        title: 'help_error',
        name: 'Iqbal Khan'    
    })
})

// For all other url excluding urls mentioned above will show 404 error
app.get('/*',(req,res) => {
    res.render('error',{
        error_msg: '404 not found',
        title: '404',
        name: 'Iqbal Khan'
    })
})


app.listen(3000,() => {
    console.log('server is listening at port 3000')
})