<br />
<div align="center">
<h3 align="center">Simple Back-end using NestJs Typescript</h3>

  <p align="center">
    A simple Back-end example using NestJs Typescript for DOT Internship Challenge
    <br />
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <!-- <li><a href="#roadmap">Roadmap</a></li> -->
    <!-- <li><a href="#contributing">Contributing</a></li> -->
    <!-- <li><a href="#license">License</a></li> -->
    <li><a href="#contact">Contact</a></li>
    <!-- <li><a href="#acknowledgments">Acknowledgments</a></li> -->
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

This is a simple back-end examples using NestJs Typescript. Included in this project is as follows :

- Consists of at least 2 interrelated crud operations.
- Stores data using a SQL database
- Authentication api using JWT token.
- Create an e2e testing feature to test the api token.
- Choose a project pattern that you often use.
- Explain why you use that pattern in the github readme.

<!-- Here's a blank template to get started. To avoid retyping too much info, do a search and replace with your text editor for the following: `github_username`, `repo_name`, `twitter_handle`, `linkedin_username`, `email_client`, `email`, `project_title`, `project_description`, `project_license` -->

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started
## Project setup

```bash
$ npm install
```

## Set Up Database

Create a new dotenv and save it with this template

```bash
DB_HOST='your-hostname'
DB_PORT='your-database-port'
DB_USER='your-username'
DB_PASS='your-password'
DB_NAME='your-database-name'

JWT_SECRET='your-own-secret-code'
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

<!-- USAGE EXAMPLES -->

## Usage

Once the backend server is running, you can access the API at [http://localhost:3000]()

- This rest api can be used to record your books
- You can save your progress like current reading page and are you finish reading
- This rest api can save more than 1 user

### Routes

```json
/auth/signup    //Create new User
/auth/login     //Login user
/user/me        //Display current logged in user
/user/edit      //Edit current logged in user
/book           //Display current user books
/book/:id       //Display current user book by id
/book/edit/:id  //Edit current user book by id
/delete/:id     //Delete current user book by id
```

### Data
- User
```json
"id" : number
"email" : string
"password" : string
"name" : string
```
- Book
```json
"id_book" : number
"title" : string
"total_page" : number
"author" : string
"current_page" : number
"doneReading" : boolean
"user_id" : number
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->

## Contact

Noval Raihan Ramadhan - [Linkedln](www.linkedin.com/in/noval-raihan-r) - novalrr21@gmail.com

Project Link: [https://github.com/novalraihanr/challenge-backend-typescript](https://github.com/novalraihanr/challenge-backend-typescript)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
