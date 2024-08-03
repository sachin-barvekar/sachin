import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function EmployeeDetails( ) {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            // Fetch the employee by ID
            axios.get(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`)
                .then(response => {
                    setEmployee(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    setError(error);
                    setLoading(false);
                });
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!employee) {
        return <div>No employee data available.</div>;
    }

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card" style={{ width: '18rem' }}>
                        <img className="card-img-top" src={employee.avatar} alt={`${employee.name}'s avatar`} />
                        <div className="card-body">
                            <h5 className="card-title">{employee.name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">ID: {employee.id}</h6>
                            <p className="card-text">Email: {employee.emailId}</p>
                            <p className="card-text">Mobile: {employee.mobile}</p>
                            <p className="card-text">
                                <span>District: {employee.district?.label || employee.district || 'N/A'}</span> <br />
                                <span>State: {employee.state?.label || employee.state || 'N/A'}</span> <br />
                                <span>Country: {employee.country?.label || employee.country || 'N/A'}</span> <br />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
