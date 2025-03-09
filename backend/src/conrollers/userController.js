const Student = require("../models/studentModel")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")


const createStudent = async(req,res) => {
    try{
        const {firstname, lastname, dateofbirth, gender, department , email, password ,username } = req.body

        console.log("Received Request Body:", req.body)

        if (!firstname || !lastname || !dateofbirth || !gender || !department || !email || !password || !username) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        
        const hashedpassword = await bcrypt.hash(password,10)
        const newUser = new User({email, username,password:hashedpassword, role:"student"})
        await newUser.save()

        console.log("running past")


        const newStudent = new Student({firstname, lastname, dateofbirth, gender, department ,user:newUser._id})
        await newStudent.save()

        newUser.studentId = newStudent._id;
        await newUser.save()

       console.log(newUser)
       console.log(newStudent)

        res.status(200).json({message:`New student created` , student: newStudent, user: newUser})

    } catch(err){
        res.status(400).json({message:"Something went wrong" , error: err.message})
    }
}

const getAllStudents = async(req,res) => {
    try{
        const students = await Student.find().populate("faculty" , "username")
        res.status(200).json({message:"Retreived all students" , students})
    }catch(err){
        res.status(400).json({message:"error retrieving students" , error:err.message})
    }
}

const getStudent = async(req,res) => {
    try{
        const {id} = req.params
        const student = await Student.findById(id)
        res.status(200).json({message:"Retreived a student" , student})
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
    }catch(err){
        res.status(400).json({message:"error retrieving student" , error:err.message})
    }
}

const updateStudent = async(req,res) => {
    try{
        const {id} = req.params
        const updatedStudent = await Student.findByIdAndUpdate(id, req.body, {new:true})
        res.status(200).json({message:"Student updated successfully" , updatedStudent})
    }catch(err){
        res.status(400).json({message:"something went wrong" , error:err.message})
    }
}

const deleteStudent = async(req,res) => {
    try{
        const {id} = req.params
        await Student.findByIdAndDelete(id)
        res.status(200).json({message:"student deleted!"})
    }catch(err){
        res.status(400).json({message:"Can't delete student", error:err.message})
    }
}

const assignFaculty = async(req,res) => {
    console.log(req.body)
    try{
        const { id } = req.params
        const facultyId = req.user.id
        const  student = await Student.findById(id)

        if (!student.faculty.includes(facultyId)) {
            student.faculty.push(facultyId);
            await student.save();
        }

        res.status(200).json({message:"Assigned faculty", student})
    }catch(err){
        res.status(400).json({message:"Something went wrong", error:err.message})
    }
}

const assignedFaculties = async(req,res) => {
    try{
        const { id } = req.params
        const student = await Student.findById(id).populate("faculty" , "username email")
        

        res.status(200).json({faculties : [student.faculty]})
    }catch(err){
        res.status(500).json({message:"Something went wrong", error : err.message})
    }
}


module.exports = {createStudent, getAllStudents, getStudent ,updateStudent, deleteStudent, assignFaculty ,assignedFaculties}