const mongoose=require('mongoose')

const connectionString=process.env.CONNECTION_STRING

mongoose.connect(connectionString).then(res=>{
    console.log("mongodb atles connected to pfserver");
    
}).catch(err=>{
    console.log("connection failed");
    console.log(err);
    
    
})