const projects = require('../Model/ProjectModel')

// create logic for add  project

exports.addProjectController = async (req, res) => {
     console.log("added successfully");

     // to destructure all data fromreqbody

     const { title, language, github, website, overview } = req.body
     const userId = req.userId
     const projectImg = req.file.filename
     console.log(title, language, github, website, overview, userId, projectImg);

     try {
          // to check already existprojects 

          const existingProjects = await projects.findOne({ github })
          if (existingProjects) {
               res.status(200).json("Project already Added")
          } else {
               // to add new project withcreate instance
               const newProject = new projects({ projectImg, title, language, github, website, overview, userId })
               // to save model 
               await newProject.save()
               // succes response to user
               res.status(200).json(newProject)
          }

     } catch (err) {
          res.status(401).json(err)
     }



     //  console.log(req.body);
     //      res.status(200).json("request recieved")

}

exports.getHomeProjectController=async(req,res)=>{
     try{
     // to display only 3 project in homepage 
     const homeproject= await projects.find().limit(3)
      res.status(200).json(homeproject)
     }catch(err){
         console.log(err);
         
     }
}

exports.getAllProjectController=async(req,res)=>{
     try{
         const Allproject=await projects.find()
         res.status(200).json(Allproject)
     }catch(err){
         console.log(err);
         
     }
}

exports.getUserProjectController=async(req,res)=>{
     const userId=req.userId
     try{
        const userProject= await projects.find({userId})
        res.status(200).json(userProject)
     }catch(err){
          console.log(err);
          
     }
}

// to update project

exports.updateProjectDetails=async(req,res)=>{
     // to get  project id through url req.params
     const {pId}=req.params
        // destructure all project detils
          const{projectImg,title,language,github,website,overview}=req.body
       // to get image added or not
     const newImg=req.file? req.file.filename : projectImg
      // to get userId from jwtmiddileware userId
     const{userId}= req.userId


     // update project query

     try{
        const updatedProject= await projects.findByIdAndUpdate({_id:pId},{projectImg:newImg,title,language,github,website,overview,userId},{new:true})
            updatedProject.save()
           res.status(200).json(updatedProject)
     }catch(err){
          console.log(err  );
          
     }

   
  

}

// exports.deleteProjectController=async(req,res)=>{
//     const{pId}=req.params
//     try{
//            const deleteProject=await projects.findByIdAndDelete({_id:pId})
//            res.status(200).json(deleteProject)
//     }catch(err){
//      console.log(err);
     
//     }
// }


exports.deleteProjectController = async (req, res) => {
  const { pId } = req.params;
  const userId = req.userId; // from JWT middleware

  try {
    // Delete only if project belongs to logged-in user
    const deletedProject = await projects.findOneAndDelete({ _id: pId, userId });

    if (!deletedProject) {
      return res.status(404).json("Project not found or not authorized to delete");
    }

    res.status(200).json("Project deleted successfully");
  } catch (err) {
    console.log(err);
    res.status(500).json("Server error");
  }
};
