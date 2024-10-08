FROM node:21

WORKDIR /frontend
COPY package.json .
RUN npm install
COPY . .
CMD npm run dev
