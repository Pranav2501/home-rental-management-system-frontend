# Home Rental Management System

## Overview

This React application is designed to help property owners manage rental properties and tenants efficiently. It includes features for tracking property listings, tenant applications, lease agreements, payments, maintenance requests, and tenant referrals.

## Features

1. **Property Management**: Add, edit, and delete property listings with details such as address, type, number of rooms, and rent amount.
2. **Property Owner Management**: Manage property owner information and associate owners with properties.
3. **Application Handling**: Process and track tenant applications for properties.
4. **Maintenance Requests**: Manage maintenance requests submitted by tenants.
5. **Available Properties Listing**: Display available properties for potential tenants to browse and apply.
6. **User-friendly Interface**: Utilizes Bootstrap for a responsive and clean UI.

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- Git

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Pranav2501/home-rental-management-system-frontend.git
   cd home-rental-management-system-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the backend:
   - Ensure you have a backend server running on `http://localhost:4000`
   - If your backend is on a different URL, update the axios base URL in the components

## Running the Application

1. Start the development server:
   ```
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`

## Project Structure

- `src/components/`: Contains React components for different features
  - `ApplicationComponent.tsx`: Manages rental applications
  - `PropertyCardComponent.tsx`: Displays available properties
  - `PropertyOwnerComponent.tsx`: Manages property owners
  - `PropertyComponent.tsx`: Manages property listings
  - `MaintenanceComponent.tsx`: Manages maintenance requests
- `src/types/`: Contains TypeScript interfaces for data models
- `App.tsx`: Main component with routing and layout

## Usage

1. **View Available Properties**: The home page displays all available properties for rent.
2. **Apply for a Property**: Users can apply for a property by clicking the "Apply" button on a property card.
3. **Manage Properties**: Admins can add, edit, and delete property listings.
4. **Manage Property Owners**: Admins can manage property owner information.
5. **Handle Applications**: Admins can view and process rental applications.
6. **Manage Maintenance Requests**: Admins can track and update maintenance requests.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License 

## Acknowledgments

- React.js
- Bootstrap
- Axios

For more detailed information on the database structure and queries, please refer to the [database README](https://github.com/Pranav2501/databases-RentalDB).