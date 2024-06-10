# ui

Plain ReactJS SPA.

## Local Development

```
npm i
npm run start
```

New react component snippet in VSC `rafce`

Application runs at http://localhost:3000

## Prettier

We try to avoid sending changes to git related to code format, and we want the code to be
readable at the same time.

Run this command before you push code to git, to detect any format inconsistency

```
npm run format:check
```

And run this command to actually fix the code

```
npm run format
```

## Deployment

On each git tag, the project will be built and published to S3 bucket.
