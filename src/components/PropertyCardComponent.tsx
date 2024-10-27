import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Property } from '../types/Property';

interface TenantFormData {
  tenantName: string;
  tenantEmail: string;
}

const PropertyCardComponent: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [tenantFormData, setTenantFormData] = useState<TenantFormData>({
    tenantName: '',
    tenantEmail: '',
  });
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/property');
      setProperties(response.data.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTenantFormData({ ...tenantFormData, [name]: value });
  };

  const handleApply = (propertyId: number) => {
    setSelectedPropertyId(propertyId);
  };

  const handleSubmitApplication = async () => {
    if (!selectedPropertyId || !tenantFormData.tenantName || !tenantFormData.tenantEmail) {
      console.error("Incomplete tenant information or property selection.");
      return;
    }

    try {
      // Insert new tenant into Tenant table
      const tenantResponse = await axios.post('http://localhost:4000/api/tenant', {
        Name: tenantFormData.tenantName,
        Email: tenantFormData.tenantEmail,
      });

      if (tenantResponse.status === 200) {
        const tenantId = tenantResponse.data.data.tenant_ID;

        // Insert new application into Application table
        await axios.post('http://localhost:4000/api/application', {
          tenant_ID: tenantId,
          property_ID: selectedPropertyId,
          ApplicationDate: new Date().toISOString().split('T')[0], // current date in YYYY-MM-DD format
          ApplicationStatus: 'Pending',
        });

        console.log('Application submitted successfully.');
        alert('Application submitted successfully.');

        // Clear form and close modal
        setTenantFormData({ tenantName: '', tenantEmail: '' });
        setSelectedPropertyId(null);
      }
    } catch (error) {
      console.error('Error applying for property:', error);
      alert('Failed to submit application');
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center">Available Properties</h2>
      <div className="row">
        {properties.map((property) => (
          <div key={property.property_ID} className="col-md-4">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{property.Address}</h5>
                <p className="card-text">
                  City: {property.City}<br />
                  State: {property.State}<br />
                  Zip Code: {property.ZipCode}<br />
                  Rooms: {property.NumberOfRooms}<br />
                  Rent: ${property.RentAmount}<br />
                  Type: {property.PropertyType}
                </p>
                <button
                  className="btn btn-primary"
                  onClick={() =>
                    property.property_ID !== undefined && handleApply(property.property_ID)
                  }
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Application Form Modal */}
      {selectedPropertyId && (
        <div className="modal show d-block">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Apply for Property</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedPropertyId(null)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="mb-3">
                    <label htmlFor="tenantName" className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="tenantName"
                      name="tenantName"
                      value={tenantFormData.tenantName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tenantEmail" className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="tenantEmail"
                      name="tenantEmail"
                      value={tenantFormData.tenantEmail}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setSelectedPropertyId(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSubmitApplication}
                >
                  Submit Application
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyCardComponent;
