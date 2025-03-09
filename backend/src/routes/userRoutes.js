const express = require("express")
const verifyToken = require("../middlewares/authMiddleware")
const authorizedRoles = require("../middlewares/userMiddleware")
const {createStudent,getAllStudents,getStudent,updateStudent,deleteStudent,assignFaculty,assignedFaculties} = require("../conrollers/userController")

const router = express.Router()

router.post("/createStudent",verifyToken, authorizedRoles("faculty"),createStudent)

router.get("/students",verifyToken, authorizedRoles("faculty"),getAllStudents)

router.get("/student/:id",verifyToken, authorizedRoles("faculty" ,"student"),getStudent)

router.put("/updateStudent/:id",verifyToken, authorizedRoles("faculty" , "student"),updateStudent)

router.delete("/deleteStudent/:id",verifyToken, authorizedRoles("faculty"),deleteStudent)

router.put("/assignFaculty/:id",verifyToken, authorizedRoles("faculty"),assignFaculty)

router.get("/student/:id/faculties",verifyToken, authorizedRoles("student"),assignedFaculties)

module.exports = router