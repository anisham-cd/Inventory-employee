const { error } = require('console');
const fs=require('fs');
const constant=require('../helper/constant');


// let docs=fs.readdirSync('./src/docs')
// console.log(docs)

function readFolder(path){
    fs.readdir(path,(err,data)=>{
        if(err)
        console.log(err)
        else
        {
            for (let elem of data){
                let conc=`./src/docs/${elem}`
                console.log(conc)
                readfile(conc);
                
            }
        }
    })
    
} 
function readfile(path){
    fs.readFile(path,'utf-8',(err,data)=>{

        if (err)
        console.log(err);
        else{
            console.log(`${constant.readFromDir} ${path}`)
            console.log(data);
            console.log('-------------')
        }
        
    });
}
function writeFile(filename,data){

    fs.writeFile(filename,data,(err)=>{
        if(err)
            console.log(`${constant.error}`)
        console.log(constant.dataAdded)
    })
}



module.exports={
    readFolder,
    readfile,
    writeFile
}

