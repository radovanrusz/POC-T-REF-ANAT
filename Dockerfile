FROM node:8.9-alpine

RUN mkdir -p /app
WORKDIR /app

RUN npm config set registry https://registry.npmjs.org

COPY package.json /app/package.json

RUN npm install 
#RUN npm ls
RUN npm cache clean --force 
RUN mv /app/node_modules /node_modules

COPY . /app

ENV PORT 80
EXPOSE 80

CMD ["node", "src/index.js"]

