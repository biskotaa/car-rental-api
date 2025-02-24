# Car Rental API

A simple REST API for car rental management, built with Node.js, Express.js, MongoDB, and JWT authentication.

## Features

 User registration and login with JWT authentication.
 View and edit user profile.
 List available rental cars, with filtering options.
 Sorted rental cars by price (lowest to highest).
 Secure authentication for private routes (/my-profile).

## Installation

 Steps to Set Up Locally

 Clone the repository:

```bash
git clone https://github.com/your-username/car-rental-api.git
cd car-rental-api
```
 Install the required dependencies:

```bash
npm install
```
 Create a .env file in the root directory and add the following environment variables:

```ini
MONGO_URI=mongodb://localhost:27017
JWT_SECRET=your-secret-key
```
Replace your-secret-key with a secure string to sign JWT tokens.

 Start the MongoDB server locally.

 Start the server:

```bash
npm start
```
The application should be running on http://localhost:3000.

## Usage

Once the application is up and running, you can use Postman (or any HTTP client) to test the API endpoints.

Base URL:
```
http://localhost:3000
```
## API Endpoints

1. POST /register
Description: Register a new user.

Request Body:

```json
{
    "full_name": "John Doe",
    "email": "john@example.com",
    "username": "johndoe",
    "password": "password123"
}
```
Response:
201 Created: User successfully registered.
400 Bad Request: Invalid input or user already exists.

2. POST /login
Description: Authenticate a user and return a JWT token.

Request Body:

```json
{
    "username": "johndoe",
    "password": "password123"
}
```
Response:
200 OK: Returns a JWT token.
400 Bad Request: Invalid credentials.

3. GET /my-profile
Description: Get the profile of the currently authenticated user.

Headers:

Authorization: Bearer jwt-token-here

Response:
200 OK: Returns the user profile details (full name, username, email).
401 Unauthorized: If the JWT token is missing, invalid, or expired.

4. GET /cars
Description: Get a list of available rental cars, sorted by price.

Query Parameters (optional):

year: Filter by car year.
color: Filter by car color.
steering_type: Filter by steering type (e.g., "automatic").
number_of_seats: Filter by number of seats.

Response:

200 OK: Returns a list of rental cars sorted by price (lowest to highest).
400 Bad Request: Invalid query parameters.

## Testing 

You can use Postman or any HTTP client to test the API endpoints. Here’s how to test the endpoints using Postman:

1. Register a User: Send a POST request to /register with the necessary data.

2. Login: Send a POST request to /login to receive a JWT token.
Access Profile: Send a GET request to /my-profile with the Authorization header (Bearer token).

3. View Rental Cars: Send a GET request to /rental-cars, and optionally add query parameters for filtering (e.g., ?year=2015&color=black).

## Environment Variables

Make sure to set the following environment variables in your .env file:

MONGO_URI: The connection string for your MongoDB database. Default is mongodb://localhost:27017.

JWT_SECRET: The secret key used for signing JWT tokens.

## License

This project is licensed under the MIT License - see the LICENSE file for details.


