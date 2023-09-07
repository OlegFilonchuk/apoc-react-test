#!/usr/bin/env sh -e

#
# Creates a new GitHub Release Pull Request from the "feature/*" or "hotfix/*" base branch
#
# Usage:
#   $ sh ./scripts/create-release-pull-request.sh <target-release-branch> <release-version>
#
# The <target-release-branch> argument is required. You need to provide a target branch that should have either "master"
# or "develop" value. The merge to the "develop" target branch should be done only when we are using "hotfix/*" as a
# source branch.
#
# The <release-version> argument is required and will be used to bump package version and as a title and description of
# the Pull Request.
#

TARGET_RELEASE_BRANCH=${1}
RELEASE_VERSION=${2}

SRC_BRANCH=$(git branch | grep '*' | cut -d '*' -f 2 -d ' ')

GITHUB_BASE=github.com
GITHUB_API=https://api.${GITHUB_BASE}
GITHUB_PROJECT_URI=$(node -e "const pkg = require('./package.json'); console.log(pkg.repository.url.match(/[^\/]+\/[^\/]+\$/)[0]);")

API_CREATED_RESULT_RESPONSE_CODE=201
API_AUTH_INVALID_RESPONSE_CODE=401
API_AUTH_FAILURE_RESPONSE_CODE=403

PR_TITLE="Release ${RELEASE_VERSION}"
PR_DESCRIPTION="Prepare release ${RELEASE_VERSION}"

# Check first
if [ "${TARGET_RELEASE_BRANCH}" == '' ]; then
  echo "Error: You need to specify TARGET_RELEASE_BRANCH" 1>&2
	exit 1
fi

if [ "${RELEASE_VERSION}" == '' ]; then
  echo "Error: You need to specify VERSION" 1>&2
	exit 1
fi

# Bump version
echo 'Bump version'
npm version $RELEASE_VERSION

RELEASE_VERSION=$(npm version | head -1 | cut -d ':' -d "'" -f 4)
RELEASE_BRANCH=r$RELEASE_VERSION

git push origin $SRC_BRANCH

echo "Version bumped to ${RELEASE_VERSION}"


# Get token
read -s -p "Please enter GitHub token": GITHUB_TOKEN
echo

# Try to connect to API
echo
echo "Connecting with GitHub..."

API_RESPONSE=$(curl -sw "%{http_code}" "${GITHUB_API}/user?access_token=${GITHUB_TOKEN}" | tr '\n' ' ')
API_STATUS=$(echo $API_RESPONSE | grep -o '.\{3\}$')

if [ $API_STATUS == $API_AUTH_FAILURE_RESPONSE_CODE ] || [ $API_STATUS == $API_AUTH_INVALID_RESPONSE_CODE ]; then
  echo "Error: Given authorization token is invalid" 1>&2
  exit 1
fi

# Get the current user name
USER_NAME=$(echo $API_RESPONSE | cut -d ":" -f 2 | cut -d "," -f 1)
echo "Successfully connected with GitHub for user $USER_NAME"

# Create a new release Pull Request
echo "Creating a New Pull Request for release ${RELEASE_VERSION}..."

REQUEST_PAYLOAD="{\"title\":\"${PR_TITLE}\",\"body\":\"${PR_DESCRIPTION}\",\"head\":\"${SRC_BRANCH}\",\"base\":\"${TARGET_RELEASE_BRANCH}\"}"
API_RESPONSE=$(curl -sw "%{http_code}" -X POST -d "${REQUEST_PAYLOAD}" "${GITHUB_API}/repos/${GITHUB_PROJECT_URI}/pulls?access_token=${GITHUB_TOKEN}" | tr '\n' ' ')
API_STATUS=$(echo $API_RESPONSE | grep -o '.\{3\}$')

if [ $API_STATUS != $API_CREATED_RESULT_RESPONSE_CODE ]; then
  echo "Error: Could not create a new Pull Request" 1>&2
  exit 1
fi

# Get a Pull Request number
PULL_REQUEST_NUMBER=$(echo $API_RESPONSE | cut -d ':' -f 3 | cut -d '"' -f 1 | grep -o '[0-9]*$')

echo
echo "The release Pull Request #${PULL_REQUEST_NUMBER} was created. You can go to:"
echo "https://${GITHUB_BASE}/${GITHUB_PROJECT_URI}/pull/${PULL_REQUEST_NUMBER}"
