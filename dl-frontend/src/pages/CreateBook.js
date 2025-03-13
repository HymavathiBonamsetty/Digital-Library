import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../config";

const CreateBook = () => {
  const [book, setBook] = useState({
    bookName: "",
    bookNo: "",
    bookType: "",
    pages: "",
    cost: "",
    authorName: "",
    authorEmail: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookData = {
      bookName: book.bookName,
      bookNo: book.bookNo,
      bookType: book.bookType,
      pages: parseInt(book.pages),
      cost: parseFloat(book.cost),
      authorName: book.authorName,
      authorEmail: book.authorEmail,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/books/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        alert("Book added successfully!");
        navigate("/"); // Redirect to books page
      } else {
        const errorMessage = await response.text();
        alert("Error adding book: " + errorMessage);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add book. Check console for details.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          name="bookName" 
          placeholder="Book Name" 
          required 
          onChange={handleChange} 
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="text" 
          name="bookNo" 
          placeholder="Book No" 
          required 
          onChange={handleChange} 
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="text" 
          name="bookType" 
          placeholder="Book Type" 
          required 
          onChange={handleChange} 
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="number" 
          name="pages" 
          placeholder="Pages" 
          required 
          onChange={handleChange} 
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="number" 
          name="cost" 
          placeholder="Cost" 
          required 
          onChange={handleChange} 
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="text" 
          name="authorName" 
          placeholder="Author Name" 
          required 
          onChange={handleChange} 
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input 
          type="email" 
          name="authorEmail" 
          placeholder="Author Email" 
          required 
          onChange={handleChange} 
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <button 
          type="submit" 
          className="w-full p-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
