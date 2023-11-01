FROM node:18-alpine as base
WORKDIR /app
ENV NODE_ENV=production
# RUN apk add --no-cache g++ make py3-pip libc6-compat
RUN apk add --no-cache libc6-compat
COPY . .

RUN npm ci && \
    npm run build
EXPOSE 3000
ENTRYPOINT [ "npm", "run", "start" ] 
