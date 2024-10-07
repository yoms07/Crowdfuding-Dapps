#!/bin/sh

echo "Copying artifacts"
cp -R ./artifacts/* ../frontend/src/artifacts/
echo "Copy artifacts done"

echo "Syncing frontend deployed address"
node frontend-sync.js
echo "Syncing frontend deployed address done"