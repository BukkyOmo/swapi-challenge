[![Heroku](https://img.shields.io/badge/Heroku-🚀-green)](https://swapi-application.herokuapp.com/)
[![Build Status](https://travis-ci.org/BukkyOmo/swapi-challenge.svg?branch=develop)](https://travis-ci.org/BukkyOmo/swapi-challenge)
[![Coverage Status](https://coveralls.io/repos/github/BukkyOmo/swapi-challenge/badge.svg?branch=develop)](https://coveralls.io/github/BukkyOmo/swapi-challenge?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/7c17e2d704e58d072253/maintainability)](https://codeclimate.com/github/BukkyOmo/swapi-challenge/maintainability)

# Swapi API challenge

This application uses node js in making http calls to an external API called swapi.com whilst also saving user comments in database.

---

# Project management

This application uses pivotal tracker to schedule and arrange the tasks to be carried out. [Link](https://www.pivotaltracker.com/n/projects/2408531)

---

## OpenApi Docmentation

> API documentation can be viewed using [Link](https://documenter.getpostman.com/view/5170514/SW7aXnf8)

---

## Technologies

- Node JS
- Express
- Mocha and Chai
- Redis
- Postman

---

## Database

- [Postgres](https://www.postgresql.org/) (postgresql)

---

## Features

> - User can get all movies available
> - User can post a comment under a movie
> - User can get all comments posted under a movie
> - User can get all available characters in a movie, sort them by either name, gender or height and filter by gender.

---

## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v10.13.0

    $ npm --version
    6.4.1

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn
---

## Configure app

create a  `.env` file then add url to your db.

- DATABASE_URL
---

## Setup and Development

- Clone the repo using `https://github.com/BukkyOmo/swapi-challenge.git`
- Run `npm install` or `yarn install`
- Setup `.env` variables
- Run `npm run serve` to start development server

---

## Setup and run docker

- Ensure you have docker installed on your computer.
- Build an image and run it as one containe by running `docker build .`
- Run `docker-compose up`
- To stop docker from running run `docker-compose down`

---
    
## Running migrations
    First install db-migrate globally and db-migrate-pg locally
    $ npm run migrations-up:dev 

---

## Testing the app

- Run `npm test` to run test cases

---

## Author 🚀

Bukola Omosefunmi
