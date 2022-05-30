# Node.js task

# Technology stack

- Serverside: Node.js, express, typeScript

- DB: mongoDb

- Containerization: docker

- Tests: jest, chai

# Steps to run locally:
- Clone the repository
```
git clone <repo url>
```
- development build run
````
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up 
````
- add env variables to docker-compose.prod.yml
- production build run
````
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up 
````
- run tests 
````
npm run test
````
- shut down
````
docker-compose down
````

# Api endpoints:
After running the server go to http://localhost:3000/api-docs/#/ to see full endpoints documentation.

# Api healthcheck:
After running the server go to http://localhost:3000/health-check to check the service.
