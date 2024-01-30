# SafetyApp - Occupational Safety Management

**Live Site:** [SafetyApp](https://safteyapp.netlify.app/)

**Note to Users:** The backend of SafetyApp is deployed on Render and the servers may go to sleep after 30 minutes of inactivity. Upon your first visit or after a period of inactivity, the server will trigger and wake up, but it may require a waiting time of 1 to 2 minutes. Please refresh the page after this brief period to fully utilize the service.

SafetyApp is a full-stack MERN project designed to aid occupational safety inspectors in efficiently identifying and managing the storage of various chemicals using the UN number as an index. This web application features the renowned NFPA 4 diamond and offers detailed information cards for chemicals added to the inventory.

## Key Features

- **Chemical Identification and Inventory Management:** Easily identify chemicals by UN number and add them to the factory inventory.
- **Interactive Dashboard:** Provides an overview of all chemicals in the factory. Users can simulate a shelf and arrange chemicals via a drag-and-drop interface.
- **AI-Enhanced Recommendations:** Utilizes AI to recommend storage arrangements, which can be captured and sent as PNG files via email.
- **Visualization for Warehouse Workers:** Helps in providing a visual guide for the proper storage of chemicals on actual shelves.

## Usage

- **Demo Account:** To explore the app, log in using the demo account.
  - Username: demo@safetyapp.com
  - Password: Safe1234
- **Creating an Account:** Users can sign up to create a personalized account. Passwords are secured using JWT.

## Site's Preview


![Home](https://github.com/LironSif/Final-project-frontend/blob/main/src/assets/screenShot/Capture.PNG?raw=true)
![Dashboard](https://github.com/LironSif/Final-project-frontend/blob/main/src/assets/screenShot/Capture2.PNG?raw=true)
![Chemical Details](https://github.com/LironSif/Final-project-frontend/blob/main/src/assets/screenShot/Capture3.PNG?raw=true)


## Technology Stack

The SafetyApp integrates a comprehensive technology stack for both frontend and backend operations:

### Frontend

- **React:** A JavaScript library for building user interfaces.
- **Material-UI:** A popular React UI framework.
- **JavaScript:** The programming language of the web.
- **CSS:** Style sheet language used for describing the presentation of a document written in HTML or XML.
- **HTML:** The standard markup language for documents designed to be displayed in a web browser.

### Backend

- **Node.js:** JavaScript runtime built on Chrome's V8 engine.
- **Express:** Flexible Node.js web application framework.
- **MongoDB:** NoSQL database for modern applications.
- **Mongoose:** ODM library for MongoDB and Node.js.
- **JWT (JSON Web Tokens):** For securing routes and authentication.
- **Bcryptjs:** Library for hashing and securing user passwords.
- **Multer:** Middleware for handling `multipart/form-data`.
- **Nodemailer:** Module for email sending in Node.js applications.
- **OpenAI:** Integration for AI functionalities.
- **Others:** Includes `cors`, `dotenv`, etc.

## Installation and Setup

To set up SafetyApp, follow these steps:

- Ensure you have Node.js and MongoDB installed on your system.
- Clone the front-end repository from [SafetyApp Front-end Repository](https://github.com/LironSif/Final-project-frontend).
- For the back-end setup, refer to the [SafetyApp Back-end Repository](https://github.com/LironSif/Final-Project-backend), which involves Node.js, MongoDB, etc.
- Install dependencies by running `npm install` in the project directory.
- Start the application with `npm start`.


## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](link-to-your-issues-page) for ways to contribute.

## Author

### [Liron Sifado](https://github.com/LironSif)

