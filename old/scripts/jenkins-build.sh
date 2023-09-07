#!/usr/bin/env sh -ex

#
# Build
#
# Usage:
#   $ sh ./scripts/jenkins-build.sh
#
# This command will run all checks, tests and create a production build.
#

echo "  Node: `(node -v)`"
echo "  Npm:  `(npm -v)`"
echo "  Yarn: `(yarn -v)`"

# Install
yarn install
# yarn upgrade

# Test
yarn run eslint
yarn run test-coverage

# Build
yarn run build-prod

# Docs
yarn run docs
