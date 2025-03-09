import { useState } from "react"
import LoginPage from "./LoginPage"
import CreateuserPage from "./CreateuserPage"

export default function LandingPage(){
    const [state, setState] = useState(0)
    return(
        <div className="flex justify-center items-center min-h-screen bg-gray-100 m-w-250">
           {
            !state ? (
                <div className="bg-white shadow-lg rounded-2xl p-8 w-120 text-center">
                    <LoginPage/>
                    <button onClick={() => {setState(!state)}} className="mt-4 w-full py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition duration-300">Create new User</button>
                </div>
                
            ) : (
                <div  className="bg-white shadow-lg rounded-2xl p-8 w-120 text-center">
                    <CreateuserPage/>
                    <button onClick={() => {setState(!state)}} className="mt-4 w-full py-2 px-4 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition duration-300">Login</button>
                </div>
            )
           }
        </div>
    )
}