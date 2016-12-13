#!/usr/bin/env bash
mkdir -p build/js
./node_modules/.bin/watchify -v -o build/js/background-bundle.js src/js/background.js &
./node_modules/.bin/watchify -v -t reactify -o build/js/application-bundle.js src/js/application.jsx &


for job in `jobs -p`
do
  wait $job
done