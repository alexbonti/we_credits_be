FROM node:16-alpine

RUN apk add --update imagemagick && \
    apk add --update graphicsmagick && \
    apk add --update ffmpeg && \
    apk add --update bash

WORKDIR /app 
COPY . . 

EXPOSE 8000

RUN npm install --silent
RUN sudo chown -R 1000670000:0 "/.npm"
RUN cp .env.example .env
RUN PROJECT_FOLDER=wecredits-bucket bash setup_upload.sh

CMD ["npm", "start"]