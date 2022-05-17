let responseBuilder=require('../helper/responseBuilder')
let constant=require('../helper/constant')
let common=require('../helper/common')

function decrypt(req,res,next){
    let body=req.body;
    if(!body.encryptedData){
        let resp=responseBuilder.error(constant.invalidInput)
            res.send(resp) ;
    }
    else{
        console.log(req.body)
        req.body=JSON.parse(common.decrypt(body.encryptedData))
        console.log(req.body)
        next()
    }
        
    }
function  checkAdminRoles(req,res,next){
    let body=req.body;
    if(!body.authToken){
        let resp=responseBuilder.error(constant.invalidInput)
            res.send(resp) ;
    }
    else{
        console.log(req.body)
        let data=JSON.parse(common.decrypt(body.authToken))
        let timeDiff=data.exp-Date.now();
        console.log(timeDiff);
        if(timeDiff<0)
        {
            let resp=responseBuilder.error(constant.userlogin.tokenExpired)
            res.send(resp) ;
        }
        // let Role=find with id
        if(Role!='admin')
        {
            let resp=responseBuilder.error(constant.userlogin.AuthorisationFailed)
            res.send(resp) ;
        }
        else
        next()
    }

}   
module.exports={
    decrypt,
    checkAdminRoles
}

