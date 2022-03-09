const path = require('path')
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000

//defines paths for Express config
const publicDirectoryPath= path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

//Set up handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs' )
hbs.registerPartials(partialsPath)
//set up static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'JD'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'JD'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'This is one of the FAQ quesitons',
        name: 'JD'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address
    if (!address){
        return res.send({
            error: "Please provide an address"
        })
    }

    geocode(address, (e, {lat, long, location} = {}) => {
        if (e){
            return res.send({
                error: e
            })
        }
        forecast(lat, long, (e, forecastData) => {
            if (e){
                return res.send({
                    error: e
                })
            }

            res.send({
                address,
                forecast: forecastData,
                location
            })
        })
    })    

   
});

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        name: 'JD',
        message: 'Help Page Not Found'
    })
})

//must come last, as it must not match routes that are defined
app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error 404',
        name: 'JD',
        message: 'Page Not Found'
    })
});

app.listen(port , () => {
    console.log(`Serving running on ${port}`);
})