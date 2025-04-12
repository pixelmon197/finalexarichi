// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserPanel from './components/UserPanel';
import UserList from './components/UserList'; // Asegúrate de que la ruta sea correcta
import Login from './components/Login';
import CreateUser from './components/CreateUser';  // Importa el componente
import CreateUserNew from './components/CreateUserNew';  // Importa el componente


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/UserPanel" element={<UserPanel />} />
        <Route path="/create-user-new" element={<CreateUserNew />} />
      </Routes>
    </Router>
  );
}

export default App;
