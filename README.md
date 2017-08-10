# typhoon-message

> A latest information about typhoon in Taipei city

## Website
[Taipei City's Typhoon Message](https://yrfang.github.io/typhoon-message/)

The project was completed with:
* Vue.js
* Vue CLI
* Google map api connection
* Single page application with vue-router
* Taipei government open source data loaded with vue-axios

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Deploy the application

The quick start to document your VueJS project with [Github Pages](https://pages.github.com/) when you use the [standard webpack tools](http://vuejs-templates.github.io/webpack/) and run under command:

```bash
npm run build
```

### step 1: Setup the build system to build to `/docs`

Edit the file `config/index.js` and do:

* find `../dist` replace with `../docs`
* also find `assetsPublicPath: '/'`, change them to `assetsPublicPath: './'`

The second change is that you make your VueJS project's files become relative paths to read on browser. Note: your Vue-cli will tell you can't view index html on localhost until you replace with `assetsPublicPath: '/'` setting.

Then run:

```bash
npm run build
```

You should now find a docs folder in your project. Add and push to github.

### step 2: Setup pages on github

In your project's repository, change the options in setting section. Choose the `master branch /docs folder` in your sorce.
Currently, you are done! And you will view your project on gitPages when your `/docs folder` automatically is published.

<!-- ## npm install

```bash
npm install pug --save-dev

npm install sass-loader node-sass --save-dev

npm install --save axios vue-axios

npm install --save bootstrap-vue

npm install --save font-awesome
``` -->
