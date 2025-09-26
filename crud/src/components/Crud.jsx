import React, { useState, useEffect } from 'react';
import { Save, X, User } from 'lucide-react';

export default Crud; function Crud({ user, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    country: '',
    city: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData(user);
    } else {
      setFormData({ name: '', email: '', phone: '', age: '' });
    }
    setErrors({});
  }, [user]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (formData.age && (formData.age < 1 || formData.age > 120)) {
      newErrors.age = 'La edad debe estar entre 1 y 120 años';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  return (
    <div className="crud-container">
      <div className="crud-header">
        <User size={24} />
        <h3>{user ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="crud-form">
        <div className="form-group">
          <label htmlFor="name">Nombre completo:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Ej: Juan Pérez García"
            className={errors.name ? 'error' : ''}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
          <small>Máximo 10 caracteres visibles en la lista (se truncará el exceso)</small>
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="usuario@email.com"
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

          <div className="form-group">
            <label>Teléfono:</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+58 414 123-4567"
              maxLength="15"
            />
          </div>

        <div className="form-row">
        <div className="form-group">
            <label>País (Código):</label>
            <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Ej: MX, US, ES"
            maxLength="2"
            style={{textTransform: 'uppercase'}}
            />
            <small>Código de 2 letras (MX, US, ES, etc.)</small>
            </div>
             <div className="form-group">

        <label>Ciudad:</label>
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Ej: Caracas, Madrid, Lima..."
        />
      </div>

          <div className="form-group">
            <label htmlFor="age">Edad:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="25"
              min="1"
              max="120"
              className={errors.age ? 'error' : ''}
            />
            {errors.age && <span className="error-message">{errors.age}</span>}
          </div>
        </div>

        <div className="form-preview">
          <h4>Vista previa en lista:</h4>
          <div className="preview-card">
            <strong>Nombre mostrado:</strong> 
            {formData.name.length > 10 ? 
              `${formData.name.substring(0, 10)}...` : 
              formData.name || '(vacío)'
            }
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="btn-secondary">
            <X size={18} />
            Cancelar
          </button>
          <button type="submit" className="btn-primary">
            <Save size={18} />
            {user ? 'Actualizar' : 'Crear'} Usuario
          </button>
        </div>
      </form>
    </div>
  );
}
