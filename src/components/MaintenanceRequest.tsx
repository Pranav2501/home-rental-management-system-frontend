import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MaintenanceRequest } from '../types/MaintenanceRequest';

const MaintenanceRequestComponent: React.FC = () => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [formData, setFormData] = useState<MaintenanceRequest>({
    tenant_ID: 0,
    property_ID: 0,
    RequestDate: '',
    Description: '',
    Status: 'Open',
  });

  const [editID, setEditID] = useState<number | null>(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/maintenanceRequest');
      setRequests(response.data.data);
    } catch (error) {
      console.error('Error fetching maintenance requests:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editID) {
      try {
        await axios.put(`http://localhost:4000/api/maintenanceRequest/${editID}`, formData);
        setEditID(null);
        setFormData({
          tenant_ID: 0,
          property_ID: 0,
          RequestDate: '',
          Description: '',
          Status: 'Open',
        });
        fetchRequests();
      } catch (error) {
        console.error('Error updating maintenance request:', error);
      }
    } else {
      try {
        await axios.post('http://localhost:4000/api/maintenanceRequest', formData);
        setFormData({
          tenant_ID: 0,
          property_ID: 0,
          RequestDate: '',
          Description: '',
          Status: 'Open',
        });
        fetchRequests();
      } catch (error) {
        console.error('Error creating maintenance request:', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/api/maintenanceRequest/${id}`);
      fetchRequests();
    } catch (error) {
      console.error('Error deleting maintenance request:', error);
    }
  };

  const handleEdit = (request: MaintenanceRequest) => {
    setEditID(request.maintenancerequest_ID || null);
    setFormData(request);
  };

  return (
    <div className="card">
      <div className="card-header">Manage Maintenance Requests</div>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="row">
            <div className="col-md-6 mb-3">
              <input
                type="number"
                className="form-control"
                name="tenant_ID"
                value={formData.tenant_ID}
                onChange={handleInputChange}
                placeholder="Tenant ID"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="number"
                className="form-control"
                name="property_ID"
                value={formData.property_ID}
                onChange={handleInputChange}
                placeholder="Property ID"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <input
                type="date"
                className="form-control"
                name="RequestDate"
                value={formData.RequestDate}
                onChange={handleInputChange}
                placeholder="Request Date"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <select
                className="form-select"
                name="Status"
                value={formData.Status}
                onChange={handleInputChange}
                required
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="col-md-12 mb-3">
              <textarea
                className="form-control"
                name="Description"
                value={formData.Description}
                onChange={handleInputChange}
                placeholder="Description"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {editID ? 'Update Maintenance Request' : 'Add Maintenance Request'}
          </button>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th>Tenant ID</th>
              <th>Property ID</th>
              <th>Request Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.maintenancerequest_ID}>
                <td>{request.tenant_ID}</td>
                <td>{request.property_ID}</td>
                <td>{request.RequestDate}</td>
                <td>{request.Status}</td>
                <td>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleEdit(request)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={() => handleDelete(request.maintenancerequest_ID || 0)}
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

export default MaintenanceRequestComponent;
