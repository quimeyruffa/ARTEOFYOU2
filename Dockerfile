FROM node:15

RUN mkdir -p /usr/src/app 

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install 

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]
