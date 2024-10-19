
# Job Posting Board Backend

## Objective
A full-stack MERN application where companies can register, verify their accounts via email, post jobs, and send automated emails to candidates. This project uses **MongoDB**, **Express.js**, **React.js**, and **Node.js** (MERN stack) along with **Nodemailer** for email automation.

## Features
- **Company Registration**: Companies can sign up and verify their accounts via email and mobile.
- **Company Login**: JWT or session-based authentication for secure login.
- **Job Posting**: Authenticated companies can post jobs including title, description, experience level, and candidate information.
- **Email Automation**: Companies can send job alerts or updates to candidates using Nodemailer.
- **Logout**: Token or session clearance for logout functionality.

## Tech Stack
- **Frontend**: React.js (UI built following Figma design)
- **Backend**: Node.js, Express.js (API and business logic)
- **Database**: MongoDB (Company details, job postings, email logs)
- **Email Automation**: Nodemailer (for sending job-related emails)
- **Authentication**: JWT or session-based authentication for securing routes

## Installation & Setup

### Prerequisites
- Node.js installed (v14 or later)
- MongoDB (local instance or Atlas cluster)
- Git

### Steps to Run the Project Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/JobPortal_Backend.git
  
   ```

2. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Create Environment Variables**:
   Create a `.env` file in the `backend` directory with the following details:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   EMAIL_SERVICE=your_email_service_provider
   EMAIL_USER=your_email_user
   EMAIL_PASS=your_email_password
   ```

4. **Run the Backend Server**:
   ```bash
   npm run dev
   ```

5. **Install Frontend Dependencies**:
   ```bash
   cd ../frontend
   npm install
   ```

6. **Run the Frontend**:
   ```bash
   npm start
   ```

7. **Access the Application**:
   Open your browser and go to `http://localhost:3000`

## API Endpoints

| Endpoint          | Method | Description                         |
| ----------------- | ------ | ----------------------------------- |
| `/api/register`   | POST   | Register a company                  |
| `/api/login`      | POST   | Login company (JWT or session)       |
| `/api/job-posts`  | POST   | Post a job (authenticated companies) |
| `/api/send-email` | POST   | Send job alert emails to candidates  |
| `/api/logout`     | POST   | Logout the user                     |

## Figma Design
The frontend UI follows the design from this [Figma link](https://www.figma.com/design/3ru768FzQDG5J6CLC1IPB4/CuvetteAssignment?node-id=0-1&t=4kRZ1x3vuXhWBiu7-1).

## Dependencies
- **React**: UI Library
- **Express.js**: Backend framework
- **MongoDB**: NoSQL database
- **Nodemailer**: Email sending service
- **JWT**: Authentication token system

