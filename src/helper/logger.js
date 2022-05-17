function welocme(){
    console.log("welcome message");
    return ("code")
}

function error(error){
    console.log("[From logger]",new Date(),error);
}

function success(success){
    console.log("[From logger]",new Date(),success);
}
function wait(time,message){
    setTimeout(()=>{
        console.log(message)
    },time)
}

module.exports={
    welocme:welocme,
    error:error,
    success:success,
    wait:wait
}

