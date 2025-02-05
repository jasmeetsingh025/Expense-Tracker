# Expense Tracker

An Expense Tracker application built with a **Node.js/Express** backend and a **React** frontend. The purpose of this project is to help users track, manage, and analyze their expenses in a convenient and efficient manner.

---

## Overview

1. **Purpose**

   - Allow users to register and log in securely.
   - Create, read, update, and delete expenses (CRUD).
   - View and manage budgets, categories, and reports.

2. **Technologies**
   - **Backend**: Node.js, Express, MongoDB (with Mongoose), Winston for logging, and a global error handler.
   - **Frontend**: React, Redux for global state management, Tailwind CSS for styling, Axios for API requests.

---

## Backend

1. **Structure**

   - **app.js** (or server.js): Main entry point configuring Express, middleware, and routes.
   - **routes**: Folder containing Express route definitions (e.g., /users, /expenses).
   - **controllers**: Folder with controller functions for handling business logic (e.g., user login, sign up).
   - **models**: Mongoose models for interacting with MongoDB (e.g., User, Expense).

2. **Environment Variables**

   - Typically stored in a `.env` file (e.g., MONGODB_URI, PORT).
   - Accessed via `process.env.VARIABLE_NAME`.

3. **Error Handling**

   - A global error handler (`errorHandler`) catches all thrown errors (including custom `ApiError`s).
   - Logs errors (in development) and sends structured JSON responses to the client (e.g., `{ message, statusCode, stack }`).
   - Called via `next(err)` in controllers when an error occurs (e.g., an invalid login).

4. **Logging**

   - Winston logger is used to log server activity and errors.
   - Custom log levels (e.g., info, error) can be configured.

5. **Running the Backend**
   - Install dependencies: `npm install`
   - Start the server: `npm run dev` (or `npm start` for production)

---

## Frontend

1. **Structure**

   - **src**
     - **components**: Reusable UI components (e.g., Logo, LoginForm, SignUpForm).
     - **pages**: Main pages/routes (e.g., Login, Signup, Dashboard).
     - **store**: Redux store configuration and slices (e.g., authSlice for user login state).
     - **axios**: Axios instance and `apiService` calls (e.g., `fetchUserLogin`, `fetchUserSignup`).
     - **App.jsx**: Root component that sets up routes (e.g., React Router).

2. **Authentication**

   - **Login**: User input is captured by the `LoginForm` component, then sent to the `/users/login` API using Axios.
   - **Signup**: The `SignUpForm` component sends the data to `/users/signup`.
   - **Redux**: Maintains the user’s login state (`isLoggedIn`, user info).

3. **Error Handling**

   - Catches errors (e.g., `err.response`) in `apiService.js` and logs them or stores them in Redux so the UI can display messages.

4. **Styling**

   - Uses Tailwind CSS for quick, utility-based styling.
   - Custom classes in `tailwind.config.js` can be utilized to match your design needs.

5. **Running the Frontend**
   - Install dependencies: `npm install`
   - Start the dev server: `npm run dev`
   - Build for production: `npm run build`

---

## Usage

1. **Development**

   - Start the backend server (e.g., `npm run dev` in the backend directory).
   - Start the frontend (e.g., `npm run dev` in the frontend directory).

2. **Production**
   - Build the frontend (`npm run build`) and serve the files.
   - Ensure the backend is deployed on a suitable environment (e.g., Heroku, AWS, or your server).

---

## License

This project is licensed under the MIT License. You can modify and use it for your own projects.
