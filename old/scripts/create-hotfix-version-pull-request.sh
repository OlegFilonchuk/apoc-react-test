#!/usr/bin/env sh -e

#
# Creates a GitHub Pull Request for making new Hotfix Release based on the "hotfix/*" branch and with the merge into the
# 'master' branch.
#
# Usage:
#   $ sh ./scripts/scripts/create-stable-version-pull-request.sh (<new-hotfix-version-or-semver>)
#
# The <new-hotfix-version-or-semver> argument is optional. By default, script will use the "patch" as a information
# to which version we would like to bump the package.
#

DEFAULT_SEMVER_IDENTIFIER=patch
SEMVER_IDENTIFIER=${1:-$DEFAULT_SEMVER_IDENTIFIER}
TARGET_RELEASE_BRANCH=master
SRC_BRANCH=hotfix

CURRENT_BRANCH=$(git branch | grep '*' | cut -d '*' -f 2 -d ' ')
CURRENT_BRANCH_PART=$(echo $CURRENT_BRANCH | cut -d '/' -f 1)
CURRENT_VERSION=$(npm version | head -1 | cut -d ':' -d "'" -f 4)

NEW_HOTFIX_RELEASE_VERSION=$(./node_modules/.bin/semver $CURRENT_VERSION -i $SEMVER_IDENTIFIER)

# Check current branch
if [ $CURRENT_BRANCH_PART != $SRC_BRANCH ]; then
  echo "Error: You need to switch onto '$CURRENT_BRANCH_PART/*' branch first. Run 'git checkout $CURRENT_BRANCH_PART/*' command in terminal." 1>&2
	exit 1
fi

# Check upstream
git fetch

CURRENT_BRANCH_SHA1=$(git rev-parse @)
UPSTREAM_BRANCH_SHA1=$(git rev-parse origin/$CURRENT_BRANCH)

if [ $CURRENT_BRANCH_SHA1 != $UPSTREAM_BRANCH_SHA1 ]; then
  echo "Error: Your branch is not up to date. You need to pull changes from the upstream first. Run 'git pull' command in terminal." 1>&2
	exit 1
fi

# Create a Pull Request
sh -e ./scripts/create-release-pull-request.sh $TARGET_RELEASE_BRANCH $NEW_HOTFIX_RELEASE_VERSION
