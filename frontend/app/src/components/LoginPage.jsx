import { useState } from "react"
import { loginUser } from "../../api"
import axios from "axios"
import { useNavigate } from "react-router-dom"



export default function LoginPage(){
    const navigate = useNavigate()
    const [user,setUser] = useState({
        email:"",
        password:""
    })
    const [loading,setLoading] = useState(false)

    const handleChange = (e)=> {
        setUser({...user,[e.target.name]: e.target.value})
    }

    const onSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)

        let response = await loginUser(user)
       console.log(response)

        if(response){
            const {token, role, studentId} = response
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            sessionStorage.setItem("student_id",studentId)
            console.log("Log in succesful")
            console.log(response)

           
            if(role =="student"){
                navigate(`/student/${studentId}`)
            }else if(role == "faculty"){
                navigate("/faculty")
            }
            
        } else {
            console.log("Login failed")
        }
        setLoading(false);
    }
    return(
        <div className="flex items-center justify-center h-100  bg-gray-100">
            <div className="bg-white w-96 shadow-lg rounded-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Welcome Back!</h2>

                        <form onSubmit={onSubmit} className="space y-4">
                            <h2 className="text-2xl font-semibold mb-6 text-gray-700">Log in</h2>
                            
                            <input
                                type="email"
                                placeholder="Enter your email"
                                name="email"
                                maxLength={20}
                                onChange={handleChange}
                                className="w-full mb-3 px-4 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0 transition duration-200"
                                required />

                            
                            <input
                                type="password"
                                placeholder="Enter your Password"
                                name="password"
                                maxLength={20}
                                onChange={handleChange}
                                className="w-full mb-3 px-4 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0 transition duration-200"
                                required />

                            <button 
                                type="submit"
                                className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
                                disabled={loading}>
                                   {loading ? "Loggin in..." : "Sign In"}
                            </button>
                        </form>

            </div>
        </div>
    )
}