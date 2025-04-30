
Built by https://www.blackbox.ai

---

```markdown
# Changeover Note App

## Project Overview
Changeover Note App is a desktop application designed to facilitate the sharing of notes via email among multiple users. This application utilizes the Electron framework to provide a user-friendly interface while leveraging Nodemailer for sending emails securely. Its primary function is to allow a user to compose a note and share it with at least five specified recipients.

## Installation
To set up the Changeover Note App on your local machine, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/changeover-note-app.git
   cd changeover-note-app
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   npm start
   ```

## Usage
Once the application is running, you can follow these steps to share notes:

1. Open the Changeover Note Sharing application.
2. Fill in your email and password in the respective fields (uses Gmail service).
3. Enter the note content you wish to share.
4. Provide at least five recipient email addresses.
5. Click the "Send Note" button to share your note via email.

The application will inform you if the emails were sent successfully or if there was an error.

## Features
- Share notes via email to multiple recipients (at least five).
- User-friendly interface for easy note composition.
- Implements a secure method for sending emails via Gmail.
- Dynamically add more recipient fields if needed.

## Dependencies
This project relies on the following key dependencies:

- [Electron](https://www.electronjs.org/) - A framework to build cross-platform desktop applications.
- [Nodemailer](https://nodemailer.com/) - A module for Node.js to send emails easily.

These packages are specified in `package.json`:

```json
"dependencies": {
  "electron": "^25.3.1",
  "nodemailer": "^6.9.4"
}
```

## Project Structure
The project is organized as follows:

```
changeover-note-app/
├── index.html       # Main HTML file for the application interface
├── main.js          # Main process file where the application logic resides
├── preload.js       # Preload script to enable secure communication between the renderer process and main process
├── renderer.js      # Renderer process script for handling UI interactions
├── package.json     # Metadata and dependencies for the project
└── package-lock.json # Locked versions of project dependencies
```

### Description of Key Files:
- **index.html**: This is the main view of the application. It contains a form that allows users to input their email details and compose messages.
- **main.js**: The main process that initializes the application and handles email sending.
- **preload.js**: This script is used to safely expose certain functionalities from the main process to the renderer process.
- **renderer.js**: Handles the UI logic, including form validation and submitting the note via email.
  
## Conclusion
The Changeover Note App is a practical tool for those needing to share informal notes and messages quickly and easily via email. It showcases basic functionalities of Electron and could be extended further with additional features.
```