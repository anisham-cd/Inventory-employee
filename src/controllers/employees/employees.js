let utilsPing= require('../../utils/ping')
let utilEmployees= require('../../utils/employees')

function signUp(request,response){
    let data= utilEmployees.signUp(request.body)
    response.send(data)    
}
function login(request,response){
    let data= utilEmployees.login(request.body)
    response.send(data)    
}
function ping (request,response){
    let data= utilsPing.ping(request.query.number)
    response.send(data)

}
function push(request,response){
    let data= utilEmployees.push(request.body)
    response.send(data) 
  
}
function listByName(request,response){
    let data= utilEmployees.listByName(request.query.name)
    response.send(data)
}

function assignRole(request,response){
    let data= utilEmployees.assignRole(request.body)
    response.send(data)
}
function list(request,response){
    let data= utilEmployees.list(request.query)
    response.send(data)
}
function encrypt(request,response){
    let data= utilEmployees.encrypt(request.body)
    response.send(data)
}


function decrypt(request,response){
    let data= utilEmployees.decrypt(request.body)
    response.send(data)
}

module.exports={
    ping,
    push,
    listByName,
    list,
    signUp,
    login,
    encrypt,
    decrypt,
    assignRole
}