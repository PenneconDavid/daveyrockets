**Brief Description:**  
A web application that [briefly describe the purpose of the app, e.g., "allows users to manage and view blog posts, access protected user profiles, and more, built with a React frontend and a Node.js/Express backend."].

Hosted URL: https://personalsite-five-sage.vercel.app/

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Deployment](#deployment)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication with JWT tokens
- Protected routes for authenticated users
- Blog management (view, add, edit, delete posts)
- Contact form with backend processing
- Responsive design with TailwindCSS
- Deployed on Vercel

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- MongoDB (for local development)

### Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### Backend Setup

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `server` directory with the following variables:

   ```plaintext
   PORT=3002
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET_KEY=your_secret_key
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the client directory:

   ```bash
   cd ../client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `client` directory with the following variables:

   ```plaintext
   REACT_APP_API_URL=http://localhost:3002/api
   ```

4. Start the frontend server:

   ```bash
   npm start
   ```

## Configuration

### Environment Variables

- **Server**:

  - `PORT`: Port for the Express server.
  - `MONGO_URI`: MongoDB connection string.
  - `JWT_SECRET_KEY`: Secret key for signing JWT tokens.

- **Client**:
  - `REACT_APP_API_URL`: The base URL for the API calls.

## Usage

### Running Locally

1. Ensure both the backend and frontend servers are running.
2. Open your browser and navigate to `http://localhost:3001`.

### Features

- **Login/Logout**: Users can log in with their email and password. Upon login, a JWT token is stored in local storage, allowing access to protected routes.
- **Profile Page**: Access protected content by navigating to `/profile`. Only authenticated users can access this page.
- **Blogs**: Users can view a list of blogs, as well as individual blog details.

## Deployment

### Deploying on Vercel

1. **Frontend**:

   - Vercel automatically detects and configures a React project. Ensure the `client` directory is properly set up.
   - Build command: `npm run build`
   - Output directory: `build`

2. **Backend**:
   - Ensure your `server` directory is configured for production.
   - Set up environment variables in the Vercel dashboard.
   - Deploy the backend as a Node.js project or serverless functions.

### Post-Deployment

- Access your live project via the Vercel-provided URL.
- Monitor the Vercel dashboard for build and runtime logs.

## Technologies Used

- **Frontend**:

  - React
  - TailwindCSS
  - Axios

- **Backend**:
  - Node.js
  - Express
  - MongoDB
  - JWT

## Contributing

Contributions are welcome! Please fork this repository, make your changes, and submit a pull request.

---

Feel free to modify this template to better suit your project and any specific details you want to include. Let me know if there's anything more you'd like to add!
