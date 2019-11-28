# Entry Management Software. 
Innovaccer SDE internship assignment.

# Quick Start
## Install dependencies
npm install for both frontend and backend

## Create Database
Create a MongoDb datbase by the name of Test


## Server runs on http://localhost:3001 and client on http://localhost:3000


```
apisecret = Nexmo_Secretkey
apikey=Nexmo_Apikey
username=test.email.visitorapp@gmail.com
pass=visitorapp@1234
```

## Technology Used
NodeJS

ReactJS

Mongoose

ExpressJS

nodemailer (for mailing)

Nexmo (for sending SMS)

## Approach
- Upon visiting, a visitor has to fill up the check-in form that comprises of all the mandatory fields. 
- On submit, the visit entry is made into the database with all the necessary details with.
- A mail is sent to the host regarding the meeting.
- To check-out, the visitor has to enter his email-id and name(Mail id is used to uniquely identify the visitor).
- The check out time is stored and a mail is sent to the visitor providing him the details of his visit. 
- A host can login/register.
- On login, host can see the log of all his current and past meetings with the visitor details.
## APIs
POST /api//userCheckin

To check-in a visitor

POST /api/userCheckout

To check-out a visitor

POST /api/registerHost

To register a host

POST /api/auth/host

For authorizing a host

GET/api/meetingScheduled/:id

To get all meetings of the host

GET/api/host

To get  host details


