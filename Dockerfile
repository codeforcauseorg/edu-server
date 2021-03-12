FROM node:14.5

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm install

COPY . /usr/src/app

EXPOSE 5000

CMD ["npm", "start"]