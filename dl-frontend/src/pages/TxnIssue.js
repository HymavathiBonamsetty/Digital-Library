import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TxnIssue = () => {
    const [txnData, setTxnData] = useState({
        studentEmail: "",
        bookNo: "",
        paidAmount: ""
    });
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        setTxnData({ ...txnData, [e.target.name]: e.target.value });
    };

    const handleIssue = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/txn/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(txnData),
            });
            if (response.ok) {
                alert("Transaction Added Successfully!");
                navigate("/issue"); // Redirect to transactions page
            } else {
                alert("Error adding transaction!");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-4">Issue a Book</h2>
            <form onSubmit={handleIssue} className="space-y-4">
                <input 
                    type="email" 
                    name="studentEmail" 
                    placeholder="Student Email" 
                    value={txnData.studentEmail} 
                    onChange={handleChange} 
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input 
                    type="text" 
                    name="bookNo" 
                    placeholder="Book No" 
                    value={txnData.bookNo} 
                    onChange={handleChange} 
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input 
                    type="number" 
                    name="paidAmount" 
                    placeholder="Paid Amount" 
                    value={txnData.paidAmount} 
                    onChange={handleChange} 
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Add Transaction</button>
            </form>
        </div>
    );
};

export default TxnIssue;
