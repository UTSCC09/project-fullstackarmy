# Dockerfile adapted from
# https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY ./app/package.json ./
COPY ./app/package-lock.json ./

# to deal with weird dependencies
RUN npm install --legacy-peer-deps

# Bundle app source
COPY ./app .
COPY dockerBash.sh dockerBash.sh

EXPOSE 3000
RUN ["chmod", "+x", "dockerBash.sh"]
CMD ./dockerBash.sh