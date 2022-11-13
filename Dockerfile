FROM node:16-alpine

RUN apk add --update imagemagick && \
    apk add --update graphicsmagick && \
    apk add --update ffmpeg && \
    apk add --update bash

WORKDIR /app 
COPY . . 

EXPOSE 8026

RUN npm install --silent
RUN cp .env.example .env
RUN PROJECT_FOLDER=degicredit-bucket bash setup_upload.sh

CMD ["npm", "start"]