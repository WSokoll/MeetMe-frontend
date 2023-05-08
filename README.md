# MeetMe - frontend

This project is a frontend application built using the Vue.js framework. It is meant to connect to a backend, Spring Boot app, which provides the necessary API endpoints and connection to the MySQL database. Backend app can be found [HERE](https://github.com/Camil458/MeetMe).

## Features
 - registration and login to the website
 - serching for events by entering a phrase and specifying the time
 - displaying search results using a list and markers on the map
 - displaying details such as date, place, description, availability of tickets for a specific event
 - creating and adding events (only for logged in users)

## Project setup
```
npm install
```
### Connection to the backend application
In order for app to work correctly, the *public/config.json* file has to be edited. The file should contain `BACKEND_URL` variable with the correct value assigned (for example: `http://localhost:8080`).

### Compiles and hot-reloads for development
```
npm run serve
```
It is recommended to run the backend application on the port 8080, so the default port can be changed as in the example below.
```
npm run serve -- --port 8089
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## Technology stack
 - Vue.js 3
 - CSS
 - HTML5
 - Leaflet

## Credit
 - Background image - [Image by rawpixel.com](https://www.freepik.com/free-photo/stunning-blurred-light-abstract_2861800.htm#query=event&position=46&from_view=search&track=sph) on Freepik
