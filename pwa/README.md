# LAI web app
The LAI Project uses Vue.js as JavaScript Single App Framework to generate the interactive Websites.
The Website is structured to support analyzation of Courses and Tests. Currently only Tests are implemented.
To develop the Project the Yarn PM is needed and nodejs. Follow the steps below to start local development.

## Project setup
Make sure to install yarn
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Generate Desktop App out of Website
* Install nativefier
```
npm install nativefier -g
```

* Run nativefier
```
nativefier "http://localhost:8081/"
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
