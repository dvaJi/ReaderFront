# ReaderFront

## Prerequisites

1. Install [Node.js](http://nodejs.org)
 - on OSX use [homebrew](http://brew.sh) `brew install node`
 - on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

2. Install these NPM packages globally

    ```bash
    npm install -g bower gulp nodemon
    ```

    >Refer to these [instructions on how to not require sudo](https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md)

## Installation
1. Install or update to [FoOlSlide (by dvaJi fork)](https://github.com/dvaJi/FoOlSlide)
2. Edit 1constant.json with your site config
3. Install dependencies 
```bash
npm install
```
```bash
bower install
```
Compile it
```bash
gulp build
```
Upload **dist** folder in your server