const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){

    res.sendFile(__dirname + "/index.html");
  });
app.post("/",function(req,res){
  const query=req.body.cityName;
  const apiKey="715f9f7c0c2f26bfda5bbed26a920a38"
  const unit="metric"
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units=metric&appid="+apiKey+"&unit="+unit
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherdata=JSON.parse(data)
      const temp=weatherdata.main.temp
      const weatherdescription=weatherdata.weather[0].description
      const icon=weatherdata.weather[0].id
      const imageURL="http://openweathermap.org/img/wn/" + icon+"@2x.png"
      res.write("<p>The weather is currently " +"<em>"+ weatherdescription+ "</em>" + "</p>");
      res.write("<h1>The Temperature in " + query + " is " + temp+ " degree Celsius</h1>");
      res.write("<img src=" + imageURL +">")
      res.send();
    })
  })
})




app.listen(8080,function(){
  console.log("Server is Running on port 8080");
})
