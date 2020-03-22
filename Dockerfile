FROM node:8-alpine

COPY . /workspace
WORKDIR /workspace
RUN npm install

EXPOSE 3001

CMD npm run start-back