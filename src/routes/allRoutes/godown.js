const express= require('express');

const router=express.Router();

router.get('/list',(request,response)=>{
    console.log('lising all the godowns')
    response.send('listed the godowns')
})

module.exports=router