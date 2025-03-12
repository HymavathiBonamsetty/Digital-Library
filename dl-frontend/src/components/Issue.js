import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Issue = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/txn/getAll")
            .then(response => response.json())
            .then(data => setTransactions(data))
            .catch(error => console.error("Error fetching transactions:", error));
    }, []);

    const handleReturn = async (txnId, studentEmail, bookNo) => {
        try {
            const response = await fetch("http://localhost:8080/txn/return", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ txnId, studentEmail, bookNo }),
            });

            if (response.ok) {
                alert("Book Returned Successfully!");
                setTransactions(prev => prev.map(txn =>
                    txn.id === txnId ? { ...txn, txnStatus: "RETURNED" } : txn
                ));
            } else {
                const errorData = await response.json();
                alert("Error returning book: " + errorData.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg border border-gray-200">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">Transaction Management</h1>

            <div className="flex justify-end mb-4">
                <Link 
                    to="/issue/create" 
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
                    Add Transaction
                </Link>
            </div>

            {transactions.length === 0 ? (
                <p className="text-center text-red-500 font-semibold">No transactions found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border-collapse border border-gray-300 rounded-lg">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="border p-3">ID</th>
                                <th className="border p-3">Student</th>
                                <th className="border p-3">Book</th>
                                <th className="border p-3">Paid Amount</th>
                                <th className="border p-3">Fine</th>
                                <th className="border p-3">Txn Status</th>
                                <th className="border p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(txn => (
                                <tr key={txn.id} className="text-center border">
                                    <td className="border p-3">{txn.id}</td>
                                    <td className="border p-3">{txn.student.name} ({txn.student.email})</td>
                                    <td className="border p-3">{txn.book.bookName} ({txn.book.bookNo})</td>
                                    <td className="border p-3">${txn.paidAmount}</td>
                                    <td className="border p-3">${txn.fine}</td>
                                    <td className={`border p-3 font-semibold ${txn.txnStatus === "ISSUED" ? "text-orange-500" : "text-green-600"}`}>
                                        {txn.txnStatus}
                                    </td>
                                    <td className="border p-3">
                                        {txn.txnStatus === "ISSUED" && (
                                            <button 
                                                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
                                                onClick={() => handleReturn(txn.id, txn.student.email, txn.book.bookNo)}
                                            >
                                                Return
                                            </button>
                                        )}
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

export default Issue;
