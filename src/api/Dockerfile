FROM node:latest
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install 

EXPOSE 8081
RUN npm run prisma:deploy
RUN npx prisma generate
CMD ["npm", "start"]