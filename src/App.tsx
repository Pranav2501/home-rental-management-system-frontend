import React, { useState } from 'react';
import './App.css';
import PropertyOwnerComponent from './components/PropertyOwner';
import PropertyComponent from './components/Property';
import ApplicationComponent from './components/Application';
import MaintenanceRequestComponent from './components/MaintenanceRequest';
import PropertyCardComponent from './components/PropertyCardComponent'; // Import the new component
import 'bootstrap/dist/css/bootstrap.min.css';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('availableProperties'); // Set default tab to 'availableProperties'

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="app-container d-flex flex-column min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      {/* Header Section */}
      <header className="bg-dark text-white py-3">
        <div className="container">
          <h1 className="text-center">Home Rental Management System</h1>
        </div>
      </header>

      {/* Navigation Tabs and Main Content */}
      <main className="container my-5 flex-grow-1">
        {/* Navigation Tabs */}
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 'availableProperties' ? 'active' : ''}`}
              onClick={() => handleTabChange('availableProperties')}
              style={{ cursor: 'pointer' }}
            >
              Available Properties
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 'properties' ? 'active' : ''}`}
              onClick={() => handleTabChange('properties')}
              style={{ cursor: 'pointer' }}
            >
              Manage Properties
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 'owners' ? 'active' : ''}`}
              onClick={() => handleTabChange('owners')}
              style={{ cursor: 'pointer' }}
            >
              Manage Property Owners
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 'applications' ? 'active' : ''}`}
              onClick={() => handleTabChange('applications')}
              style={{ cursor: 'pointer' }}
            >
              Manage Applications
            </a>
          </li>
          <li className="nav-item">
            <a
              className={`nav-link ${activeTab === 'maintenance' ? 'active' : ''}`}
              onClick={() => handleTabChange('maintenance')}
              style={{ cursor: 'pointer' }}
            >
              Manage Maintenance Requests
            </a>
          </li>
        </ul>

        {/* Conditionally Render Content */}
        <div className="mt-4">
          {activeTab === 'availableProperties' && <PropertyCardComponent />}
          {activeTab === 'properties' && <PropertyComponent />}
          {activeTab === 'owners' && <PropertyOwnerComponent />}
          {activeTab === 'applications' && <ApplicationComponent />}
          {activeTab === 'maintenance' && <MaintenanceRequestComponent />}
        </div>
      </main>

      {/* Footer Section */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <div className="container">
          <p>© 2024 Home Rental Management System. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
