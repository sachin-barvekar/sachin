import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteEmployee = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [error, setError] = React.useState(null);

    const handleDelete = () => {
            axios.delete(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`)
                .then(() => {
                    navigate('/');
                })
                .catch((error) => {
                    console.error("Error deleting employee:", error);
                    setError(error);
                });
    }

    return (
        <div className="container mt-4">
            <h3>Delete Employee</h3>
            <p>Are you sure you want to delete employee ID: {id}?</p>
            <button onClick={handleDelete} className="btn btn-danger">
                Confirm Delete
            </button>
            {error && <div className="alert alert-danger">Error: {error.message}</div>}
        </div>
    );
};

export default DeleteEmployee;
