const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
const app = express();
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
    const latlon = request.params.latlon.split(",");
    const lat = latlon[0];
    const lon = latlon[1];
    const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=14f69856f32ac175e31c3ed272968b95`
    console.log(api_url);
    const api_response = await fetch(api_url);
    const json = await api_response.json();
    response.json(json);
    
})
//https://api.openweathermap.org/data/2.5/weather?lat=22.34&lon=114.16°&appid=14f69856f32ac175e31c3ed272968b95


app.post('/api' , (request, response) => { 
    const lon = request.body.lon;
    const lat = request.body.lat;
    const food = request.body.food;
    console.log('I got a request');
    const timestamp = Date.now();
    const image64 = request.body.image64
    data = {lat , lon , food , image64 , timestamp};
    database.insert(data);
    response.json({
        status: "sucess",
        lon: lon,
        lat: lat,
        food: food,
        image64: image64
    });
    //console.log("Below is all ther request")
    //console.log(db);
})