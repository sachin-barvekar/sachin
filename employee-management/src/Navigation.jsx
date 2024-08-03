// src/Navigation.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/add">Add Employee</Link></li>
                {/* Add other links as needed */}
            </ul>
        </nav>
    );
};

export default Navigation;
