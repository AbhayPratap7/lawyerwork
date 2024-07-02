import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Employee.css';

const Employee = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [employees, setEmployees] = useState(() => {
    const savedEmployees = localStorage.getItem('employees');
    return savedEmployees ? JSON.parse(savedEmployees) : [];
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  const handleAddEmployee = (employee) => {
    setEmployees([...employees, employee]);
  };

  const handleEditEmployee = (updatedEmployee) => {
    const updatedEmployees = employees.map(employee =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );
    setEmployees(updatedEmployees);
    setIsEditing(false);
    setCurrentEmployee(null);
  };

  const handleDeleteEmployee = (employeeId) => {
    const updatedEmployees = employees.filter(employee => employee.id !== employeeId);
    setEmployees(updatedEmployees);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo">YOUR LOGO</div>
        <nav>
          <ul>
            {['Dashboard', 'Employee', 'Matter', 'Time sheet', 'Client', 'Document', 'Invoice', 'Receipt', 'Expanse', 'Report'].map((item) => (
              <li key={item}>
                <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className={item === 'Employee' ? 'active' : ''}>{item}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="main-content">
        <header>
          <div className="menu-icon">☰</div>
          <div className="profile" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            PROFILE ▼
            {showProfileMenu && (
              <div className="profile-menu">
                <div>Profile</div>
                <div>Settings</div>
                <div>Logout</div>
              </div>
            )}
          </div>
        </header>
        <div className="employee-page">
          <h1>
            Employee Details
            <button className="add-button" onClick={() => setIsEditing(true)}>+</button>
          </h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search employee name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button">🔍</button>
          </div>
          <div className="employee-grid">
            {filteredEmployees.map(employee => (
              <div key={employee.id} className="employee-card">
                <div className="card-header">
                  <button className="edit-button" onClick={() => {
                    setIsEditing(true);
                    setCurrentEmployee(employee);
                  }}>✎</button>
                  <button className="delete-button" onClick={() => handleDeleteEmployee(employee.id)}>🗑️</button>
                </div>
                <img src={employee.image} alt={employee.name} className="employee-image" />
                <h2>{employee.name}</h2>
                <p><span className="icon">📞</span> {employee.phone}</p>
                <p><span className="icon">📱</span> {employee.mobile}</p>
                <p><span className="icon">✉️</span> {employee.email}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      {isEditing && (
        <EmployeeForm
          onSave={(employee) => {
            if (currentEmployee) {
              handleEditEmployee(employee);
            } else {
              handleAddEmployee({ ...employee, id: employees.length + 1 });
            }
          }}
          onCancel={() => {
            setIsEditing(false);
            setCurrentEmployee(null);
          }}
          employee={currentEmployee}
        />
      )}
    </div>
  );
};

const EmployeeForm = ({ onSave, onCancel, employee }) => {
  const [formState, setFormState] = useState(
    employee || { name: '', phone: '', mobile: '', email: '', image: '' }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formState);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{employee ? 'Edit Employee' : 'Add Employee'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" name="name" value={formState.name} onChange={handleChange} />
          </label>
          <label>
            Phone:
            <input type="text" name="phone" value={formState.phone} onChange={handleChange} />
          </label>
          <label>
            Mobile:
            <input type="text" name="mobile" value={formState.mobile} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={formState.email} onChange={handleChange} />
          </label>
          <label>
            Image URL:
            <input type="text" name="image" value={formState.image} onChange={handleChange} />
          </label>
          <div className="form-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Employee;
