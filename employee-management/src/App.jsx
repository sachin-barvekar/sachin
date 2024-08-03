import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import AddEmployee from './AddEmployee';
import EditEmployee from './EditEmployee';
import EmployeeDetails from './EmployeeDetails';
import DeleteEmployee from './DeleteEmployee';
import './App.css'; // Import CSS

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Employee Management</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddEmployee />} />
          <Route path="/edit/:id" element={<EditEmployee />} />
          <Route path="/details/:id" element={<EmployeeDetails />} />
          <Route path="/delete/:id" element={<DeleteEmployee />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
