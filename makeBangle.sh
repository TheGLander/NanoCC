#!/usr/bin/env sh

set -e

rm -rf bangle_out 
mkdir bangle_out
npm run build
cp ./dist/index.js ./bangle_out/app.js
cp -r ./{cclicker-icon.js,cclicker.png,metadata.json,src,static,README.md,package.json,rollup.config.js} ./bangle_out

printf "node_modules/\n" > ./bangle_out/.gitignore