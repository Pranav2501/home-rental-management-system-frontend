import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Application } from '../types/Application';

const ApplicationComponent: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [formData, setFormData] = useState<Application>({
    tenant_ID: 0,
    property_ID: 0,
    ApplicationDate: '',
    ApplicationStatus: 'Pending',
  });

  const [editID, setEditID] = useState<number | null>(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/application');
      setApplications(response.data.data);
    } catch (error) {
      console.error('Error fetching applications:', error);
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
        await axios.put(`http://localhost:4000/api/application/${editID}`, formData);
        setEditID(null);
        setFormData({
          tenant_ID: 0,
          property_ID: 0,
          ApplicationDate: '',
          ApplicationStatus: 'Pending',
        });
        fetchApplications();
      } catch (error) {
        console.error('Error updating application:', error);
      }
    } else {
      try {
        await axios.post('http://localhost:4000/api/application', formData);
        setFormData({
          tenant_ID: 0,
          property_ID: 0,
          ApplicationDate: '',
          ApplicationStatus: 'Pending',
        });
        fetchApplications();
      } catch (error) {
        console.error('Error creating application:', error);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:4000/api/application/${id}`);
      fetchApplications();
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  const handleEdit = (application: Application) => {
    setEditID(application.application_ID || null);
    setFormData(application);
  };

  return (
    <div className="card">
      <div className="card-header">Manage Applications</div>
      <div className="card-body">
        <form onSubmit={handleSubmit} className="mb-3">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="tenant_ID">Tenant ID</label>
              <input
                type="number"
                className="form-control"
                id="tenant_ID"
                name="tenant_ID"
                value={formData.tenant_ID}
                onChange={handleInputChange}
                placeholder="Tenant ID"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="property_ID">Property ID</label>
              <input
                type="number"
                className="form-control"
                id="property_ID"
                name="property_ID"
                value={formData.property_ID}
                onChange={handleInputChange}
                placeholder="Property ID"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="ApplicationDate">Application Date</label>
              <input
                type="date"
                className="form-control"
                id="ApplicationDate"
                name="ApplicationDate"
                value={formData.ApplicationDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="ApplicationStatus">Application Status</label>
              <select
                className="form-select"
                id="ApplicationStatus"
                name="ApplicationStatus"
                value={formData.ApplicationStatus}
                onChange={handleInputChange}
                required
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {editID ? 'Update Application' : 'Add Application'}
          </button>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th>Applicant Name</th>
              <th>Property Address</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.application_ID}>
                <td>{application.TenantName || 'N/A'}</td>
                <td>{application.PropertyAddress || 'N/A'}</td>
                <td>{application.ApplicationDate}</td>
                <td>{application.ApplicationStatus}</td>
                <td>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleEdit(application)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={() => handleDelete(application.application_ID || 0)}
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

export default ApplicationComponent;
