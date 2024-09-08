FROM node:lts-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install --omit=dev
COPY . .

USER node

CMD [ "npm", "start" ]

EXPOSE 8000
