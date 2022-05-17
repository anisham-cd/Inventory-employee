function success(data){
    let data_={
        "code":202,
        "message":"The request was succsessfull",
        "data":data
    }
    return data_
}
function error(msg){
    let data_={
        "code":400,
        "message":msg
    }
    return data_
}

module.exports={
    success,
    error
}