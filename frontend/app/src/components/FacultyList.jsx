import { useState } from "react"
import { assignedFaculties } from "../../api"


export default function FacultyList({studentId}){
    const [faculties, setFaculties] = useState([])
    const [view,setView] = useState(false)

    

    const handleFaculties = async() => {
        let response =  await assignedFaculties(studentId)

        console.log(response)

        if(!Array.isArray(response)){
            console.log("response is not an array, setting empty array")
            setFaculties([])
        }else{
            let flattenedFaculties = response.flat();
            let validFaculty = flattenedFaculties.filter(faculty => faculty !== null && faculty !== undefined)
            setFaculties(validFaculty)
        }
        
        
        setView(!view)
    }

    return(
        <div className="max-w-lg mx-auto mt-6">
            <button 
                onClick={handleFaculties}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            >
                {view ? "Hide Faculties" : "View assigned faculties"}
            </button>

            {
                view && (
                    <div className="bg-white shadow-md rounded-lg p-6 mt-4">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">
                            Assigned faculties
                        </h2>
                        <ul className="space-y-2">
                            {faculties.length > 0 ? (
                                faculties.map((faculty) => {
                                    return(
                                       <li key = {faculty._id}  className="p-3 bg-gray-100 rounded-md shadow-sm flex justify-between items-center">
                                            <span className="text-gray-700 font-medium">
                                                {faculty.username}  
                                            </span>
                                            <span className="text-gray-500 text-sm">
                                                {faculty.email}
                                            </span>
                                       </li>
                                    )
                                })
                            ) : (<p className="text-gray-500 text-center">No faculties assigned yet</p>)}
                        </ul>
                    </div>
                )
            }
        </div>
    )
}