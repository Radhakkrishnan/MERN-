import axios from 'axios' 
const URL = import.meta.env.VITE_BACKEND_URL;

export async function createUser(user){
    try{
        console.log("receiving  user" , user)
        let response = await axios.post(`${URL}/api/auth/register`,user)
        console.log("response received " , response)
        return response.data
    } catch(err){
        console.log(err)
        return
    }
}

export async function loginUser(userData){
    try{
        let response = await axios.post(`${URL}/api/auth/login`,userData)
        if(response.status == 200){
            const {token,role,studentId} = response.data
            sessionStorage.setItem("role",role)
            return response.data
        } 
    }catch(err){
        return
    }
}

export async function createStudent(student){
    try{
        console.log("Received student" , student)
        let response = await axios.post(`${URL}/api/user/createstudent`,student)
        console.log("Response", response)
        return response.data
    }catch(err){
        console.log(err)
        return
    }
}

export async function getAllStudents(){
    try{
        let response = await axios.get(`${URL}/api/user/students`)
        return response.data
    }catch(err){
        console.log(err)
        return
    }
}

export async function getStudent(id){
    try{
        let response = await axios.get(`${URL}/api/user/student/${id}`)
        return response.data
    }catch(err){
        console.log(err)
        return
    }
}

export async function deleteStudent(id){
    try{
        let response = await axios.delete(`${URL}/api/user/deleteStudent/${id}`)
        return response.data
    }catch(err){
        console.log(err)
        return
    }
}

export async function editStudent(id,updatedStudent){
    try{
        let response = await axios.put(`${URL}/api/user/updateStudent/${id}`,updatedStudent)
        return response.data
    }catch(err){
        console.log(err)
        return
    }
}

export async function addToClass(id){
    console.log("Received id" , id)
    try{
        let response = await axios.put(`${URL}/api/user/assignFaculty/${id}`)
        console.log("api response:", response)
        return response
    }catch(err){
        console.log(err)
        return
    }
}

export async function assignedFaculties(id){
    try{
        let response = await axios.get(`${URL}/api/user/student/${id}/faculties`)
        
        return response.data.faculties || []
    }catch(err){
        console.log(err)
        return []
    }
}