const fs=require("fs")

function addData(data,path){
    fs.writeFile(path,data,'utf8',(err)=>{
        if(err){
            console.log(err);
        }
        return data;
    })
    return data;
    }
function success(data){
    let value={
        "code":200,
        "message":"request was successfull",
        "data":data
    }
    return value;
}

function error(){
        let value={
            "code":400,
            "message":"Given data is not sufficient"
        }
        return value;
    }
    function failure(message){
        let value={
            "code":400,
            "message":message
        }
        return value;
    }


module.exports={
    success,
    error,
    addData,
    failure
 
}