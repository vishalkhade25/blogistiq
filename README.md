# Blogistiq

A full-stack MERN Blog Application built using React, Node.js, Express.js, MongoDB, and JWT Authentication.

## Features

* User Authentication (Signup & Login)
* JWT Authentication & Authorization
* Protected Routes
* Create Blog
* Edit Blog
* Delete Blog
* View All Blogs
* View Personal Blogs
* User Profile Page
* Context API Authentication State Management
* Responsive Navbar
* Footer Component

---

## Tech Stack

### Frontend

* React.js
* React Router DOM
* Tailwind CSS
* Axios
* Context API
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcrypt

---

## Folder Structure

```
blog2/
│
├── backend/
│   ├── config/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── routes/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   └── pages/
│   └── vite.config.js
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/vishalkhade25/blogistiq.git
```

### Backend Setup

```bash
cd backend
npm install
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## API Endpoints

### User Routes

* POST /accounts/signup
* POST /accounts/login
* GET /accounts/profile

### Blog Routes

* POST /blogs/newBlog
* GET /blogs/allblogs
* GET /blogs/singleblog/:id
* GET /blogs/myBlogs
* POST /blogs/updateBlog/:id
* GET /blogs/delete/:id

---

## Future Improvements

* Loading States
* Search Blogs
* Pagination
* Dark Mode
* Toast Notifications
* Blog Categories

---

## Author

**Vishal Khade**

B.Tech Information Technology Student

Built as a learning project to understand the MERN Stack and Authentication using JWT.
