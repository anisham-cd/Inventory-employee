let responseBuilder=require('../helper/responseBuilder');
let constant=require('../helper/constant');
let fs=require('fs');
let employee=require('../docs/employee.json');
function push(body){
    body["id"]=employee.length+1;
    body['name']=body.name.charAt(0).toUpperCase()+body.name.substring(1);
    body['hobby']=body.hobby.charAt(0).toUpperCase()+body.hobby.substring(1);
    employee.push(body);
    console.log(employee)
    let value=JSON.stringify(employee,null,2);
    responseBuilder.addData(value,'docs/employee.json');
    let resp = responseBuilder.success(body);
    return resp;
}
function listByName(body){
    let result=[];
    console.log(body)
    if(!body.name && !body.role && !body.id && !body.shopId && !body.godownId && !body.email)
        return responseBuilder.success(employee)
    for(let elem of employee){
        if(body.name){
            if(elem.name.toLowerCase()==body.name.toLowerCase())
                result.push(elem);
         }
         else if(body.role){
             if(elem.role.toLowerCase()==body.role.toLowerCase())
                result.push(elem);
         }
         else if(body.id){
             if(elem.id==body.id)
                result.push(elem);
         }
         else if(body.shopId){
             if(elem.shopId==body.shopId)
                result.push(elem);
         }
         else if(body.godownId){
             if(elem.godownId==body.godownId)
                result.push(elem);
         }
         else if(body.email){
            if(elem.email==body.email)
               result.push(elem);
        }
    }
    let resp=responseBuilder.success(result)
         return resp;
}
function modify(body){
    if(!body.id){
        return responseBuilder.error();
    }
    let result =[];
    if(body.id){
        for(let elem of employee){
            if(body.id==elem.id){
                result.push(elem);
                if(body.name){
                    elem.name=body.name;
                }
                if(body.dob){
                    elem.dob=body.dob;
                }
                if(body.email){
                    elem.email=body.email;
                }
                if(body.shopId){
                    elem.shopId=body.shopId;
                }
                if(body.godownId){
                    elem.godownId=body.godownId;
                }
                if(body.mobile){
                    elem.mobile=body.mobile;
                }
            }
        }
        console.log(employee)
        let value=JSON.stringify(employee,null,2);
        responseBuilder.addData(value,'docs/employee.json');
        let resp = responseBuilder.success(result);
        return resp;
    }
}
module.exports={
    push,
    listByName,
    modify
 

}
