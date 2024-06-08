FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 
RUN npm install -g typescript

COPY . .


EXPOSE 8080

CMD [ "npm", "start" ]