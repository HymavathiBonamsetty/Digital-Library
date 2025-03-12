import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState({
        name: "",
        email: "",
        address: ""
    });

    useEffect(() => {
        fetch(`http://localhost:8080/student/get/${id}`)
            .then(response => response.json())
            .then(data => setStudent(data))
            .catch(error => console.error("Error fetching student data:", error));
    }, [id]);

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/student/update/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(student),
            });
            
            if (response.ok) {
                alert("Student updated successfully!");
                navigate("/student");
            } else {
                alert("Error updating student!");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Edit Student</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Student Name" 
                    value={student.name} 
                    onChange={handleChange} 
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={student.email} 
                    onChange={handleChange} 
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                <input 
                    type="text" 
                    name="address" 
                    placeholder="Address" 
                    value={student.address} 
                    onChange={handleChange} 
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition"
                >
                    Update Student
                </button>
            </form>
        </div>
    );
};

export default EditStudent;
