# Movie Management System

## Overview
This project is a web-based system for managing movies, actors, genres, and movie theaters. It includes a dynamic user interface built with React and Bootstrap on the client-side, and an ASP.NET Core backend with Entity Framework Core for data management. The system provides full CRUD capabilities, user input validation, and error handling.

## Objectives
- Enable complete management of movies, actors, genres, and movie theaters.
- Provide a dynamic and intuitive user interface.
- Ensure data security and user input validation.
- Offer a seamless and fast user experience.

## Key Features
- **CRUD for Movies, Actors, Genres, and Theaters:** Create, read, update, and delete data.
- **Dynamic User Interface:** Rich UI with high responsiveness.
- **RESTful API:** Manage all data through a secure and efficient API.
- **Object Mapping:** Use AutoMapper for easy and fast object mapping.
- **Data Validation:** Use FluentValidation for user input validation.
- **Error Handling:** Manage errors and display clear error messages to users.

## Technologies
- **Frontend:**
  - React
  - TypeScript
  - Bootstrap
  - CSS

- **Backend:**
  - ASP.NET Core
  - C#
  - Entity Framework Core

- **Database:**
  - SQL Server

- **Tools:**
  - AutoMapper
  - FluentValidation

## Architecture

### Frontend:
- Developed using React and TypeScript.
- Styled with Bootstrap and custom CSS.
- State management using React Hooks.
- Error handling and user notifications through custom components.

### Backend:
- Developed with ASP.NET Core.
- Data management using Entity Framework Core.
- RESTful API for data operations.
- User input validation with FluentValidation.
- Object mapping using AutoMapper.

### Database:
- SQL Server is used as the primary database.
- Database schema and migrations are managed using Entity Framework Core.

## Important Files

### Client (React & TypeScript):
- `App.tsx`: Main application component.
- `CreateMovie.tsx`: Component for creating a new movie.
- `EditActor.tsx`: Component for editing an existing actor.
- `MoviesList.tsx`: Component for displaying the list of movies.
- `index.css`: Global CSS file for the application.

### Server (ASP.NET Core):
- `Program.cs`: Main entry point for the server.
- `GenresController.cs`: Controller for managing genres.
- `ApplicationDbContext.cs`: Database context using Entity Framework Core.
- `AutoMapperProfiles.cs`: Configuration for object mapping using AutoMapper.

## Setup and Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/movie-management-system.git
