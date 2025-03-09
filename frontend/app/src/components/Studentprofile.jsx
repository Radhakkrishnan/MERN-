import { useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import { getStudent } from "../../api"
import { deleteStudent } from "../../api"
import { editStudent } from "../../api"

export default function Studentprofile() {
    const [student, setStudent] = useState({})
    const [isEdit, setIsEdit] = useState(false)

    const params = useParams()
    const id = params.id

    //get selected student
    useEffect(() => {
        const loadStudent = async () => {
            let response = await getStudent(id)

            setStudent(response.student)
        }
        loadStudent()
    }, [])

    const navigate = useNavigate()

    //delete student
    const handleDelete = async () => {
        try {
            let response = await deleteStudent(id)
            if (response) {
                console.log("student delted ")
                navigate(-1)
            }
        } catch (err) {
            console / log(err)
        }
    }

    //update student
    const handleEdit = async() => {
        try {
            let response = await editStudent(id, student)
            if(response){
                console.log("Updated succesfully",response)
                setIsEdit(false)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value })
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">

            
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
                Student details
            </h2>

        <div className="mb-4">
            <strong className="block text-gray-600">Firstname: </strong>
            {
                isEdit ? (
        
                    <input
                        type="text"
                        name="firstname"
                        value={student.firstname}
                        onChange={handleChange}
                        className="w-full mb-3 px-4 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0 transition duration-200"
                    />
            
                ) : student.firstname
            }
        </div>

        <div className="mb-4">
            <strong className="block text-gray-600">Lastname: </strong>
            {
                isEdit ? (
        
                    <input
                        type="text"
                        name="lastname"
                        value={student.lastname}
                        onChange={handleChange}
                        className="w-full mb-3 px-4 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0 transition duration-200"
                    />
            
                ) : student.lastname
            }
        </div>

        <div className="mb-4">
            <strong className="block text-gray-600">Date of Birth: </strong>
            {
                isEdit ? (
        
                    <input
                        type="text"
                        name="dateofbirth"
                        value={student.dateofbirth}
                        onChange={handleChange}
                        className="w-full mb-3 px-4 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0 transition duration-200"
                    />
            
                ) : student.dateofbirth
            }
        </div>

        <div className="mb-4">
            <strong className="block text-gray-600">Gender: </strong>
            {
                isEdit ? (
        
                    <input
                        type="text"
                        name="gender"
                        value={student.gender}
                        onChange={handleChange}
                         className="w-full mb-3 px-4 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0 transition duration-200"
                    />
            
                ) : student.gender
            }
        </div>

        <div className="mb-4">
            <strong className="block text-gray-600">Department: </strong>
            {
                isEdit ? (
        
                    <input
                        type="text"
                        name="department"
                        value={student.department}
                        onChange={handleChange}
                        className="w-full mb-3 px-4 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-0 transition duration-200"
                    />
            
                ) : student.department
            }
        </div>

            

            <div className="flex space-x-4 mt-6">
                <button 
                    onClick={() => setIsEdit(!isEdit)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-all"
                >
                    {
                        isEdit? "Cancel" : "Edit"
                    }
                </button>
                {
                    isEdit && 
                    <button 
                        onClick={handleEdit}
                        className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold shadow-md hover:bg-green-700 transition-all"
                    >
                        Save
                    </button>
                }
            </div>
            <button
                onClick={handleDelete}
                className="w-full bg-red-500 text-white py-2 mt-4 rounded-lg font-semibold shadow-md hover:bg-red-600 transition-all"
            >
                Delete
            </button>
            <button 
                onClick={() => { navigate(-1) }}
                className="w-full bg-gray-500 text-white py-2 mt-2 rounded-lg font-semibold shadow-md hover:bg-gray-600 transition-all"
            >
                Back
            </button>
            </div>
        </div>
    )
}