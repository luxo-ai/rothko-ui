# !/bin/bash

echo "Building tokens ..."
yarn build:tokens

echo "Building icons ..."
yarn build:icons

echo "Building system ..."
yarn build:system

echo "[priority] Building typography ..."
yarn build:typography

echo "[priority] Building link ..."
yarn build:link

echo "Building rest ..."
find packages/react/src -maxdepth 2 -name 'package.json' -exec sh -c 'jq -r .name {} | xargs -I % lerna run build --scope=% --stream' \;

echo "Done!"