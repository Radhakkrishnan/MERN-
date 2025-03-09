import { useState } from "react"
import { createUser } from "../../api"
import { useNavigate } from "react-router-dom"

export default function CreateuserPage(){
    const [user,setUser] = useState({
        username:"",
        password:"",
        email: ""
    })

    const [loading,setLoading] = useState(false)
    const [message,setMessage] = useState({ text: "", type: "" })

    const navigate = useNavigate()

    const handleChange = (e) => {
        setUser({...user, [e.target.name]:e.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        setLoading(true)
        setMessage({ text: "", type: "" })

        try{
            console.log("sending user",user)
            let response = await createUser(user)
            setUser({username: "" , password: "", email: ""})
            setLoading(false)
           
            console.log("received response on frontend:", response.data)
            if(response){
                console.log(`User created with email ${response.email}`)
                
                setMessage({ text: "User created succesfully", type: "success" })
            }else {
                console.log("error")
                setMessage({ text: "User creation failed", type: "fail" })
            }
        } catch(err){
            console.error("Error:", err.message);
            setMessage({ text: "User creation failed", type: "fail" })
            setLoading(false)
        }
       
        
    }
    return(
        <div className="flex items-center justify-center min-h-100  bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-96 max-w-md">
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                Create an Account
            </h2>
            {message && <p className={`text-sm font-medium mb-3 ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>{message.text}</p>}
                <form onSubmit={handleSubmit}>
                                
                                <input
                                    type="text"
                                    placeholder="Enter your Username"
                                    name="username"
                                    value={user.username}
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
                                    value={user.password}
                                     className="w-full mb-3 px-4 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0 transition duration-200"
                                    required />
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    name="email"
                                    maxLength={20}
                                    onChange={handleChange}
                                    value={user.email}
                                      className="w-full mb-3 px-4 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0 transition duration-200"
                                    required />
                                
                                <button 
                                    type="submit"
                                    className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
                                    disabled={loading}
                                >
                                    {loading ? "Creating Account..." : "Sign Up"}   
                                </button>
                    </form>                
            </div>
        </div>
    )
}