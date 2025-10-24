const express=require('express')
// To create object for Router class
const router=new express.Router()

const UserController=require('../controller/UserController')
const projectController=require('../controller/ProjectController')
const jwtMiddileware=require('../Middlewares/JWTmiddileware')
const multerMiddileware=require('../Middlewares/MulterMidileware')






// to create router for register
router.post('/register',UserController.userRegister)

// to create router for signin
router.post('/login',UserController.userLogin)

 // To add-project
router.post('/add-project', jwtMiddileware,multerMiddileware.single('projectImg') ,projectController.addProjectController);

// to get home project 
router.get('/get-home-project',projectController.getHomeProjectController)

// to get All projects 
router.get('/get-all-project',jwtMiddileware,projectController.getAllProjectController)

// to get user projects
router.get('/get-user-project',jwtMiddileware,projectController.getUserProjectController)

// to update project
router.put('/edit-project/:pId',jwtMiddileware,multerMiddileware.single('projectImg'),projectController.updateProjectDetails)

// to deltet project to only authorized person so add jwtmiddileweare
router.delete('/delete-project/:pId',jwtMiddileware,projectController.deleteProjectController)
module.exports=router
   