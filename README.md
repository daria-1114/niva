# Niva

A full-stack notes application built as a learning project, with user authentication and category-based organization. 

## Features

- User registration and login with JWT-based authentication
- Passwords hashed with BCrypt
- Categorize notes (Work, Personal, Ideas, Other)
- Filter notes by category, or view all notes sorted by most recent
- Account page showing the logged-in user's details

## Tech stack

**Backend**
- Java, Spring Boot
- Spring Security + JWT (`jjwt`) for stateless authentication
- Spring Data JPA with PostgreSQL
- Maven

**Frontend**
- React (Vite)
- Plain CSS

```
niva/
├── backend/               # Spring Boot application
└── frontend/
    └── niva-frontend/     # React application
```

## Getting started

### Prerequisites

- Java 17+
- Node.js and npm
- PostgreSQL

### Backend setup

1. Create a PostgreSQL database.
2. Configure `src/main/resources/application.properties` with your database credentials:
3. Run the NivaApplication class from your IDE
4. The backend runs on `http://localhost:8081` by default.

   
### Frontend setup

1. Navigate to the niva-frontend folder:
cd frontend
npm install
npm run dev
2. The app runs on `http://localhost:5173` by default.



Protected endpoints require an `Authorization: Bearer <token>` header, using the token returned from `/api/auth/login`.
