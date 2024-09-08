# MERN Template

## Description
This is a template for MERN stack applications. It is a simple application that has a backend server and a frontend client. 

## Features
- Backend server using Express
- Frontend client using HTML, CSS, and JavaScript
- Paginating Endpoints
- Versioning API
- Dockerized application
- Security features like CORS, Helmet, JWT, Passport
- GoogleOAuth2.0 authentication
- Cookie based session management
- MongoDB database
- GitHub Actions for CI/CD

## How to run
npm install
npm start 

## Docker Commands
docker build . -t gokulnpc/mern-template
docker run -it -p 8000:8000 -e PORT=8000 gokulnpc/mern-template