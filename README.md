# ui

NextJS application to serve the front end.

## Local Development

```
npm i
npm run dev
```

New react component snippet in VSC `rafce`

Application runs at http://localhost:3000

### Testing Docker Image

```
make docker-build
docker run -d --rm --name ui -p 3000:3000 ui:latest && docker logs -f ui
```

## Deployment

On each git tag, a new docker image is published to ECR.

To build the docker image locally, run this command:

```
make docker-build
```