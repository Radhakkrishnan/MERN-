import { useNavigate } from "react-router-dom"


export default function Logout(){
    const navigate = useNavigate()
    const handleLogout = () => {
        try{
            sessionStorage.removeItem("authToken")
            sessionStorage.removeItem("student_id")
            sessionStorage.removeItem("role")
            
            navigate("/")
        } catch(err){
            console.log(err)
        }
    }
    return(
        <button 
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400"
        >
            Logout
        </button>
    )
}