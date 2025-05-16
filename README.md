Here's a more concise README.md that focuses on the key information while maintaining all essential details:

# BOL Tracker – Frontend Implementation

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

A React frontend for managing Bill of Lading (BOL) records with full CRUD functionality.

## Live Demo

- Frontend: [https://frontendrendertest.onrender.com](https://frontendrendertest.onrender.com)
- Backend API: [https://back-end-pyu8.onrender.com/api/bols](https://back-end-pyu8.onrender.com/api/bols)

## Backend Repository

[https://github.com/JoanneOs/Osman_Joanne_BOLTrack_Capstone.git]

## Features

- View all BOL records in card layout
- Create/edit BOL entries with form validation
- Detailed BOL view with all fields
- Status tracking (Pending/Paid/Disputed)
- Responsive design

## Tech Stack

- React 18 + Vite
- React Router v6
- Axios for API calls
- Formik & Yup for forms

## Project Structure


src/
├── components/BOL/      # All BOL components
├── pages/               # Route-level components
├── utilities/           # API functions
├── App.jsx              # Main app router
└── main.jsx             # App entry point


## Setup

1. Clone and install dependencies:
git clone [repo-url]
cd frontend
npm install


2. Create `.env` file:


3. Run development server:
npm run dev


## Key Components

| Component | Description |
|-----------|-------------|
| `BolList` | Displays all BOLs in cards |
| `AddBol` | Form for new BOL creation |
| `BolDetail` | Detailed BOL view |
| `EditBol` | BOL editing form |
| `bols-api.js` | Axios API functions |

## Available Routes

- `/` - Homepage
- `/bol` - BOL List
- `/bol/add` - Add new BOL
- `/bol/:id` - BOL Details
- `/bol/edit/:id` - Edit BOL

## API Integration

The frontend uses these endpoints:

- `GET /api/bols` - Get all BOLs
- `POST /api/bols` - Create BOL
- `GET /api/bols/:id` - Get single BOL
- `PUT /api/bols/:id` - Update BOL
- `DELETE /api/bols/:id` - Delete BOL
```

This version:
1. Keeps all critical information
2. Uses clear section headers
3. Includes badge icons for key technologies
4. Maintains links to live demos and backend
5. Uses tables for structured data
6. Removes redundant explanations
7. Keeps the setup instructions minimal but complete

Would you like me to adjust any section further or emphasize any particular aspect?