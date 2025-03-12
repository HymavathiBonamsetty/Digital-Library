import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import Books from "./components/Books";
import Student from "./components/Student";
import Issue from "./components/Issue";
import CreateBook from "./pages/CreateBook";
import CreateStudent from "./pages/CreateStudent";
import EditStudent from "./pages/EditStudent";
import EditBook from "./pages/EditBook";
import TxnIssue from "./pages/TxnIssue";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/student" element={<Student />} />
          <Route path="/issue" element={<Issue />} />
          <Route path="/books/create" element={<CreateBook />} />
          <Route path="/student/create" element={<CreateStudent />} />
          <Route path="/student/update/:id" element={<EditStudent />} />
          <Route path="/books/update/:id" element={<EditBook />} />
          <Route path="/issue/create" element={<TxnIssue />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
