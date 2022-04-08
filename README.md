# COVID19 Vaccination Tracker

## Project URL

[https://www.covid19vaxtracker.live](https://www.covid19vaxtracker.live)

## Project Video URL

**Task:** Provide the link to your youtube video. Please make sure the link works.

## Project Description

A simplified COVID-19 vaccination worldwide statistics dashboard. The website leverages data visualization libraries to showcase charts and figures of the data. The application supports search and filtering features that allow the users to navigate the dashboard based on data for a specific timeframe or country. In addition, a user is allowed to sign up and customize the dashboard based on personal preferences for filtering options and colour schemes saved. To support a larger user base, the application provides multi-lingual support.

## Development

**Task:** Leaving deployment aside, explain how the app is built. Please describe the overall code design and be specific about the programming languages, framework, libraries and third-party api that you have used.

We used the MERN stack - MongoDB, ExpressJs, React, and NodeJs. We also used GraphQL as our API structure. In doing so, we used Apollo Client on our frontend to make the API calls to our backend. Our frontend scripts are written in TypeScript, while our backend scripts are in JavaScript.

Frontend libraries:

- @googlemaps/react-wrapper: official google maps library wrapper for react
- Translation: i18next, i18next-browser-languagedetector - to create the translation feature
- mui: material ui for react elements such as buttons, etc.
- chart.js: for the charts
- react-router-dom: routing

Backend libraries:

- node-cron - handles making a script run on schedule (every day at 9AM EST)
- node-fetch - makes a request to the data sources that we are using in the project
- csvtojson - used to convert csv format (some data sources) to json format
- lodash - specifically used for cloneDeep because of issues between shallow vs deep copies when doing the data pipline
- graphql-request - used to make graphql requests to the db from the script, light wrapper therefore it was used
- moment - handles creating the logs current time for when the pipeline makes a request to the backend
- mongoose - used to interact with mongodb
- mongodb - to interact with the database
- graphql - to work with graphql
- express-graphql - same as above
- other: libraries taken from the course - nodemon, bcrypt, body-parser, cors, express, fs

## Deployment

**Task:** Explain how you have deployed your application.

We deployed our application through a Digital Ocean droplet. This droplet has extra memory so that we can run our application more smoothly. In the droplet, there are 4 docker containers. There is the nginx-proxy container, which houses the reverse proxy. There's a frontend container and a backend container, which both have exposed ports for the reverse proxy. Then, there is the nginx-proxy-acme container, which generates an SSL certificate and handles the renewal of certificates. The setup of these containers are all handled by the `docker-compose.yml`](https://github.com/UTSCC09/project-fullstackarmy/blob/main/docker-compose.yml) file. In addition, the docker images for the frontend and backend are built using their respective `Dockerfile`'s (See [frontend `Dockerfile`](https://github.com/UTSCC09/project-fullstackarmy/blob/main/frontend/Dockerfile) and [backend `Dockerfile`](https://github.com/UTSCC09/project-fullstackarmy/blob/main/backend/Dockerfile)). Because the proxy is nginx and our website uses React Router, we needed to add some extra options when using the jwilder/nginx-proxy image to change the generated `nginx.conf` in order to allow for the routing.

We set up a CI/CD pipeline using Github Actions. Whenever either [`frontend`](https://github.com/UTSCC09/project-fullstackarmy/tree/main/frontend), [`backend`](https://github.com/UTSCC09/project-fullstackarmy/tree/main/backend) or [`docker-compose.yml`](https://github.com/UTSCC09/project-fullstackarmy/blob/main/docker-compose.yml) is changed in the `main` branch, the workflow copies the updated file/folder(s) to the VM in our Digital Ocean droplet and runs the necessary commands. That is, if either the `frontend` or `backend` folders were changed, then there would be a `docker-compose build [whichever folder]` run, followed by the `docker-compose up -d` command to deploy. `docker-compose.yml` only triggers the deployment command. If the workflow is successful, there is a checkmark seen next to the commit in GitHub. If not, then we debug what failed in the workflow. However, to further make sure that everything is running smoothly we double check the deployed website and see if everything looks okay. If absolutely necessary, we can also ssh into our VM and check the status of our docker containers if in case something happened to them during the build/deployment.

## Maintenance

**Task:** Explain how you monitor your deployed app to make sure that everything is working as expected.

## Challenges

**Task:** What is the top 3 most challenging things that you have learned/developed for you app? Please restrict your answer to only three items.

1.
2. Ensuring that the map code is optimized, without overloading the main thread and follows DRY principles
3. Deployment takes time, and the VMs at school are not as reliable as a VM from outide, like Digital Ocean

## Contributions

**Task:** Describe the contribution of each team member to the project. Please provide the full name of each team member (but no student number).

- Aaren Chu:

  - Deployment
  - CI/CD
  - Herd Immunity Bar and Series Charts, including GraphQL API calls such as isoCodes, get...
  - Set up of organization and clusters in MongoDB Atlas
  - Design of tab structure to display one heat map at a time
  - Schema Structure

- Raha Gharadaghi

  - Please fill this out

- Mohamed Tayeh
  - Maps Implementation
  - Data Pipelines
  - Schema Structure
  - Data Sources
  - Plans for Data Visualization
  - Write Up / Translations
  - Translation feature
  - Researching best practices

# One more thing?

**Task:** Any additional comment you want to share with the course staff?

- Chrome violations

  - These are not errors nor bugs, they are indications of where improvement can be made to the code
  - Our violations are coming from google maps api library rather than our code.

  - There are 2 violations that occur due to the google maps, particularly due to having many features in the map

  1. `[Violation] 'requestAnimationFrame' handler took 125ms`, in the console this occurs in the `map.js` (not our files)

  This mainly occurs when zooming in and out the map, when panning the camera too fast. The animation of having the features on the map takes too long, which outside of our controls since we are using the google maps API to draw the features on the map.

  2. `[Violation] 'setTimeout' handler took 81ms`, in the console this occurs in the `poly.js` (not our files)

  This occurs when hovering over a feature that is big and outside of the maps bounds. This animation/feature is from the google maps api libary therefore its speed is outside of our control

  3. ``
