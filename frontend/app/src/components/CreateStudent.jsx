import { useState } from "react"
import { createStudent } from "../../api"
import { useNavigate } from "react-router-dom"

export default function CreateStudent(){
    const [student,setStudent] = useState({
        firstname:"",
        lastname:"",
        dateofbirth:"",
        gender:"",
        department:"",
        username:"",
        email:"",
        password:""
        
    })
    const navigate = useNavigate()
    const handleChange = (e) => {
        setStudent({...student, [e.target.name] : e.target.value})
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(student)
        let response = await createStudent(student)
        console.log(response)
        if(response){
            console.log(`User created with username ${response.student.firstname}`)
            navigate(-1)
        }else {
            console.log("error")
        }
    }
    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 min-w-200 max-w-md">

                <button 
                    onClick={() => {navigate(-1)}}
                    className="mb-4  text-gray-600 hover:text-gray-900 transition"
                >
                     ← Back
                </button> 

            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                Add Student 
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block text-gray-600 font-medium">Firstname:</label>
                <input 
                    type="text" 
                    name="firstname"
                    onChange={handleChange}
                    maxLength={20}
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none transition"
                    required  />

                <label className="block text-gray-600 font-medium">Lastname:</label>
                <input 
                    type="text" 
                    name="lastname"
                    onChange={handleChange}
                    maxLength={20}
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none transition"
                    required  />

                <label className="block text-gray-600 font-medium">DOB:</label>
                <input 
                    type="date" 
                    name="dateofbirth"
                    onChange={handleChange}
                    maxLength={20}
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none transition"
                    required  />

                <label className="block text-gray-600 font-medium">Gender</label>
                <input 
                    type="text" 
                    name="gender"
                    onChange={handleChange}
                    maxLength={20}
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none transition"
                    required  />

                <label className="block text-gray-600 font-medium">Department</label>
                <input 
                    type="text" 
                    name="department"
                    onChange={handleChange}
                    maxLength={100}
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none transition"
                    required  />

                <label className="block text-gray-600 font-medium">Username:</label>
                <input 
                    type="text" 
                    name="username"
                    onChange={handleChange}
                    maxLength={50}
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none transition"
                    required  />

                <label className="block text-gray-600 font-medium">Email:</label>
                <input 
                    type="email" 
                    name="email"
                    onChange={handleChange}
                    maxLength={50}
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none transition"
                    required  />

                <label className="block text-gray-600 font-medium">Password</label>
                <input 
                    type="password" 
                    name="password"
                    onChange={handleChange}
                    maxLength={20}
                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-blue-300 focus:outline-none transition"
                    required  />

                    
                 <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition-all duration-300"
                >
                    Submit
                </button>  
                 
            </form>
            </div>
        </div>
    )
}