FROM node:18-alpine as base
WORKDIR /app
RUN apk add --no-cache g++ make py3-pip libc6-compat
ARG REACT_APP_TAG_NAME
ARG REACT_APP_GIT_COMMIT
ENV NODE_ENV=production
ENV REACT_APP_TAG_NAME=${REACT_APP_TAG_NAME}
ENV REACT_APP_GIT_COMMIT=${REACT_APP_GIT_COMMIT}
COPY . .

RUN npm i && \
    npm run build
EXPOSE 3000
ENTRYPOINT [ "npm", "run", "start" ] 
