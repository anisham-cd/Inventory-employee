const express=require('express');
const routes=require('./routes/routes');
const app=express();
const port=process.env.PORT ||3005;
var bodyParser=require('body-parser')
app.use(bodyParser.json());
app.use('/api/v1',routes);


app.listen(port,console.log(`server is running in port no ${port}`))