import React from 'react';
import { Edit, Trash2, User, Phone, Mail, Calendar, MapPin } from 'lucide-react';

const getFlagEmoji = (countryCode) => {
  if (!countryCode) return '🏴';
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
};

function UserCard({ user, fullName, onEdit, onDelete }) {
  return (
    <div className="user-card" title={`Nombre completo: ${fullName}`}>
      <div className="user-card-header">
        <User size={24} className="user-icon" />
        <h3 className="user-name" title={fullName}>
          {user.displayName}
        </h3>
        <div className="user-actions">
          <button onClick={() => onEdit(user)} className="btn-edit" title="Editar">
            <Edit size={16} />
          </button>
          <button onClick={() => onDelete(user.id)} className="btn-delete" title="Eliminar">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="user-card-body">
        <div className="user-info">
          <Mail size={16} />
          <span title={user.email}>{user.email}</span>
        </div>
        
        <div className="user-info">
          <Phone size={16} />
          <span>{user.phone || 'No especificado'}</span>
        </div>
        
        <div className="user-info">
          <Calendar size={16} />
          <span>{user.age ? `${user.age} años` : 'Edad no especificada'}</span>
        </div>
      </div>
      <div className="user-info">
        <MapPin size={16} />
  <MapPin size={16} />
  <span>
    {getFlagEmoji(user.country)} {user.city || 'Ciudad no especificada'}
  </span>
</div>

      <div className="user-card-footer">
        <small>ID: {user.id}</small>
      </div>
    </div>
  );
}

export default UserCard;