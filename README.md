# ui

Plain ReactJS SPA.

## Local Development

```
npm i
npm run start
```

New react component snippet in VSC `rafce`

Application runs at http://localhost:3000

## Deployment

On each git tag, the project will be built and published to S3 bucket.

## ESLint Commands

```
npm run lint
npm run lint:fix
npm run format
```

`npm run lint`

This command runs the ESLint tool on your project to analyze your code for potential errors and style issues. ESLint is a static code analysis tool that helps you maintain code quality by identifying problematic patterns or code that doesn't adhere to your coding standards.

`npm run lint:fix`

This command not only analyzes your code for errors and style issues using ESLint but also attempts to automatically fix any problems that it can. It's a convenient way to correct common issues and ensure your code follows the specified style guidelines.

`npm run format`

This command runs a code formatter ( Prettier) on your project to ensure that your code is consistently styled. A code formatter automatically adjusts your code to follow a consistent style, making it easier to read and maintain.

## Husky - Documentation

Husky basically a git hook which is linked with eslint and prettier.

`npx husky-init`

Husky basically when we commit the code in our github then if the code are mess-up or not consistent or not same as we define rules in
prettier and eslint then return error like we not formatted the code then husky automatically return error.
