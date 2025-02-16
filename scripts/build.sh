# !/bin/bash

echo "Building tokens ..."
yarn build:tokens

echo "Building icons ..."
yarn build:icons

echo "Building system ..."
yarn build:system

echo "Building typography ..."
yarn build:typography

echo "Building link ..."
yarn build:link

echo "Building menu ..."
yarn build:menu

echo "Building rest ..."
yarn build:button
yarn build:tabs
yarn build:toaster
yarn build:drawer
yarn build:popup
yarn build:radio
yarn build:autocomplete
yarn build:input
yarn build:alert
yarn build:accordion
yarn build:skeleton
yarn build:checkbox
yarn build:slider
yarn build:switch
yarn build:select
yarn build:modal
yarn build:breadcrumbs
yarn build:tag

# find packages/react/src -maxdepth 2 -name 'package.json' -exec sh -c 'jq -r .name {} | xargs -I % lerna run build --scope=% --stream' \;

echo "Done!"