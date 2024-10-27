import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PropertyOwner } from '../types/PropertyOwner';

const PropertyOwnerComponent: React.FC = () => {
  const [propertyOwners, setPropertyOwners] = useState<PropertyOwner[]>([]);
  const [formData, setFormData] = useState<PropertyOwner>({
    Name: '',
    Email: '',
    PhoneNumber: '',
    Address: '',
    TaxID: ''
  });

  const [editID, setEditID] = useState<number | null>(null);

  useEffect(() => {
    fetchPropertyOwners();
  }, []);

  const fetchPropertyOwners = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/propertyOwner');
      setPropertyOwners(response.data.data);
    } catch (error) {
      console.error('Error fetching property owners:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editID) {
      try {
        await axios.put(`http://localhost:4000/api/propertyOwner/${editID}`, formData);
        setEditID(null);
        setFormData({ Name: '', Email: '', PhoneNumber: '', Address: '', TaxID: '' });
        fetchPropertyOwners();
      } catch (error) {
        console.error('Error updating property owner:', error);
      }
    } else {
      try {
        await axios.post('http://localhost:4000/api/propertyOwner', formData);
        setFormData({ Name: '', Email: '', PhoneNumber: '', Address: '', TaxID: '' });
        fetchPropertyOwners();
      } catch (error) {
        console.error('Error creating property owner:', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/api/propertyOwner/${id}`);
      fetchPropertyOwners();
    } catch (error) {
      console.error('Error deleting property owner:', error);
    }
  };

  const handleEdit = (owner: PropertyOwner) => {
    setEditID(owner.propertyowner_ID || null);
    setFormData(owner);
  };

  return (
    <div className="card">
      <div className="card-header">Manage Property Owners</div>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                name="Name"
                value={formData.Name}
                onChange={handleInputChange}
                placeholder="Name"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="email"
                className="form-control"
                name="Email"
                value={formData.Email}
                onChange={handleInputChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                name="PhoneNumber"
                value={formData.PhoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                name="Address"
                value={formData.Address}
                onChange={handleInputChange}
                placeholder="Address"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="text"
                className="form-control"
                name="TaxID"
                value={formData.TaxID}
                onChange={handleInputChange}
                placeholder="Tax ID"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {editID ? 'Update Property Owner' : 'Add Property Owner'}
          </button>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {propertyOwners.map((owner) => (
              <tr key={owner.propertyowner_ID}>
                <td>{owner.Name}</td>
                <td>{owner.Email}</td>
                <td>{owner.PhoneNumber}</td>
                <td>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleEdit(owner)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={() => handleDelete(owner.propertyowner_ID || 0)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertyOwnerComponent;
