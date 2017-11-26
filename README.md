# A Server, Client and Database with built in login/register and social auth

## Why?

I'm creating this a base for projects to come, often I have an idea and want to get started on something simple, end up spending hours scouring the best way to implement authentication and all of that jazz.

I decided that enough is enough and to write myself a quick base to work from.

TLDR:
* Nicely structured.
* Docker configured and exposed.
* Authentication is already done.
* Environment variable files already configured
* MySQL database

### Getting started...

`docker-compose up`

1 thing... I did have to faff with the MySQL database permissions but I can't for the life of me remember what it was...

## What?

This project contains the following:

### Server: AdonisJS 4

A simple AdonisJS server with JWT and social integration enabled.

Will startup in the docker container on port 3333 (Already exposed!)

You can check in `server.dev.env` for any environment configuration (Good to change the APP_KEY for any new projects)

### Client: ReactJS with Redux and Redux-Observables

Social auth already enabled, will not be adding any styling libraries apart from the necessary.

create-react-app is configured to automatically proxy any calls to the [server](#server-adonisjs-4), check the package.json!

### docker-compose.yml
Will initialise the Server and Client whilst also spinning up the MySQL database for the server.
