#!/usr/bin/env bash
mkdir -p build/js
NODE_ENV=production ./node_modules/.bin/browserify -o build/js/content.js src/js/content.js -t babelify
NODE_ENV=production ./node_modules/.bin/browserify   src/js/application.jsx  -o build/js/application-bundle.js -t babelify