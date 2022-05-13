# Dockerfile adapted from
# https://mherman.org/blog/dockerizing-a-react-app/

# Build the React app
# basically, this compiles the React jsx to static HTML and js files.
FROM node:14-alpine3.14 as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./app/package.json ./
RUN npm i
RUN npm install react-scripts@3.4.1 -g
COPY ./app ./
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL $REACT_APP_API_URL
ARG REACT_APP_GOOGLE_MAPS_API_KEY
ENV REACT_APP_GOOGLE_MAPS_API_KEY $REACT_APP_GOOGLE_MAPS_API_KEY
ARG REACT_APP_COUNTRY_FEATURES_URL
ENV REACT_APP_COUNTRY_FEATURES_URL $REACT_APP_COUNTRY_FEATURES_URL
ARG REACT_APP_CONTINENT_FEATURES_URL
ENV REACT_APP_CONTINENT_FEATURES_URL $REACT_APP_CONTINENT_FEATURES_URL
ARG REACT_APP_SENTRY_URL
ENV REACT_APP_SENTRY_URL $REACT_APP_SENTRY_URL
ENV NODE_OPTIONS "--max-old-space-size=8192"
RUN npm run build

# Serve these static files with NGINX.
FROM nginx:1.21.6-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
