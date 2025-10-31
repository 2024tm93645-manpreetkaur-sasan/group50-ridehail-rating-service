FROM node:18
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

COPY index.js ./index.js
COPY src ./src

EXPOSE 3001
CMD ["node", "index.js"]
