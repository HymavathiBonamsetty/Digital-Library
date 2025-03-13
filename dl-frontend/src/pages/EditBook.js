import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";
const EditBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState({
        bookName: "",
        bookNo: "",
        bookType: "",
        pages: "",
        cost: "",
        author: {
            authorName: "",
            email: ""
        }
    });

    useEffect(() => {
        fetch(`${API_BASE_URL}/get/${id}`)
            .then(response => response.json())
            .then(data => {
                setBook({
                    bookName: data.bookName || "",
                    bookNo: data.bookNo || "",
                    bookType: data.bookType || "",
                    pages: data.pages || "",
                    cost: data.cost || "",
                    author: {
                        authorName: data.author?.authorName || "",
                        email: data.author?.email || ""
                    }
                });
            })
            .catch(error => console.error("Error fetching book data:", error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "authorName" || name === "email") {
            setBook({ ...book, author: { ...book.author, [name]: value } });
        } else {
            setBook({ ...book, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_BASE_URL}/books/update/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(book),
            });

            if (response.ok) {
                alert("Book updated successfully!");
                navigate("/"); // Redirect to books page
            } else {
                alert("Error updating book!");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Edit Book</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="text" 
                    name="bookName" 
                    placeholder="Book Name" 
                    value={book.bookName} 
                    onChange={handleChange} 
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                <input 
                    type="text" 
                    name="bookNo" 
                    placeholder="Book No" 
                    value={book.bookNo} 
                    onChange={handleChange} 
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                <input 
                    type="text" 
                    name="bookType" 
                    placeholder="Book Type" 
                    value={book.bookType} 
                    onChange={handleChange} 
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                <input 
                    type="number" 
                    name="pages" 
                    placeholder="Pages" 
                    value={book.pages} 
                    onChange={handleChange} 
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                <input 
                    type="number" 
                    name="cost" 
                    placeholder="Cost" 
                    value={book.cost} 
                    onChange={handleChange} 
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                <h3 className="text-xl font-semibold text-gray-600 mt-4">Author Details</h3>
                <input 
                    type="text" 
                    name="authorName" 
                    placeholder="Author Name" 
                    value={book.author.authorName} 
                    onChange={handleChange} 
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Author Email" 
                    value={book.author.email} 
                    onChange={handleChange} 
                    required
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-300"
                />
                
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition"
                >
                    Update Book
                </button>
            </form>
        </div>
    );
};

export default EditBook;
