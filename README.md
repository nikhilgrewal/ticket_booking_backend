# ticket_booking_backend
The Ticket Booking System is a Node.js application that allows users to manage trains, book seats, and view booking details. It provides endpoints for registering users, authenticating users, managing trains, booking seats, and retrieving booking details.

## Features
- User Registration: Users can register for an account.
- User Authentication: Users can log in to their accounts using JWT authentication.
- Admin Operations: Admins can perform operations such as adding trains, updating seat availability, etc.
- Train Management: Admins can create new trains with source and destination stations.
- Seat Availability: Users can check the availability of trains between two stations.
- Seat Booking: Users can book seats on available trains.
- Booking Details: Users can view details of their bookings.

## Technologies Used
- Node.js
- Express.js
- MySQL
- JSON Web Tokens (JWT) for authentication

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/nikhilgrewal/ticket_booking_backend.git
2. Install Dependencies:
    ```bash
    npm install
3. Set Environment Variables:
Create a .env file in the root directory and set the following environment variables:
    ```bash
    DB_USERNAME=your_database_username
    DB_PASSWORD=your_database_password
    DB_DATABASE=railway_management
    DB_HOST=127.0.0.1
    JWT_SECRET=your_jwt_secret
    ADMIN_API_KEY=your_admin_api_key
    PORT=3000
4. Database Setup:
Ensure you have MySQL installed and running. Create a database named railway_management.

5. Run Migrations:
Run Sequelize migrations to create database tables:
    ```bash
    npx sequelize-cli db:migrate
6. Start the Server:
    ```bash
    npm start
7. API Documentation
- Register User: POST /api/users/register
- Login User: POST /api/users/login
- Add New Train: POST /api/trains/add (requires admin API key)
- Get Seat Availability: GET /api/trains/availability?source=<source>&destination=<destination>
- Book a Seat: POST /api/bookings/book (requires authorization token)
- Get Booking Details: GET /api/bookings/:id (requires authorization token)
