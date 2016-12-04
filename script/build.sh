#!/usr/bin/env bash
./node_modules/.bin/browserify -o build/js/content.js src/js/content.js
./node_modules/.bin/browserify   src/js/application.jsx  -o build/js/application-bundle.js -t babelify