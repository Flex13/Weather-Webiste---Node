const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000



// Define path for express Config
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../public/templates/views/')
const partialsPath = path.join(__dirname, '../public/templates/partials/')


//Set up handle bars engibe and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static Directory to serve
app.use(express.static(publicDir))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Created by: Sibanye Bukani',
        text: 'This is Where You can find your weather'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Created by: Sibanye Bukani',
        text: 'About The Application'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Created by: Sibanye Bukani',
        text: 'Get Help on how to use the Application'
    })
})


app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }


    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forcastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forcastData,
                location: location,
                address: req.query.address
            })
        })
    })

})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        text: 'The pag you are looking for cant be found'
    })
})

app.listen(port, () => {
    console.log('Server up on port  3000s')
})