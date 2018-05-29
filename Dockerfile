FROM node:9.11-alpine

RUN mkdir /app
WORKDIR /app
ADD * /app/
RUN npm install

CMD ["npm", "start"]