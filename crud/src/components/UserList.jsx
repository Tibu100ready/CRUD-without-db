import React from 'react';
import UserCard from './UserCard';
import { Users } from 'lucide-react';

// Función para truncar nombres (máximo 10 caracteres + ...)
const truncateName = (name, maxLength = 10) => {
  if (name.length <= maxLength) return name;
  return name.substring(0, maxLength) + '...';
};

function UserList({ users, onEdit, onDelete }) {
  if (users.length === 0) {
    return (
      <div className="empty-state">
        <Users size={48} />
        <h3>No se encontraron usuarios 🥶</h3>
        <p>Borraste todos los usuarios 😂</p>
      </div>
    );
  }

  return (
    <div className="user-list">
      <div className="user-grid">
        {users.map(user => (
          <UserCard 
            key={user.id}
            user={{
              ...user,
              displayName: truncateName(user.name)
            }}
            fullName={user.name}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default UserList;