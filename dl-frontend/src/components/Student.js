import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";
const Student = () => {
    const [students, setStudents] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterBy, setFilterBy] = useState("NAME");
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_BASE_URL}/student/getAll`)
            .then(response => response.json())
            .then(data => setStudents(Array.isArray(data) ? data : []))
            .catch(error => console.error("Error fetching students:", error));

        fetch(`${API_BASE_URL}/txn/getAll`)
            .then(response => response.json())
            .then(data => setTransactions(Array.isArray(data) ? data : []))
            .catch(error => console.error("Error fetching transactions:", error));
    }, []);

    const isStudentInTxn = (email) => {
        return transactions.some(txn => txn.student.email === email);
    };

    const handleDelete = (id, email) => {
        if (isStudentInTxn(email)) {
            alert("Error: This student has transactions and cannot be deleted.");
            return;
        }
        
        const confirmDelete = window.confirm("Are you sure you want to delete this student?");
        if (!confirmDelete) return;

        fetch(`${API_BASE_URL}/student/delete/${id}`, {
            method: 'DELETE',
        })
        .then(() => setStudents(prevStudents => prevStudents.filter(student => student.id !== id)))
        .catch(error => console.error("Error deleting student:", error));
    };

    const handleEdit = (id) => {
        navigate(`/student/update/${id}`);
    };

    const handleSearch = () => {
        fetch(`${API_BASE_URL}/student/filter/EQUALS/${filterBy}/${searchTerm}`)
            .then(response => response.json())
            .then(data => setStudents(Array.isArray(data) ? data : []))
            .catch(error => console.error("Error searching students:", error));
    };

    return (
        <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-200">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">Student Management</h1>

            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-2">
                    <input 
                        type="text" 
                        placeholder="Search Students..." 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-200"
                    />
                    <select 
                        onChange={(e) => setFilterBy(e.target.value)} 
                        className="border border-gray-300 rounded-md p-2 focus:outline-none"
                    >
                        <option value="NAME">Name</option>
                        <option value="EMAIL">Email</option>
                    </select>
                    <button 
                        onClick={handleSearch} 
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                    >
                        Search
                    </button>
                </div>

                <Link 
                    to="/student/create" 
                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
                >
                    Add New Student
                </Link>
            </div>

            {students.length === 0 ? (
                <p className="text-center text-red-500 font-semibold">No students found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse border border-gray-300 rounded-lg">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border p-3">ID</th>
                                <th className="border p-3">Name</th>
                                <th className="border p-3">Email</th>
                                <th className="border p-3">Address</th>
                                <th className="border p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map(student => (
                                <tr key={student.id} className="text-center border">
                                    <td className="border p-3">{student.id}</td>
                                    <td className="border p-3">{student.name}</td>
                                    <td className="border p-3">{student.email}</td>
                                    <td className="border p-3">{student.address}</td>
                                    <td className="border p-3 space-x-2">
                                        <button 
                                            className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
                                            onClick={() => handleEdit(student.id)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
                                            onClick={() => handleDelete(student.id, student.email)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Student;
