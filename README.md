# angular2-tv-tracker

An Angular2/AngularFire2 example application.

The webpack configuration in this project was largely inspired by: [preboot/angular2-webpack](http://https://github.com/preboot/angular2-webpack)

All show data has been provided by the [TVmaze.com](http://www.tvmaze.com/api) API.

By default, the application will use one of my personal Firebase instances. Details on setting up
a personal instance will follow. The configuration is hard-coded in the `core.module.ts` file.

### Quick Start

```sh
# clone the repo
git clone https://github.com/giannico/angular2-tv-tracker app

# change directory to your app
cd app

# install the dependencies with npm
npm install

# start the dev server
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) in your browser.

### Build

```sh
npm install

npm run build

# see the built application
ls dist
```

View the built content in the dist folder.