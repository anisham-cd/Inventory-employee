const logger = require('./src/helper/logger')
const constant = require('./src/helper/constant')
const file= require('./src/FileStr/read')
const ping =require('./src/controllers/ping')
const routes=require('./src/routes/routes')
var bodyParser = require('body-parser')

 const express =require('express');

 const app=express();

 app.use(bodyParser.json())
 const port =process.env.PORT || 3002

 app.use('/api/v1',routes)  

 app.get('/ping',ping.ping)




 app.listen(port,()=>{console.log(`server is listening in port no ${port}`)})