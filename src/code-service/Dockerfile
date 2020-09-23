FROM node:12.13-alpine As development
WORKDIR /usr/src/app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:12.13-alpine as production
WORKDIR /usr/src/app
COPY ./package.json ./
RUN npm install
COPY --from=development /usr/src/app/dist ./dist
EXPOSE 11001
CMD ["node", "dist/main.js"]