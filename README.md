BOL Tracker – Frontend Implementation

I built this frontend interface for managing Bill of Lading (BOL) records using React, Vite, and React Router. It provides a complete UI for performing CRUD operations through interaction with the backend API.

Project Setup

First, I initialized the frontend structure:

Created the project directory with mkdir frontend
Initialized a Vite + React project using npm create vite@latest
Selected:
Framework: React
Variant: JavaScript
I installed these essential dependencies:

react-router-dom for client-side routing
axios for making HTTP requests to the backend
The project follows this organized structure:

pages/ folder for route-level components like HomePage, BOL list, and detail views
components/ folder for reusable UI elements
utilities/ folder for API functions
Core files like App.jsx, main.jsx, and main.css for routing, app initialization, and styling
For configuration, I:

Set the development server port to 3001 in vite.config.js
Created an .env file for storing environment variables
Configured .gitignore to exclude .env and build artifacts
Disabled prop-types linting in eslint.config.js for cleaner development
Frontend Implementation

I configured the app to:

Launch the development server using npm run dev
Use BrowserRouter to handle client-side routing
Render pages like the dashboard, create/edit forms, and detailed BOL views
Communicate with the backend via a utility module (bols-api.js) using Axios
Main Routes

I implemented the following routes:

/ – HomePage
Displays a simple welcome message and a CTA button to view the BOL dashboard.
/bol – BOL List
Fetches and displays all BOL records in card format with quick access to view or edit each.
/bol/add – Add BOL
Provides a form to create a new BOL with validation and dropdown for status.
/bol/:id – BOL Detail
Shows detailed info for a specific BOL, with options to edit or go back.
/bol/edit/:id – Edit BOL
Loads existing BOL data into a form for editing and submits updates via API.
Core Components

I developed these main components:

App.jsx
Handles all route definitions
Organizes navigation between views
HomePage.jsx
Provides the landing screen with a CTA to view BOLs
BolList.jsx
Fetches all BOLs from the backend
Displays them using responsive cards with visual status indicators
AddBol.jsx
Contains a controlled form for creating new BOL entries
Submits data to the backend via the createBOL function
BolDetail.jsx
Retrieves a BOL by its ID
Displays all fields in a styled layout
Offers links to go back or edit
EditBol.jsx
Loads BOL data for editing
Allows updating of all fields
Sends a PUT request to update the record
bols-api.js
Contains reusable functions:
getAllBOLs()
getBOLById(id)
createBOL(data)
updateBOL(id, data)
deleteBOL(id)
Each function uses axios to interact with the backend API at http://localhost:3000/api/bols.

Styling

Each page and component uses dedicated CSS files to maintain separation of concerns and keep styles modular. Core layout and accessibility enhancements are handled in main.css, including a modern CSS reset.

The system is fully functional, responsive, and integrates seamlessly with the backend API. It's structured for clarity, scalability, and maintainability in future development.

backend github:
https://github.com/JoanneOs/Osman_Joanne_BOLTrack_Capstone.git

render:

https://front-end-id6w.onrender.com// new

https://osman-joanne-boltracker-capstone-frontend.onrender.com# frontendrendertest

/////////////////////was test//////
Frontend (https://frontendrendertest.onrender.com) loads data from https://back-end-pyu8.onrender.com/api/bols