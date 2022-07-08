const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
const app = express();
require('dotenv').config();

//nedb database
const database = new Datastore("Database.db");
database.loadDatabase();
app.listen(3000 , () => console.log('Listening at 3000'));
app.use(express.static("public"));
app.use(express.json({limit : "1mb"}));

app.get('/api' , (request, response) => {
    database.find({} , (err, data) => {
        response.json(data);
    });
    }
    
)

app.get("/weather/:latlon" , async (request, response) => {
    const api_key = process.env.API_KEY;
    const latlon = request.params.latlon.split(",");
    const lat = latlon[0];
    const lon = latlon[1];
    const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`
    const aq_url = `https://api.openaq.org/v2/latest?coordinates=${lat}%2C${lon}`
    const weather_response = await fetch(api_url);
    const weather_data = await weather_response.json();
    const aq_response = await fetch(aq_url);
    const aq_data = await aq_response.json();
    const data = {
        weather:weather_data,
        air_quality:aq_data
    }
    response.json(data);
    
})
//https://api.openweathermap.org/data/2.5/weather?lat=22.34&lon=114.16°&appid=14f69856f32ac175e31c3ed272968b95


app.post('/api' , (request, response) => { 
    const lat = request.body.lat;
    const lon = request.body.lon;
    const weather_summary = request.body.weather_summary;
    const weather_station = request.body.weather_station;
    const weather_temperature = request.body.weather_temperature;
    const aq = request.body.aq;
    const timestamp = Date.now();
    console.log('I got a request');
    data = {lat , lon , weather_summary , weather_station , weather_temperature , aq , timestamp};
    database.insert(data);
    response.json({
        status: "sucess",
        lat:lat,
        lon:lon,
        weather_summary: weather_summary,
        weather_station: weather_station,
        weather_temperature: weather_temperature,
        aq: aq
    });
})