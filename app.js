const http = require('http')
const fs = require("fs")
var requests= require('requests')

const homeFile = fs.readFileSync("home.html", "utf-8")

const replaceVal = (tempVal,orgVal)=>{
    let temperture = tempVal.replace("{%tempval%}",orgVal.main.temp)
    temperture = temperture.replace("{%tempmin%}",orgVal.main.temp_min)
    temperture = temperture.replace("{%tempmax%}",orgVal.main.temp_max)
    temperture = temperture.replace("{%location%}",orgVal.name)
    temperture = temperture.replace("{%country%}",orgVal.sys.country)
    temperture = temperture.replace("{%tempstatus%}",orgVal.weather[0].main)
    return temperture
}

const server = http.createServer((req,res)=>{
    if(req.url == '/'){
        requests('https://api.openweathermap.org/data/2.5/weather?q=Patiala&appid=d7eedee0f077b50ba09f81acd37de1cd')
.on('data',  (chunk)=> {
    const objdata = JSON.parse(chunk)
    const arrData = [objdata]
  const realTimeData = arrData.map((val)=>replaceVal(homeFile,val)).join("")
    // console.log(val.main)
    res.write(realTimeData)
    //   console.log(realTimeData)
  

})
.on('end', (err)=> {
  if (err) return console.log('connection closed due to errors', err);
  res.end()
 
  console.log('end');
});
       
    }

})
server.listen(8000,"127.0.0.1")