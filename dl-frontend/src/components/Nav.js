import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
    render() {
        return (
            <nav className="bg-blue-600 text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <span className="text-xl font-bold">Digital Library</span>
                    <ul className="flex space-x-6">
                        <li>
                            <Link to="/" className="hover:text-gray-200 transition">Home</Link>
                        </li>
                        <li>
                            <Link to="/student" className="hover:text-gray-200 transition">Student</Link>
                        </li>
                        <li>
                            <Link to="/issue" className="hover:text-gray-200 transition">Issue Book</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Nav;

