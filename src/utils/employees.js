let responseBuilder=require('../helper/responseBuilder')
let constant=require('../helper/constant')
let common=require('../helper/common')
let employees=[{
    "id": 1,
    "name":"rakesh1",
    "dob":"21-05-1989",
    "password":"mandatory",
    "hobby":"",
    "role":"admin",
    "email":"mandadmin@gmail.com"
    }];


function signUp(body){
    body.role='user';
    body.id=employees.length+1;
    employees.push(body);
    let resp=responseBuilder.success(body)
    return resp;
}
function login(body) {

    let userFlag=0;
    for(let elem of employees){
        if(elem.email==body.email){
            userFlag=1;
        }
        if(elem.email==body.email && elem.password==body.password )
        {
            let token=common.encrypt(JSON.stringify({
                role:elem.id,
                exp:Date.now()+(30*1000)
            }))
            let res={
                data:elem,
                AuthToken:token,
                
            }
            let resp=responseBuilder.success(res)
            return resp;
        }
    }
    if(userFlag){
        let resp=responseBuilder.error(constant.userlogin.userPassDontMatch)
        return resp;
    }
    else
    {
        let resp=responseBuilder.error(constant.userlogin.userDoesNotExists)
        return resp;
    }
    

}

function assignRole(body){

    let id=body.id;
    let role=body.role;
    for(employee of employees){
        if(employee.id==id)
        {
            employees['role']=role;
            let res={
                email:employee.email,
                role:role
            }
            let resp=responseBuilder.success(res)
            return resp;
        }
    }
    let resp=responseBuilder.error(constant.userlogin.userDoesNotExists)
    return resp;

}
function push(body){
    body['id']=employees.length+1;
    for(let elem of employees)
        if(elem.email==body.email){
            let resp=responseBuilder.error(constant.userExists)
            return resp;
        }
    employees.push(body);
    let resp=responseBuilder.success(employees)
    return resp;
}
function listByName(name){
    let result=[];
    for(let elem of employees){
        if(elem.name.toLowerCase()==name.toLowerCase())
            result.push(elem)
    }
    let resp=responseBuilder.success(result)
    return resp;
}

function list(query){
    let result=[]
    for(let elem of employees){
        if(query.name)
            if(elem.name.toLowerCase()==query.name.toLowerCase())
            result.push(elem)
        else if(query.city)
            if(elem.city.toLowerCase()==query.city.toLowerCase())
            result.push(elem)
        else if(query.age)
            if(elem.age==query.age)
            result.push(elem)
        
    }
    let resp=responseBuilder.success(result)
    return resp;
}
function encrypt(body){
    let encryptedData= common.encrypt(JSON.stringify(body)) 
    let resp=responseBuilder.success(encryptedData)
    return resp;
}

function decrypt(body){
    let decryptedData= common.decrypt(body.encryptedData) 
    let resp=responseBuilder.success(JSON.parse(decryptedData))
    return resp;
}
module.exports={
    push,
    listByName,
    list,
    signUp,
    login,
    encrypt,
    decrypt,
    assignRole
}

