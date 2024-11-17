# Disaster-Management
A website meant to keep track of vital resources/operations to help improve efficiency of managing disasters

## Features
User Registration and Login
Admin-specific functionalities such as creating training sessions and managing volunteers
Volunteer disaster applications and training registrations
Cascading database operations for consistency

## Prerequisites
Ensure the following tools and libraries are installed on the target device:

Node.js and npm

Download and install Node.js (https://nodejs.org/).
This will also install npm (Node Package Manager).
MySQL Server

Install MySQL (https://dev.mysql.com/downloads/installer/).
Make sure MySQL is running and accessible.
Create a database for the project.
Git (optional)

Clone the repository using Git (https://git-scm.com/).
Sequelize CLI (optional)

Install Sequelize CLI globally to manage migrations and seeders:<br/>
`
npm install -g sequelize-cli
`

## Setup Instructions
Clone the Repository

```
git clone <your-repo-url>
cd <project-folder>
```
Install Dependencies Run the following command to install all required Node.js modules:<br/><br/>
`npm install` <br/><br/>
Configure Environment Variables Create a .env file in the root directory and configure the following:
```
PORT=3001
DB_HOST=localhost
DB_USER=<your-database-username>
DB_PASSWORD=<your-database-password>
DB_NAME=<your-database-name>
JWT_SECRET=<your-jwt-secret-key>
```
<br/>
Set Up Database Ensure your database is created in MySQL. Run the following command to sync models and set up tables:<br/>
<code>node server.js</code><br/><br/>
Alternatively, use Sequelize migrations if configured.

Run the Server Start the backend server:

`npm start`

Run the Frontend Navigate to the frontend directory (if separate) and install dependencies:

`npm install`

Then, start the React development server:

`npm start`

## Usage
Access the app via the configured URL (default: http://localhost:3000).

Admins can manage volunteers, disasters, and training sessions.

Volunteers can register for disasters and training sessions.
