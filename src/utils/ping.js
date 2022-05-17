let responseBuilder=require('../helper/responseBuilder')
function ping(number){
    let square=number*number;

    let data={
        "number":number,
        "square":square
    }
    let resp=responseBuilder.success(data)
    
    return resp;
}

module.exports={
    ping
}