import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getStudent , editStudent , assignedFaculties } from "../../api"
import Logout from "./Logout"
import FacultyList from "./FacultyList"

export default function StudentPage(){

    const [student,setStudent] = useState({})
    const [isEdit, setIsEdit] = useState(false)
    const navigate = useNavigate()
    const params = useParams()
    const id = params.id
    
    useEffect(() => {
        async function loadStudent(){
            let response = await getStudent(id)
            setStudent(response.student)
        }
        loadStudent()
    },[])

    const handleChange = (e) => {
        setStudent({...student,[e.target.name] : e.target.value})
    }

    const handleEdit = async() => {
       try{
        let response = await editStudent(id, student)
        if(response) {
            console.log("Student updated",response)
            setIsEdit(false)
        }
       } catch(err){
        console.log(err)
       }
    }

    
     return(
        <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
            <Logout/>

        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg mt-6">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Student Details</h2>

        <div className="mb-4">
           <strong className="block text-gray-600">Firstname: </strong>
           {
            isEdit? (
                <input 
                    type="text"
                    name="firstname"
                    value= {student.firstname}
                    onChange={handleChange}
                    maxLength={20}
                    className="w-full mb-3 px-4 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0 transition duration-200"
                    required />
            ) : student.firstname
           }
        </div>

        <div className="mb-4">
           <strong className="block text-gray-600">Lastname: </strong>
           {
            isEdit? (
                <input 
                    type="text"
                    name="lastname"
                    value= {student.lastname}
                    onChange={handleChange}
                    maxLength={20}
                    className="w-full mb-3 px-4 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0 transition duration-200"
                    required />
            ) : student.lastname
           }
        </div>

        <div className="mb-4">
           <strong className="block text-gray-600">Date of Birth: </strong>
           {
            isEdit? (
                <input 
                    type="text"
                    name="dateofbirth"
                    value= {student.dateofbirth}
                    onChange={handleChange}
                    maxLength={20}
                    className="w-full mb-3 px-4 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0 transition duration-200"
                    required />
            ) : student.dateofbirth
           }
        </div>

        <div className="mb-4">
           <strong className="block text-gray-600">Gender: </strong>
           {
            isEdit? (
                <input 
                    type="text"
                    name="gender"
                    value= {student.gender}
                    onChange={handleChange}
                    maxLength={20}
                    className="w-full mb-3 px-4 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0 transition duration-200"
                    required />
            ) : student.gender
           }
        </div>

        <div className="mb-4">
           <strong className="block text-gray-600">Department:</strong>
           {
            isEdit? (
                <input 
                    type="text"
                    name="department"
                    value= {student.department}
                    onChange={handleChange}
                    maxLength={20}
                    className="w-full mb-3 px-4 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0 transition duration-200"
                    required />
            ) : student.department
           }
        </div>

           <div className="flex space-x-4 mt-6">
            { isEdit && <button onClick={handleEdit} className="flex-1 bg-green-500 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-green-600 transition-all">Save</button>  }

            <button 
                onClick = {() => setIsEdit(!isEdit)}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition-all"
            >
                {isEdit ? "Cancel" : "Edit"}
            </button>
           </div>
        </div>

        <div className="w-full max-w-lg mt-6">
           <FacultyList studentId = {id}/>
        </div>
        </div>
    )
}