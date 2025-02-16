# !/bin/bash

echo "Building tokens ..."
yarn build:tokens

echo "Building system ..."
yarn build:system

echo "Building icons ..."
yarn build:icons

echo "[priority] Building typography ..."
yarn build:typography

echo "[priority] Building link ..."
yarn build:link

echo "Building rest ..."
find packages/react/src -maxdepth 2 -name 'package.json' -exec sh -c 'jq -r .name {} | xargs -I % lerna run build --scope=% --stream' \;

echo "Done!"