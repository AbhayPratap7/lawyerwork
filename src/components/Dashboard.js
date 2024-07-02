import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './Dashboard.css';
import Employee from './Employee';

const Dashboard = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [appointments, setAppointments] = useState(() => {
    const savedAppointments = localStorage.getItem('appointments');
    return savedAppointments ? JSON.parse(savedAppointments) : [];
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAppointment, setNewAppointment] = useState({ id: '', date: '', client: '', partner: '', task: '', closing: '' });

  const [isEditing, setIsEditing] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [editAppointment, setEditAppointment] = useState({ id: '', date: '', client: '', partner: '', task: '', closing: '' });

  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 13;

  useEffect(() => {
    localStorage.setItem('appointments', JSON.stringify(appointments));
  }, [appointments]);

  const handleAddAppointment = () => {
    const no = (appointments.length + 1).toString().padStart(2, '0');
    const updatedAppointments = [...appointments, { ...newAppointment, no }];
    setAppointments(updatedAppointments);
    setNewAppointment({ id: '', date: '', client: '', partner: '', task: '', closing: '' });
    setShowAddForm(false);
  };

  const handleEditAppointment = (index) => {
    setCurrentEditIndex(index);
    setEditAppointment(appointments[index]);
    setIsEditing(true);
  };

  const handleUpdateAppointment = () => {
    const updatedAppointments = appointments.map((appointment, index) => index === currentEditIndex ? editAppointment : appointment);
    setAppointments(updatedAppointments);
    setIsEditing(false);
    setEditAppointment({ id: '', date: '', client: '', partner: '', task: '', closing: '' });
  };

  const handleDeleteAppointment = (index) => {
    const updatedAppointments = appointments.filter((_, i) => i !== index);
    setAppointments(updatedAppointments);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(appointments.length / appointmentsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="logo">YOUR LOGO</div>
        <nav>
          <ul>
            {['Dashboard', 'Employee', 'Matter', 'Time sheet', 'Client', 'Document', 'Invoice', 'Receipt', 'Expanse', 'Report'].map((item) => (
              <li key={item}>
                <Link to={`/${item.toLowerCase().replace(' ', '-')}`} className={item === 'Dashboard' ? 'active' : ''}>{item}</Link>
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
        <Routes>
          <Route path="/" element={
            <AppointmentList
              appointments={currentAppointments}
              showAddForm={showAddForm}
              setShowAddForm={setShowAddForm}
              newAppointment={newAppointment}
              setNewAppointment={setNewAppointment}
              handleAddAppointment={handleAddAppointment}
              handleEditAppointment={handleEditAppointment}
              handleDeleteAppointment={handleDeleteAppointment}
              isEditing={isEditing}
              editAppointment={editAppointment}
              setEditAppointment={setEditAppointment}
              handleUpdateAppointment={handleUpdateAppointment}
              currentPage={currentPage}
              pageNumbers={pageNumbers}
              paginate={paginate}
            />
          } />
          <Route path="/employee" element={<Employee />} />
        </Routes>
      </main>
    </div>
  );
};

const AppointmentList = ({
  appointments,
  showAddForm,
  setShowAddForm,
  newAppointment,
  setNewAppointment,
  handleAddAppointment,
  handleEditAppointment,
  handleDeleteAppointment,
  isEditing,
  editAppointment,
  setEditAppointment,
  handleUpdateAppointment,
  currentPage,
  pageNumbers,
  paginate
}) => {
  return (
    <div className="appointment-list">
      <div className="appointment-header">
        <h2>Appointments <button onClick={() => setShowAddForm(true)}>+</button></h2>
        <div className="appointment-controls">
          <span>show</span>
          <select>
            <option>Archive</option>
          </select>
          <input type="text" placeholder="Search Matter" />
          <button>🔍</button>
        </div>
        <div className="pagination">
          {pageNumbers.map(number => (
            <span key={number} onClick={() => paginate(number)} className={currentPage === number ? 'active' : ''}>
              {number}
            </span>
          ))}
        </div>
      </div>
      {showAddForm && (
        <div className="add-form">
          <input type="text" placeholder="ID" value={newAppointment.id} onChange={(e) => setNewAppointment({...newAppointment, id: e.target.value})} />
          <input type="date" value={newAppointment.date} onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})} />
          <input type="text" placeholder="Client" value={newAppointment.client} onChange={(e) => setNewAppointment({...newAppointment, client: e.target.value})} />
          <input type="text" placeholder="Partner" value={newAppointment.partner} onChange={(e) => setNewAppointment({...newAppointment, partner: e.target.value})} />
          <input type="text" placeholder="Task" value={newAppointment.task} onChange={(e) => setNewAppointment({...newAppointment, task: e.target.value})} />
          <input type="date" value={newAppointment.closing} onChange={(e) => setNewAppointment({...newAppointment, closing: e.target.value})} />
          <button onClick={handleAddAppointment}>Add</button>
        </div>
      )}
      {isEditing && (
        <div className="edit-form">
          <input type="text" placeholder="ID" value={editAppointment.id} onChange={(e) => setEditAppointment({...editAppointment, id: e.target.value})} />
          <input type="date" value={editAppointment.date} onChange={(e) => setEditAppointment({...editAppointment, date: e.target.value})} />
          <input type="text" placeholder="Client" value={editAppointment.client} onChange={(e) => setEditAppointment({...editAppointment, client: e.target.value})} />
          <input type="text" placeholder="Partner" value={editAppointment.partner} onChange={(e) => setEditAppointment({...editAppointment, partner: e.target.value})} />
          <input type="text" placeholder="Task" value={editAppointment.task} onChange={(e) => setEditAppointment({...editAppointment, task: e.target.value})} />
          <input type="date" value={editAppointment.closing} onChange={(e) => setEditAppointment({...editAppointment, closing: e.target.value})} />
          <button onClick={handleUpdateAppointment}>Update</button>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>NO</th>
            <th>Appointment ID</th>
            <th>DATE</th>
            <th>CLIENT NAME</th>
            <th>PARTNER</th>
            <th>TASK</th>
            <th>CLOSING</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.no}</td>
              <td>{appointment.id}</td>
              <td>{appointment.date}</td>
              <td>{appointment.client}</td>
              <td>{appointment.partner}</td>
              <td>{appointment.task}</td>
              <td>{appointment.closing}</td>
              <td>
                <button onClick={() => handleEditAppointment(index)}>Edit</button>
                <button onClick={() => handleDeleteAppointment(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
