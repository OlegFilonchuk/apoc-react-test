#!/usr/bin/env sh -ex

#
# Custom Builds
#
# Usage:
#   $ sh ./scripts/dist-build.sh (<target-branch>)
#
# This command will create a production build and commit distribution files into given branch (with "*-build" suffix).
#
# The <target-branch> argument is optional. By default, script will use the "custom" as a target branch and commit all
# files into "custom-build" target branch.
#

PKG_VERSION_SUFFIX=${BUILD_NUMBER:-'local-dev'}
DEFAULT_TARGET_BRANCH=custom
TARGET_SFX=-build
CUSTOM_TARGET_BRANCH=${1:-$DEFAULT_TARGET_BRANCH}$TARGET_SFX

if [ "${1}" = 'develop' ]; then
  BRANCH_INTERFIX='develop'
else
  BRANCH_INTERFIX='custom'
fi

echo "Create '$CUSTOM_TARGET_BRANCH' branch"
git branch -D $CUSTOM_TARGET_BRANCH 2> /dev/null || true
git checkout -b $CUSTOM_TARGET_BRANCH

echo 'Clean-up /dist and /guide directories'
git rm -r dist/ guide/ --force --ignore-unmatch --quiet

echo 'Install and build project'
sh -ex ./scripts/jenkins-build.sh

echo 'Commit production files'
SHA1_SHORT=`(git rev-parse --short HEAD)`

git add -A dist/ guide/ --force
git commit -m "$CUSTOM_TARGET_BRANCH $SHA1_SHORT"

echo 'Bump version'
PKG_VERSION=`(npm list --depth=0 | head -1 | cut -d '@' -f 2 | cut -d ' ' -f 1 | cut -d '-' -f 1)`
CUSTOM_BUILD_PKG_VERSION="$PKG_VERSION-$BRANCH_INTERFIX-$PKG_VERSION_SUFFIX"

npm version $CUSTOM_BUILD_PKG_VERSION -m "$CUSTOM_TARGET_BRANCH $SHA1_SHORT %s"

echo 'Squash commits'
git reset --soft HEAD^1
git commit --amend -m "Build $CUSTOM_BUILD_PKG_VERSION from $CUSTOM_TARGET_BRANCH $SHA1_SHORT"

echo "Bumped version to '$CUSTOM_BUILD_PKG_VERSION'"

echo "Push changes to '$CUSTOM_TARGET_BRANCH'"
git push origin $CUSTOM_TARGET_BRANCH --force-with-lease
git push --tags

echo 'Done!'
