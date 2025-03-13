import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config";
const Books = () => {
    const [books, setBooks] = useState([]);  // Ensure it's always an array
    const [searchTerm, setSearchTerm] = useState("");
    const [filterBy, setFilterBy] = useState("BOOK_NAME");
    const [operator, setOperator] = useState("EQUALS");

    useEffect(() => {
        fetch(`${API_BASE_URL}/books/getAll`)
            .then(response => response.json())
            .then(data => {
                console.log("Fetched Books:", data);
                if (Array.isArray(data)) {
                    setBooks(data);  // Set books only if data is an array
                } else {
                    console.error("Unexpected response format:", data);
                    setBooks([]);  // Fallback to an empty array
                }
            })
            .catch(error => {
                console.error("Error fetching books:", error);
                setBooks([]);  // Ensure books remains an array
            });
    }, []);

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this book?");
        if (!confirmDelete) return;

        fetch(`${API_BASE_URL}/books/delete/${id}`, {
            method: 'DELETE',
        })
            .then(() => setBooks(prevBooks => prevBooks.filter(book => book.id !== id)))
            .catch(error => console.error("Error deleting book:", error));
    };

    const handleSearch = () => {
        fetch(`${API_BASE_URL}/books/bookFilter/${operator}/${filterBy}/${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setBooks(data);
                } else {
                    console.error("Unexpected response format:", data);
                    setBooks([]);
                }
            })
            .catch(error => {
                console.error("Error searching books:", error);
                setBooks([]);
            });
    };

    return (
        <div className="p-6">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Available Books</h1>
                <Link to="/books/create" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Add New Book</Link>
            </div>

            {/* Search Section */}
            <div className="flex flex-wrap gap-4 mb-6">
                <input 
                    type="text" 
                    placeholder="Search Books..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <select onChange={(e) => setFilterBy(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2">
                    <option value="BOOK_NAME">Book Name</option>
                    <option value="BOOK_NO">Book No</option>
                    <option value="BOOK_TYPE">Book Type</option>
                    <option value="PAGES">Pages</option>
                    <option value="COST">Cost</option>
                </select>
                <select onChange={(e) => setOperator(e.target.value)} className="border border-gray-300 rounded-md px-3 py-2">
                    <option value="EQUALS">Equals</option>
                    <option value="GREATER_THAN">Greater Than</option>
                    <option value="LESS_THAN">Less Than</option>
                </select>
                <button onClick={handleSearch} className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition">Search</button>
            </div>
            
            {/* Books Table */}
            {books.length === 0 ? (
                <p className="text-red-500 font-semibold">No books found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
                        <thead className="bg-gray-100 text-gray-700">
                            <tr>
                                <th className="p-2 border">ID</th>
                                <th className="p-2 border">Book Name</th>
                                <th className="p-2 border">Book No</th>
                                <th className="p-2 border">Book Type</th>
                                <th className="p-2 border">Pages</th>
                                <th className="p-2 border">Cost</th>
                                <th className="p-2 border">Author</th>
                                <th className="p-2 border">Student</th>
                                <th className="p-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map(book => (
                                <tr key={book.id} className="border text-center">
                                    <td className="p-2 border">{book.id}</td>
                                    <td className="p-2 border">{book.bookName?.toUpperCase()}</td>
                                    <td className="p-2 border">{book.bookNo}</td>
                                    <td className="p-2 border">{book.bookType}</td>
                                    <td className="p-2 border">{book.pages}</td>
                                    <td className="p-2 border">${book.cost}</td>
                                    <td className="p-2 border">{book.author?.authorName} ({book.author?.email})</td>
                                    <td className="p-2 border">{book.student ? book.student.name : "Not Issued"}</td>
                                    <td className="p-2 border flex space-x-2 justify-center">
                                        <Link to={`/books/update/${book.id}`} className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition">Edit</Link>
                                        <button onClick={() => handleDelete(book.id)} className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition">Remove</button>
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

export default Books;
