FROM node:21

WORKDIR /backend
COPY package.json .
RUN npm install

COPY Dockerfile ./Dockerfile
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
COPY src ./src
COPY tsconfig.json ./tsconfig.json

CMD npm run dev
