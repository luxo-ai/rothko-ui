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
cat <<EOF | xargs -n 1 lerna run build --scope=% --stream
@rothko-ui/button
@rothko-ui/tabs
@rothko-ui/toaster
@rothko-ui/drawer
@rothko-ui/popup
@rothko-ui/radio
@rothko-ui/autocomplete
@rothko-ui/input
@rothko-ui/alert
@rothko-ui/accordion
@rothko-ui/skeleton
@rothko-ui/checkbox
@rothko-ui/slider
@rothko-ui/menu
@rothko-ui/switch
@rothko-ui/select
@rothko-ui/modal
@rothko-ui/breadcrumbs
@rothko-ui/tag
EOF
# find packages/react/src -maxdepth 2 -name 'package.json' -exec sh -c 'jq -r .name {} | xargs -I % lerna run build --scope=% --stream' \;

echo "Done!"