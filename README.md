# Clinic Management System

This is a full-stack Clinic Management System project that allows managing patients, prescriptions, and other related data. The project includes a Node.js backend and a React frontend. All the code for this project is available in the `my-new-branch` branch.

## Features

- **Patient Management**: Add, view, update, and delete patient records.
- **Prescription Management**: Create and manage prescriptions associated with patients.
- **Responsive UI**: A user-friendly interface that works well on both desktop and mobile devices.
- **API**: RESTful API built with Express.js for managing backend operations.

## Prerequisites

To run this project, you need to have the following installed on your machine:

- **Node.js** (version 14.x or later)
- **npm** or **yarn** (for managing packages)
- **MongoDB** (for the database)

## Setup Instructions

### 1. Clone the Repository

Start by cloning the repository and checking out the `my-new-branch` branch:

```bash
git clone https://github.com/your-username/Clinic_Management_System.git
cd Clinic_Management_System
git checkout my-new-branch

BACKEND SETUP
cd server
npm install
cp .env.example .env
npm start

FRONTEND SETUP
cd ../client
npm install
npm start
http://localhost:5173

PROJECT STRUCTURE
server/: Contains the backend code, including the Express API and MongoDB models.
client/: Contains the frontend code, built with React.
my-new-branch: All the code is available in this branch.
