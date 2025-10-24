const users=require('../Model/UserModel')
const jwt=require('jsonwebtoken')

exports.userRegister= async(req,res)=>{
    const{username,email,password}=req.body
    console.log(username,email,password);

    try{
        
        const existingUser= await users.findOne({email})

        if(existingUser){
            res.status(406).json("user already registered")
        }else{
            const newUser= users({username,email,password,github:"",linkedin:"",profile:""})
            // to save data to mongodb
            await newUser.save()
            res.status(200).json(newUser)
        }



    }catch(err){

      res.status(401).json(err)
    }






    // res.status(200).json("request received")
    

}

 exports.userLogin=async(req,res)=>{
      const {email,password}=req.body
     
      

   
   try{
     //   to find username or passoword on users collection
        const existingUser =await users.findOne({email,password})
    // to check data inexisting user
     if(existingUser){
      // to create jsonwebtoken
        const token=jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)
      //  to send response to client
      res.status(200).json({users:existingUser,token})
      
     }else{
        res.status(404).json("Invalid UserName or Password")
     }
   }catch(err){
   res.status(401).json(err)
    
   }
 }