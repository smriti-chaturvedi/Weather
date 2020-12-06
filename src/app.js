const path = require('path')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const express = require('express')
const hbs = require('hbs')

const port =  process.env.PORT
const app = express()

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirectoryPath))

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Smriti Chaturvedi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Smriti Chaturvedi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Smriti Chaturvedi'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: "Please provide an address."
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if(error){
            return res.send(error)
        }
        forecast(latitude, longitude, (error, data) => {
            if(error){
                return res.send(error)
            }
            res.send({
                data,
                location
            })
        })
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Smriti Chaturvedi',
        errorMessage: 'Page not found!'
        
    })
})

app.listen(port, () => {
    console.log('server is running on port '+ port)
})