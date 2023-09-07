#!/usr/bin/env sh -ex

#
# Release Build
#
# Usage:
#   $ sh ./scripts/release-build.sh
#
# This command will create a release build and commit distribution files into "r<new-version>" branch.
#

RELEASE_VERSION=$(npm version | head -1 | cut -d ':' -d "'" -f 4)
RELEASE_BRANCH=r$RELEASE_VERSION
RELEASE_TAG=v$RELEASE_VERSION

echo 'Clean-up /dist directory'
git rm -r dist/ guide/ --force --ignore-unmatch --quiet

echo 'Install and build project'
sh -ex ./scripts/jenkins-build.sh
git add -A dist/ guide/ --force

git commit --amend -m "Release ${RELEASE_VERSION}"
git tag $RELEASE_TAG --force

echo "Push changes to '$RELEASE_BRANCH'"
git push origin master:$RELEASE_BRANCH
git push --tags

echo 'Done!'
