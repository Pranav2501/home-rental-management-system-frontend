import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Property } from '../types/Property';
import { PropertyOwner } from '../types/PropertyOwner';

const PropertyComponent: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [propertyOwners, setPropertyOwners] = useState<PropertyOwner[]>([]);
  const [formData, setFormData] = useState<Property>({
    Address: '',
    City: '',
    State: '',
    ZipCode: '',
    PropertyType: '',
    NumberOfRooms: 0,
    RentAmount: 0,
    propertyowner_ID: 0,
  });

  const [editID, setEditID] = useState<number | null>(null);

  const propertyTypes = ['Apartment', 'House', 'Condo', 'Townhouse', 'Duplex']; // Predefined property types

  useEffect(() => {
    fetchProperties();
    fetchPropertyOwners();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/property');
      setProperties(response.data.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const fetchPropertyOwners = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/propertyOwner');
      setPropertyOwners(response.data.data);
    } catch (error) {
      console.error('Error fetching property owners:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editID) {
      try {
        await axios.put(`http://localhost:4000/api/property/${editID}`, formData);
        setEditID(null);
        resetForm();
        fetchProperties();
      } catch (error) {
        console.error('Error updating property:', error);
      }
    } else {
      try {
        await axios.post('http://localhost:4000/api/property', formData);
        resetForm();
        fetchProperties();
      } catch (error) {
        console.error('Error creating property:', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/api/property/${id}`);
      fetchProperties();
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  const handleEdit = (property: Property) => {
    setEditID(property.property_ID || null);
    setFormData(property);
  };

  const resetForm = () => {
    setFormData({
      Address: '',
      City: '',
      State: '',
      ZipCode: '',
      PropertyType: '',
      NumberOfRooms: 0,
      RentAmount: 0,
      propertyowner_ID: 0,
    });
  };

  return (
    <div className="card">
      <div className="card-header">Manage Properties</div>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="Address">Address</label>
              <input
                type="text"
                className="form-control"
                id="Address"
                name="Address"
                value={formData.Address}
                onChange={handleInputChange}
                placeholder="Enter address"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="City">City</label>
              <input
                type="text"
                className="form-control"
                id="City"
                name="City"
                value={formData.City}
                onChange={handleInputChange}
                placeholder="Enter city"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="State">State</label>
              <input
                type="text"
                className="form-control"
                id="State"
                name="State"
                value={formData.State}
                onChange={handleInputChange}
                placeholder="Enter state"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="ZipCode">Zip Code</label>
              <input
                type="text"
                className="form-control"
                id="ZipCode"
                name="ZipCode"
                value={formData.ZipCode}
                onChange={handleInputChange}
                placeholder="Enter zip code"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="PropertyType">Property Type</label>
              <select
                className="form-control"
                id="PropertyType"
                name="PropertyType"
                value={formData.PropertyType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select property type</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="NumberOfRooms">Number of Rooms</label>
              <input
                type="number"
                className="form-control"
                id="NumberOfRooms"
                name="NumberOfRooms"
                value={formData.NumberOfRooms}
                onChange={handleInputChange}
                placeholder="e.g., 2"
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <label htmlFor="RentAmount">Rent Amount</label>
              <input
                type="number"
                className="form-control"
                id="RentAmount"
                name="RentAmount"
                value={formData.RentAmount}
                onChange={handleInputChange}
                placeholder="e.g., 1200"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="propertyowner_ID">Property Owner</label>
              <select
                className="form-control"
                id="propertyowner_ID"
                name="propertyowner_ID"
                value={formData.propertyowner_ID}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Property Owner</option>
                {propertyOwners.map((owner) => (
                  <option key={owner.propertyowner_ID} value={owner.propertyowner_ID}>
                    {owner.Name} (ID: {owner.propertyowner_ID})
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {editID ? 'Update Property' : 'Add Property'}
          </button>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th>Address</th>
              <th>City</th>
              <th>Rent</th>
              <th>Property Owner</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => {
              const owner = propertyOwners.find((o) => o.propertyowner_ID === property.propertyowner_ID);
              return (
                <tr key={property.property_ID}>
                  <td>{property.Address}</td>
                  <td>{property.City}</td>
                  <td>${property.RentAmount}</td>
                  <td>{owner ? `${owner.Name} (ID: ${owner.propertyowner_ID})` : 'N/A'}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleEdit(property)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm ms-2"
                      onClick={() => handleDelete(property.property_ID || 0)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertyComponent;
