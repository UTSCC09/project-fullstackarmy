# Dockerfile adapted from
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Set up db env variables
ENV MONGO_USER = admin \
    MONGO_PASSWORD = CEZHrExc5aMCcp5s \
    MONGO_DB = VaccDataDev

# Trying to find IP addr
RUN hostname -I

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./app/package.json ./
# to deal with weird dependencies
RUN npm install --legacy-peer-deps

# Bundle app source
COPY ./app .

EXPOSE 3000
CMD [ "node", "app.js" ]