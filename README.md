# Multi-User File Manager Application

## Project Setup
- Clone the repository: `git clone <repository_url>`
- Install dependencies: `npm install`
- Configure MySQL and Redis: Update `config/db.js` and `config/queue.js` with your database details
- Run the application: `node app.js`

## Technical Choices
- **Express.js**: Used for building the web server and routing.
- **MySQL**: Used for storing user data and file metadata.
- **Redis & Bull**: Used for implementing the queuing system.
- **Passport.js**: Used for user authentication.
- **i18next**: Used for implementing multilingual support.
- **Jest**: Used for unit testing.

## Usage Instructions
- Register a new user: `POST /auth/register`
- Login a user: `POST /auth/login`
- Upload a file: `POST /files/upload`
- List files: `GET /files/list`
- Rename a file: `POST /files/rename`
- Delete a file: `POST /files/delete`
- Set language preference: `POST /users/set-language`
- Check upload status: `GET /files/upload-status/:jobId`
