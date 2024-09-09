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
- npm install
- npm start 

## Docker Commands
- docker build . -t gokulnpc/mern-template
- docker run -it -p 3000:3000 gokulnpc/mern-template
- docker run --restart=always -p 3000:3000 gokulnpc/mern-template
- docker push gokulnpc/mern-template

## AWS EC2 Instance
- chmod 400 "mern.pem"
- ssh -i "mern.pem" ec2-user@ec2-11-111-111-111.compute-1.amazonaws.com
- sudo yum update -y
- sudo yum install docker
- sudo docker info
- sudo usermod -a -G docker ec2-user
- exit
- ssh -i "mern.pem" ec2-user@ec2-11-111-111-111.compute-1.amazonaws.com
- docker login
- docker run --restart=always -p 3000:3000 gokulnpc/mern-template



