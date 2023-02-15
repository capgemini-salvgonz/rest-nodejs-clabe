# Nodejs Rest Server Cuentas CLABE

# Environment vars
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|CORS           | Cors accepted values            | "*"      |
|PORT           | Http Server port            | 3000      |

# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 18.12.1


# Getting started
- Clone the repository
```
git clone  https://github.com/capgemini-salvgonz/rest-nodejs-clabe.git
```
- Install dependencies
```
cd <project_name>
npm install
```
- Build and run the project
```
npm start
```
  Navigate to `http://localhost:3000`

## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **node_modules**         | Contains all  npm dependencies                                                            |
| **src**                  | Contains  source code that will be compiled to the dist dir                               |
| **configuration**        | Application configuration including environment-specific configs 
| **src/controller**      | Controllers define functions to serve various express routes. 
| **src/service**      | Logic implementation for each endpoint
| **src/routes**           | Contain all express routes, separated by module/area of application                       
| package.json             | Contains npm dependencies as well as [build scripts](#what-if-a-library-isnt-on-definitelytyped)   | tsconfig.json            | Config settings for compiling source code only written in TypeScript    


## Enpoints

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **POST /v1/api/clabe**         | Create a CLABE account based on the values: bank, location and account|
| **POST /v1/api/clabe/util?op=validate** | Based on an existing CLABE account, this service validate if it was well built |