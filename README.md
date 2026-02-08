# Hack_with_Mumbai_2.0



1. Core Technology Stack
   
React (Vite): The engine for the frontend website (fast, modern, and interactive).
Node.js & Express: The backend "brain" that handles data and security.
Prisma & SQLite: The database system that saves your records locally on your computer.
Tailwind CSS: Used for the premium, dark-mode medical design.
JWT (JSON Web Tokens): Secure locks that keep your medical data private and authenticated.
Multer: The library responsible for handling and saving your uploaded medical files.




2. Frontend (Client Folder)
   
This controls what you see and interact with in the browser.

src/pages/Dashboard.jsx
: The main screen. It holds the 3D human body model, the "Quick Actions" for adding reports, and the logic to show your medical history.
src/components/BodyModel.jsx: contains the interactive SVG map of the human body. It tells the app which part you clicked (e.g., "Chest" or "Knees").
src/services/api.js
: The messenger. It talks to the backend to send and receive data (like logging you in or saving a new report).
vite.config.js
: Configuration that allows the frontend to "see" the backend without security errors (Proxy).
src/App.jsx: The navigation router that moves you between Login, Register, and the Dashboard.



3. Backend (Server Folder)
   
This handles the heavy lifting, security, and storage.

src/index.js
: The main entry point. It starts the server, connects to the database, and sets up folders for file uploads.
src/routes/records.js
: The logic for your medical data. It handles creating, viewing, and deleting your injuries and medical reports.
src/routes/auth.js
: Handles account security—checking if your password is correct and creating your user account.
src/middleware/auth.js
: A security guard. It checks every request to make sure only you can access your medical data.
prisma/schema.prisma
: The blueprint of your data. It defines exactly what a "User" and a "Medical Record" look like.
uploads/: The local folder on your computer where your actual PDF and image reports are stored.




4. Configuration & Security
   
.env
: Stores secret "keys" and the database location. This is never shared publicly for security.
package.json
: The list of all "tools" (libraries) installed for the project to run.
.gitignore
: Tells Git to ignore large or private files (like node_modules or 
.env
) when you push your code to GitHub.




In Summary:
You have a Full-Stack Application where the Frontend asks for information, the Backend verifies you are who you say you are, and the Database stores your medical history securely in a local file.
