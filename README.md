# Schoolink API

METHODS:
✓  get timetable
✓  get timetable based on classroom and day
✓  register a student (based on code verification -- see auth/code.js)
✓  verify register data validity
✓
✗  register a teacher
✗  role-based authentication using JWT
✗  ...

!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
1) use npm install to install all required dependencies
(1.1 use nodemon command in terminal to start the localhost server)

2) use postman for executing request (same for the email verification link)

3)CREATE A .ENV FILE AND PUT IN IT:

SERVER_PORT = ....

DB_PORT = ....
DB_HOST = ....
DB_USER = ....
DB_PASSWORD = ....
DB = ....

TOKEN_STRING = .... the custom string for signing JWT

Used for sending verification email to user:
GMAIL_SENDER_INFO : "Schoolink Verification Email"
GMAIL_EMAIL : ... --sender email
GMAIL_PASSWORD : ... --sender password
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
