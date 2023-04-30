FROM node
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install 
RUN npx prisma migrate dev --name init
RUN npx prisma generate
EXPOSE 3001
CMD npm start