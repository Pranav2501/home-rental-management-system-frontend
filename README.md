
# Home Rental Management System (React App)
The frontend is built with React and styled with Bootstrap. It provides an interface for managing the Home Rental Management System, including managing properties, owners, applications, maintenance requests, and allowing tenants to apply for properties.

## Requirements
Node.js (version 14 or higher)
npm or yarn
##Setup
Navigate to the frontend folder:

bash
Copy code
```
cd home-rental-management/frontend
```

cd home-rental-management/frontend
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm start
By default, the frontend app will run on port 3000.

Configure Backend URL: If the backend is running on a different port or URL, update the API base URLs in the frontend code (typically in the service or API configuration files).

Features
Available Properties: Display available properties as cards with a button to apply.
Manage Properties: CRUD operations for managing properties in the system.
Manage Property Owners: CRUD operations for managing property owners.
Manage Applications: Display applications with tenant and property details.
Manage Maintenance Requests: Track and manage maintenance requests.
Component Structure
PropertyCardComponent: Displays available properties in a card format, with an option to apply for a property.
PropertyComponent: Manages property listings, including adding, editing, and deleting properties.
PropertyOwnerComponent: Manages property owners.
ApplicationComponent: Lists applications with tenant and property information.
MaintenanceRequestComponent: Manages maintenance requests for properties.





# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
