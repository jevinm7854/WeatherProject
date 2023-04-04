const { log } = require("console");
const express= require("express");
const https=require("https");
const bodyParser=require("body-parser")


const app=express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/",function(req,res){

    res.sendFile(__dirname +"/index.html");

   
})

app.post("/",function(req,res){
    const city=req.body.cityName;
const apiKey="e3702e8b2a2911bc6aedd2a94013bb40"

const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units=metric";
https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
        const Wdata= JSON.parse(data);
        const temp = Wdata.main.temp;
        const Wdesc= Wdata.weather[0].description;
        const icon= Wdata.weather[0].icon;
        const imageURL="http://openweathermap.org/img/wn/"+icon + "@2x.png"
        res.write("<h1>The temperature in "+city+" is "+ temp +" degree celcius.</h1>");
        res.write("<h3>The weather is currently "+ Wdesc+"</h3>");
        res.write("<img SRC="+imageURL+">");
        res.send();
        
    })
})

})








app.listen(3000,function(){
    console.log("Server running on port 3000");
})