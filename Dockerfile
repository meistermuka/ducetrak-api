FROM node:10-alpine AS builder

WORKDIR /app

COPY ./package.json ./
RUN npm install
COPY . .

RUN npm run prestart:prod

FROM node:10-alpine
WORKDIR /app
COPY --from=builder /app ./

EXPOSE 3000
CMD ["npm", "run", "start:prod"]
