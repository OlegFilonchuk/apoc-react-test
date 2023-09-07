In order to make a new release you will need to have:

- An access to the [**Spirent Jenkins**](http://avalanche-jenkins.appsec.spirent.com:8080/)
- Access to [**Apoc-React**](https://github.com/mudynamics/apoc-react) GitHub project
- GitHub access token for the [SpirentBuildUser](https://github.com/mu-jenkins) user
- Installed **Apoc-React** in your environment. Check the [**Development** section](/#Development) for more details how to do it.
- Shell environment in order to run a `*.sh` script
- Opened **Changelog.md** file.

# How to make a new Release

_Note: You will need around **15-30 minutes** in order to make a new release._

## Step 1: Update Changelog

1. Before starting be sure you can make a release. It means the code on the [`develop`](https://github.com/mudynamics/apoc-react/tree/develop) branch is ready to be merged into the [`master`](https://github.com/mudynamics/apoc-react/tree/master) branch.

   All Unit Tests should be passing and there should be no issues with the build process. If everything is fine you can continue.

2. Open the terminal window, pull the changes from the `develop` branch and create **pre-release** branch:

   ```sh
   git checkout develop
   git fetch --progress --prune
   git reset --hard origin/develop
   git checkout -b release/pre-release-2.9.0
   ```

3. In the terminal window install and update the `npm` dependencies:

   ```sh
   npm i
   npm update
   ```

4. Next open the **CHANGELOG.md** file in your favourite editor and update the release date for the first entry from top, marked as "**Not released yet**"

   example: `**## 2.9.0 July 30, 2017**`

5. Next check if all changes from the last release are added to **CHANGELOG.md**. You can check apoc-react **releases**, next **Pull requests** tab and search `is:pr is:merged`

6) Next open the **package.json** file and update following fields:

- `version` - to following release version
- `"peerDependencies": { "chameleon" }` - to latest chameleon release
- `"devDependencies" : { "chameleon" }` - to latest chameleon release

example

```json
"version": "2.4.0",

"peerDependencies": {
  "chameleon": "github:mudynamics/chameleon#v1.0.13",
}

"devDependencies": {
  "chameleon": "github:mudynamics/chameleon#v1.0.13",
}
```

7. Save the files and commit changes to GIT:

   ```sh
   git add .
   git commit -m "Release: Prepare release 2.9.0"
   git push origin release/pre-release-2.9.0
   ```

## Step 2: Creating a new Release Pull Request

1. After finishing **Step 1** you can proceed with creating a new **Release Pull Request**.

** Steps 2-5 don't work because script is not working ** Instead create **Pull request** and go to step **5**

2. Open the terminal window and navigate to the root directory of the `apoc-react` project and run a command:
   ```sh
   sh ./scripts/create-stable-version-pull-request.sh
   ```
3. Enter the **GitHub** access token when the script will ask for it and press enter.

4. Wait for the script to create a **Pull Request**. In the output, you should see the information about the new **Pull Request** number and the link to **GitHub** website.

5. Open the newly created **Pull Request** in the Web Browser. `pre-release` branch should be merged into `master`. Fix conflicts in files (i.e. **CHANGELOG.md**, **package.json**, **yarn.lock**).

6. Approve the **Pull Request** and wait for all **checks** to pass.

7. When the **Pull Request** will be ready to be merged select the **"Create a merge commit"** from the dropdown arrow near the green **Merge** button.

8. Next click on the "**Merge pull request**" button.

9. **Remember not to remove the `release/pre-release-2.9.0` branch yet. We will need it to merge to the `develop` branch as well.**

## Step 3: Making a Release Build

1. After finishing **Step 2** you will have to trigger the **Release build** manually.

2. Open the Web Browser and navigate to the [Spirent Jenkins](http://avalanche-jenkins.appsec.spirent.com:8080/) website.

3. Find and open the [`apoc_react_make_new_stable_release`](http://avalanche-jenkins.appsec.spirent.com:8080/view/CyberFlood/job/apoc_react_make_new_stable_release/) job.

4. On the left menu select "**Build with parameters**" action. Make sure `Master` is selected and build it.

5. Wait for the job to finish creating a release build.

## Step 4: Add release notes and spread the news

1. After finishing the **Step 3** you can update **GitHub Release Notes**.

2. Open the Web Browser and navigate to the [**Release page**](https://github.com/mudynamics/apoc-react/releases) on GitHub website.

3. Find the correct release tag ex. **v2.9.0** and click on it.

4. On the next page click **Edit tag** button

5. Enter the release title ex. **2.9.0 (July 30, 2017)**

6. Copy and paste information about the release changes from the **CHANGELOG.md** file and put them into the description field.

7. Click on the **Update release** button.

8. Open **Slack** and go to the [**appsec-apoc-react** channel](https://spirent.slack.com/messages/appsec-apoc-react).

9. Write a quick note to everyone about the new release ex.:
   ```md
   @channel We have a new _Apoc-React_ release _2.9.0_
   You can check the Release Notes here: https://github.com/mudynamics/apoc-react/releases/tag/v2.9.0
   Documentation can be found here: http://spccalweb04.spirentcom.com/apoc-react/
   ```

## Step 5: Update versions on "**develop**" branch

2. Open the terminal window create **post-release** branch from the **pre-release**:

   ```sh
   git fetch --progress --prune
   git checkout -b release/post-release-2.9.0
   git reset --hard origin/release/pre-release-2.9.0
   ```

3. Open the `package.json` file in your favourite editor and find the `version` property.

4. Update the version to new one from `2.9.0` to `2.10.0` ex. `"version": "2.10.0-dev"`. Please remember to leave the `-dev` suffix.

5. Next open the **CHANGELOG.md** file in your favourite editor and add new release entry on top of the file:

   example:

   ```md
   ## 2.10.0 (Not released yet)

   - ...
   ```

6. Update the **package.json**

```json
  "version": "2.10.0-dev",

  "peerDependencies": {
    "chameleon": "github:mudynamics/chameleon#master_dist",
    ...
  }
  "devDependencies": {
    "chameleon": "github:mudynamics/chameleon#master_dist",
    ...
  }
```

6. Save to file and commit changes to GIT:

   ```sh
   git add .
   git commit -m "Post release 2.9.0"
   git push origin release/post-release-2.9.0
   ```

7. Go to [**Apoc-React**](https://github.com/mudynamics/apoc-react) GitHub project and create a new **Pull Request** based on the `release/post-release-2.9.0` branch, that should be merged into `develop` branch according to the process.

8. Wait for the **Pull Request** to be reviewed and approved so you can merge it into `develop` branch.

9. Grab a cup of coffee and enjoy your day.

# How to make a new Hotfix Release
