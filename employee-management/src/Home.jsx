import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css";

export default function Home() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  useEffect(() => {
    axios
      .get("https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee")
      .then((response) => {
        setEmployees(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (event) => {
    const id = event.target.value;
    setSearchTerm(id);
    if (id) {
      // Fetch the employee by ID
      axios
        .get(
          `https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee/${id}`
        )
        .then((response) => {
          setSearchResult(response.data);
        })
        .catch((error) => {
          setSearchResult(null);
        });
    } else {
      setSearchResult(null);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mt-4">
        <div className="button">
                  <Link to={`/add`}>Add Employee</Link>
        </div>
      <div>
        <input
          type="text"
          placeholder="Search by ID"
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control mb-3"
        />
      </div>
      <ul className="list-group">
        {searchResult ? (
          <li
            className="list-group-item d-flex align-items-center"
            key={searchResult.id}
          >
            <img
              src={searchResult.avatar}
              alt={`${searchResult.name}'s avatar`}
              className="avatar"
            />
            <div className="ms-3">
              <h5>{searchResult.name}</h5>
              <p>ID: {searchResult.id}</p>
            </div>
            <div>
                <div className="button">
                  <Link to={`/details/${searchResult.id}`}>View Details</Link>
                </div>
                <div className="button">
                  <Link to={`/edit/${searchResult.id}`}>Edit Employee</Link>
                </div>
                <div className="button">
                  <Link to={`/delete/${searchResult.id}`}>Delete Employee</Link>
                </div>
              </div>
          </li>
        ) : searchTerm ? (
          <li className="list-group-item">
            No employee found with ID {searchTerm}
          </li>
        ) : (
          employees.map((employee) => (
            <li
              className="list-group-item d-flex align-items-center"
              key={employee.id}
            >
              <img
                src={employee.avatar}
                alt={`${employee.name}'s avatar`}
                className="avatar"
              />
              <div className="ms-3">
                <h5>{employee.name}</h5>
                <p>ID: {employee.id}</p>
              </div>
              <div>
                <div className="button">
                  <Link to={`/details/${employee.id}`}>View Details</Link>
                </div>
                <div className="button">
                  <Link to={`/edit/${employee.id}`}>Edit Employee</Link>
                </div>
                <div className="button">
                  <Link to={`/delete/${employee.id}`}>Delete Employee</Link>
                </div>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}