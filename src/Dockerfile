FROM node:latest
RUN mkdir /website
WORKDIR /website
ADD ./website /website
RUN apm install
CMD ["npm","run","start"]