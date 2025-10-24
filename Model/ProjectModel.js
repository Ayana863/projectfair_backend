const mongoose=require('mongoose')


const ProjectSchema= new mongoose.Schema({
    projectImg:{
        type:String,
        required:true
    },
    title:{
        type:String,
         required:true


    },
    language:{
         type:String,
         required:true
    },
    github:{
         type:String,
         required:true,
         unique:true
    },
    website:{
         type:String,
         required:true,
       
    },
    overview:{
         type:String,
         required:true,
    },
    userId:{
         type:String,
         required:true,
    }
})

// to create model
const projects=mongoose.model("projects",ProjectSchema)

module.exports=projects

