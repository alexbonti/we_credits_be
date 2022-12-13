FROM node

RUN apt-get update && \
    apt-get install -y imagemagick && \
    apt-get install -y graphicsmagick && \
    apt-get install -y ffmpeg && \
    apt-get install -y bash

WORKDIR /app 
COPY . . 

EXPOSE 8000

RUN npm cache clean --force
RUN npm install --silent
RUN cp .env.example .env
RUN PROJECT_FOLDER=wecredits-bucket bash setup_upload.sh

CMD ["npm", "start"]
