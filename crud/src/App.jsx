import React, { useState } from 'react';
import './App.css';
import CRUD from './components/Crud';
import UserList from './components/UserList';
import SearchBar from './components/SearchBar';
import { PlusCircle, Users } from 'lucide-react';

function App() {
  const [users, setUsers] = useState([
    { id: 1, name: 'Ana Garcia Rodriguez', email: 'ana@anita.com', phone: '+51 232-456-7890', age: 18, country: 'PE', city: 'Lima' },
    { id: 2, name: 'Carlos Lopez Martinez', email: 'carlos@carlitos.com', phone: '+34 983-765-4321', age: 32, country: 'ES', city: 'Madrid' },
    { id: 3, name: 'Maria Fernandez Lopez', email: 'maria@marita.com', phone: '+57 555-123-4567', age: 45, country: 'CO', city: 'Bogotá' }
  ]);

  const [editingUser, setEditingUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. MOSTRAR USUARIOS - Estado principal

  // 2. BUSCAR USUARIO
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 3. ELIMINAR USUARIO
  const deleteUser = (id) => {
    if (window.confirm('¿Estás 100% seguro de eliminar este usuario? 😨')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  // 4. ACTUALIZAR USUARIO
  const updateUser = (updatedUser) => {
    setUsers(users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    ));
    setEditingUser(null);
    setShowForm(false);
  };

  // CREAR NUEVO USUARIO
  const addUser = (user) => {
    const newUser = { ...user, id: Date.now() };
    setUsers([...users, newUser]);
    setShowForm(false);
  };

  const editUser = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const cancelEdit = () => {
    setEditingUser(null);
    setShowForm(false);
  };

  // 6. MOSTRAR TOTAL DE USUARIOS
  const totalUsers = users.length;
  const showingUsers = filteredUsers.length;

  return (
    <div className="app">
      <header className="app-header">
        <Users size={34} className="header-icon" />
        <div className="header-title">
          <h1>CRUD Victor Rod</h1>
          <span className="total-users">Total: {totalUsers} usuarios</span>
        </div>
      </header>

      <main className="app-main">
        <div className="app-controls">
          <div className="controls-left">
            <button 
              className="btn-primary"
              onClick={() => setShowForm(!showForm)}
            >
              <PlusCircle size={20} />
              {showForm ? 'Cancelar' : 'Nuevo Usuario'}
            </button>
          </div>
          
          <div className="controls-right">
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
            <span className="showing-users">
              Mostrando: {showingUsers} de {totalUsers}
            </span>
          </div>
        </div>

        {(showForm || editingUser) && (
          <CRUD 
            user={editingUser}
            onSave={editingUser ? updateUser : addUser}
            onCancel={cancelEdit}
          />
        )}

        <UserList 
          users={filteredUsers}
          onEdit={editUser}
          onDelete={deleteUser}
        />
      </main>
    </div>
  );
}

export default App;
