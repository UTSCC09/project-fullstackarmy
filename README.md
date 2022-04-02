# __your_project_name__

## Project URL

[https://www.covid19vaxtracker.live](https://www.covid19vaxtracker.live)

## Project Video URL 

**Task:** Provide the link to your youtube video. Please make sure the link works. 

## Project Description

**Task:** Provide a detailed description of your app

A simplified COVID-19 vaccination worldwide statistics dashboard. The website will leverage enhanced data visualization libraries to showcase charts and figures of the data. The application will support search and filtering features that will allow the users to navigate the dashboard based on data for a specific timeframe or country. In addition, a user will be allowed to sign up and customize the dashboard based on personal preferences for charts configuration, colour schemes, and fonts. To support a larger user base, the application will provide multi-lingual support.

## Development

**Task:** Leaving deployment aside, explain how the app is built. Please describe the overall code design and be specific about the programming languages, framework, libraries and third-party api that you have used. 

  We used the MERN stack, which is MongoDB, ExpressJs, React, and NodeJs. We also used GraphQL as our API structure. In doing so, we used Apollo Client on our frontend to make the API calls to our backend. Our frontend scripts are written in TypeScript, while our backend scripts are in JavaScript.

## Deployment

**Task:** Explain how you have deployed your application.

We deployed our application through a Digital Ocean droplet. This droplet has extra memory so that we can run our application more smoothly. In the droplet, there are 4 docker containers. There is the nginx-proxy container, which houses the reverse proxy. There's a frontend container and a backend container, which both have exposed ports for the reverse proxy. Then, there is the nginx-proxy-acme container, which generates an SSL certificate and handles the renewal of certificates. The setup of these containers are all handled by the `docker-compose.yml`](https://github.com/UTSCC09/project-fullstackarmy/blob/main/docker-compose.yml) file. In addition, the docker images for the frontend and backend are built using their respective `Dockerfile`'s (See [frontend `Dockerfile`](https://github.com/UTSCC09/project-fullstackarmy/blob/main/frontend/Dockerfile) and [backend `Dockerfile`](https://github.com/UTSCC09/project-fullstackarmy/blob/main/backend/Dockerfile)). Because the proxy is nginx and our website uses React Router, we needed to add some extra options when using the jwilder/nginx-proxy image to change the generated `nginx.conf` in order to allow for the routing.

## Maintenance

**Task:** Explain how you monitor your deployed app to make sure that everything is working as expected.

We set up a CI/CD pipeline using Github Actions. Whenever either  [`frontend`](https://github.com/UTSCC09/project-fullstackarmy/tree/main/frontend), [`backend`](https://github.com/UTSCC09/project-fullstackarmy/tree/main/backend) or [`docker-compose.yml`](https://github.com/UTSCC09/project-fullstackarmy/blob/main/docker-compose.yml) is changed in the `main` branch, the workflow copies the updated file/folder(s) to the VM in our Digital Ocean droplet and runs the necessary commands. That is, if either the `frontend` or `backend` folders were changed, then there would be a `docker-compose build [whichever folder]` run, followed by the `docker-compose up -d` command to deploy. `docker-compose.yml` only triggers the deployment command. If the workflow is successful, there is a checkmark seen next to the commit in GitHub. If not, then we debug what failed in the workflow. However, to further make sure that everything is running smoothly we double check the deployed website and see if everything looks okay. If absolutely necessary, we can also ssh into our VM and check the status of our docker containers if in case something happened to them during the build/deployment.

## Challenges

**Task:** What is the top 3 most challenging things that you have learned/developed for you app? Please restrict your answer to only three items. 

1. Deployment takes time, and the VMs at school are not as reliable as a VM from outide, like Digital Ocean
2. 
3. 

## Contributions

**Task:** Describe the contribution of each team member to the project. Please provide the full name of each team member (but no student number). 

- Aaren Chu: 
  - Deployment
  - CI/CD
  - Herd Immunity Bar and Series Charts, including GraphQL API calls such as isoCodes, get...
  - Set up of organization and clusters in MongoDB Atlas
  - Design of tab structure to display one heat map at a time
- Raha Gharadaghi
  - Please fill this out
- Mohamed Tayeh
  - Please fill this out

# One more thing? 

**Task:** Any additional comment you want to share with the course staff? 
