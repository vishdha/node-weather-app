const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
const apiKey = '';

//allows us to access all of the static files within the ‘public’ folder.
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true}));

//A template engine enables you to use static template files in your application.
app.set('view engine', 'ejs')

app.get('/', function(req, res) {
	res.render('index')
})

app.post('/', function(req, res) {
	let city = req.body.city;
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
	request(url, function(err, response, body){
		if(err){
			res.render('index', {weather:null, error: 'Error, Psslease try again'});
		} else {
			let weather = JSON.parse(body)
			if(weather.main == undefined){
				res.render('index', {weather: null, error: 'Error, please try again'});
			} else {
				let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
				res.render('index', {weather: weatherText, error: null});
			}
		}
	});
})

app.listen(3000, function() {
	console.log('Example app listening on port 3000!')
})
