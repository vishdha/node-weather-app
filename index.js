const request = require("request");
const argv = require("yargs").argv;

let apiKey = '';
let city =  argv.c || 'Mumbai';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`


request(url, function(err, response, body){
	if(err){
		console.log('error:', error);
	} else {
		let weather = JSON.parse(body)
		let message = `It's ${weather.main.temp} degree in ${weather.name}!`
		console.log('body:',weather);
		console.log(message);
	}
});


