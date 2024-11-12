FROM node:21

WORKDIR /frontend
COPY package.json .
RUN npm install

COPY eslint.config.js ./eslint.config.js
COPY index.html ./index.html
COPY node_modules ./node_modules
COPY package.json ./package.json
COPY package-lock.json ./package-lock.json
COPY public ./public
COPY src ./src
COPY tailwind.config.ts ./tailwind.config.ts
COPY tsconfig.app.json ./tsconfig.app.json
COPY tsconfig.json ./tsconfig.json
COPY tsconfig.node.json ./tsconfig.node.json
COPY vite.config.ts ./vite.config.ts

CMD npm run dev
