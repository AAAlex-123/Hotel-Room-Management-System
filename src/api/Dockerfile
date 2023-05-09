FROM node:latest
WORKDIR /app
COPY package*.json ./
COPY . .
RUN npm install 
RUN npx prisma generate
ENV DATABASE_URL="mysql://root:manasou@172.17.0.1:8083/hestia"
EXPOSE 8081
ENTRYPOINT [ "bash","./entrypoint.sh" ]