let Utilsping= require('../utils/ping')

function ping (request,response){
    let data= Utilsping.ping(request.query.number)
    response.send(data)

}

module.exports={
    ping
}