import {Link , useNavigate} from 'react-router-dom'
import { useEffect , useState} from 'react'
import { getAllStudents , addToClass} from '../../api'
import Logout from './Logout'

export default function FacultyPage(){
    const [students,setStudents] = useState([])
    const [addedStudents,setAddedStudents] = useState({})
    const navigate = useNavigate()
    
    useEffect(() => {
        const loadAllstudents = async() => {
            let response = await getAllStudents()
            const allStudents = response.students
            setStudents(allStudents)
            
        }
        loadAllstudents()
    },[])

    async function handleAdd(studentId){
        try{
            let response = await addToClass(studentId)
            console.log("Student added" , response)
            
            setAddedStudents((prev) =>( {
                ...prev,
                [studentId]:true
            }))
        }catch(err){
            console.log(err)
        }
    }
    return(
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <div  className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold text-gray-700">Faculty Dashboard</h1>
                     <Logout/>
                </div>

                <div className="bg-gray-200 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-medium text-gray-800 mb-4">Student List</h2>
                        <ul className="space-y-4">
                            {
                                students.map((student) =>{
                                    return(
                                        
                                            <li  key={student._id} className="flex justify-between items-center bg-white p-2.5 shadow-sm rounded-lg hover:bg-gray-50 transition">
                                                <span 
                                                    onClick={() => {navigate(`/studentprofile/${student._id}`)}}
                                                    className="text-lg font-medium text-gray-700 cursor-pointer hover:text-blue-600" 
                                                >
                                                    {student.firstname}
                                                </span>
                                                
                                            <button 
                                                onClick={() => {handleAdd(student._id)}}
                                                className={`px-4 py-2 text-white rounded-lg ${
                                                    addedStudents[student._id] ? "bg-green-500 cursor-default" : "bg-blue-500 hover:bg-blue-600"
                                                  }`}
                                                disabled={addedStudents[student._id]}
                                            >
                                              {addedStudents[student._id] ? "Added" : "Add to Class"}
                                            </button>
                                            </li>     
                                    )
                                    } )
                            }
                        </ul>          
                </div>
                <div className="mt-6 text-center">
                    <Link 
                        to='/createStudent'
                        className="inline-block bg-green-600 text-white px-6 py-2 rounded-md text-lg font-medium hover:bg-green-700 transition"
                    >Create new student</Link>
                </div>
            </div>
        </div>
    )
}