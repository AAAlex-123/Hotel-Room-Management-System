FROM node:latest
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install
EXPOSE 8082
RUN npm run build
CMD [ "npm", "start" ]