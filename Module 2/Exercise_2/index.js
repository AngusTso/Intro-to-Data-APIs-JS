const express = require('express');
const app = express();
//short version of database
const db = [];

app.listen(3000 , () => console.log('Listening at 3000'));
app.use(express.static("public"));
app.use(express.json({limit : "1mb"}));
app.post('/api' , (request, response) => { 
    const lon = request.body.lon;
    const lat = request.body.lat;
    console.log('I got a request');
    console.log(request.body);
    db.push({lon , lat});
    response.json({
        status: "sucess",
        lon: request.body.lon,
        lat: request.body.lat
    });
    console.log("Below is all ther request")
    console.log(db);
})