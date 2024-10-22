FROM node:20

# app directory
WORKDIR /usr/src


COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000/tcp
EXPOSE 3000/udp
CMD ["npm", "start"]