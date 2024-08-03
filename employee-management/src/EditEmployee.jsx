import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState({
        name: '',
        emailId: '',
        mobile: '',
        country: '',
        state: '',
        district: ''
    });
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch countries
        axios.get('https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country')
            .then(response => {
                setCountries(response.data);
            })
            .catch(error => {
                console.error("Error fetching countries:", error);
                setError(error);
            });

        // Fetch employee details for editing
        axios.get(`https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`)
            .then(response => {
                setEmployee(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching employee details:", error);
                setError(error);
            });
    }, [id, navigate]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const url = `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`;
        axios.put(url, employee)
            .then(response => {
                navigate('/'); // Redirect to the employee list or another page after successful update
            })
            .catch(error => {
                console.error("Error updating employee data:", error);
                setError(error);
            });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container mt-4">
            <h3>Edit Employee</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={employee.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="emailId" className="form-label">Email ID</label>
                    <input
                        type="email"
                        className="form-control"
                        id="emailId"
                        name="emailId"
                        value={employee.emailId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="mobile" className="form-label">Mobile</label>
                    <input
                        type="text"
                        className="form-control"
                        id="mobile"
                        name="mobile"
                        value={employee.mobile}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="country" className="form-label">Country</label>
                    <select
                        className="form-select"
                        id="country"
                        name="country"
                        value={employee.country}
                        onChange={handleChange}
                        required
                    >
                        <option value="">{employee.country}</option>
                        {countries.map(country => (
                            <option key={country.id} value={country.country}>
                                {country.country}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="state" className="form-label">State</label>
                    <input
                        type="text"
                        className="form-control"
                        id="state"
                        name="state"
                        value={employee.state}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="district" className="form-label">District</label>
                    <input
                        type="text"
                        className="form-control"
                        id="district"
                        name="district"
                        value={employee.district}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success">
                    Update Employee
                </button>
            </form>
        </div>
    );
};

export default EditEmployee;