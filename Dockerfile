FROM node:18-alpine as base
WORKDIR /app
RUN apk add --no-cache g++ make py3-pip libc6-compat
ARG NEXT_PUBLIC_TAG_NAME
ARG NEXT_PUBLIC_GIT_COMMIT
ENV NODE_ENV=production
ENV NEXT_PUBLIC_TAG_NAME=${NEXT_PUBLIC_TAG_NAME}
ENV NEXT_PUBLIC_GIT_COMMIT=${NEXT_PUBLIC_GIT_COMMIT}
COPY . .

RUN npm i && \
    npm run build
EXPOSE 3000
ENTRYPOINT [ "npm", "run", "start" ] 
