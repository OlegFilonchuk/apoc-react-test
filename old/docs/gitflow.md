## Gitflow instructions

We are using git-flow branching model for maintaining code in this project.
You can read more about it here [http://jeffkreeftmeijer.com/2010/why-arent-you-using-git-flow/](http://jeffkreeftmeijer.com/2010/why-arent-you-using-git-flow/) or have a look at one of these screen casts:
* [How to use a scalable Git branching model called git-flow](http://buildamodule.com/video/change-management-and-version-control-deploying-releases-features-and-fixes-with-git-how-to-use-a-scalable-git-branching-model-called-gitflow) (by Build a Module)
* [A short introduction to git-flow](http://vimeo.com/16018419) (by Mark Derricutt)
* [On the path with git-flow](https://vimeo.com/37408017) (by Dave Bock)

The idea is to have feature branches (with name like `feature/ARL-460-add-permissions-group`) and merge them to `develop` branch only, use master branch and release branches only when we are going to deploy new release to production. We plan production releases before, so we have time for test and bugfixes and to make sure that end-user does not experience any issues.

Here are our conventions in git-flow:

```md
Production release branch name: [master]
"Next release" development branch name: [develop]
Feature branches starts with [feature/]
Release branches starts with [release/]
Hotfix branches starts with [hotfix/]
Support branches starts with [support/]
We do not have any version prefix.
```

Here you can find short summary:

| Branch type | Branch name                                               | Must be created from | Must be merged into    | Who is allowed to merge into that branch | Notes                                                                                                                                                      |
|:------------|-----------------------------------------------------------|:--------------------:|:----------------------:|------------------------------------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| Feature     | `feature/ARL-issue_number-desc` (eg. `feature/ARL-10`)    | `develop`            | `develop`              | Everyone                                 | Branch is named according to task number from JIRA. It is created to develop a new feature or test an issue solution.                                      |
| Chore       | `chore/ARL-issue-number-desc` (eg. `chore/doing-foo-bar`) | `develop`            | `develop`              | Everyone                                 | It is created for tools and configuration                                                                                                                  |
| Spike       | `spike/ARL-issue-number-desc` (eg. `spike/ARL-25`)        | `develop`            | `develop`              | Everyone                                 | It is created for unblocking another story or another spike                                                                                                |
| Bugfix      | `bugfix/ARL-issue_number-desc` (eg. `bugfix/ARL-10`)      | `develop`            | `develop`              | Everyone                                 | Branch is named according to task number from JIRA. It is created to fix existing feature that exist in develop branch.                                    |
| Hotfix      | `hotfix/release_version`                                  | `master`             | `master` and `develop` | Everyone                                 | Used to prepare unplanned changes directly into master branch.                                                                                             |
| Release     | `release/release_version` (eg. `release/1.2.1`)           | `develop`            | `master` and `develop` | Technical Leaders                        | Preparation for a new production release. It allows Q/A testing, last-minute tweaks and fixes.                                                             |
| Develop     | `develop`                                                 | `master`             | `-`                    | Everyone after successful code review    | Latest development state, sometimes called integration branch. Feature branches should be merged into this branch with pull requests to allow code review. |
| Master      | `master`                                                  | `-`                  | `-`                    | Technical Leaders                        | Production branch. This branch is deployed on production and should contain only production ready code.                                                    |

To start new feature and prepare pull request for it you can use [git-flow tool](https://github.com/nvie/gitflow) or simply your git as you have used before.

- create own branch
    - for features: from `develop`, as `feature/jira_issue` (eg. `feature/ARL-21`)
    - for bugfixes: from `develop`, as `feature/fix-jira_issue` (eg. `feature/fix-ARL-21`)
    - for hotfixes: from `master`, as `hotfix/release_version` (eg. `hotfix/1.2.1`)
    - for releases: from `develop`, as `release/release_version` (can be made only by Technical Leaders) (eg. `release/1.2.1`)
- commit your changes/fixes
- push your branch to `origin`
- create pull request to:
    - for features and bugfixes: to `develop`
    - for hotfixes: to `master` and `develop`
    - for releases: to `master` and `develop` (can be made only by Technical Leaders)
- send link to review to reviewers
- wait for code review (at least one approval is needed before merging)
- squash all commits into single one with commit name as:
    - for features: `Feature (jira_issue): issue_name` (eq. `Feature (ARL-21): Implement permission groups`)
    - for bugfixes: `Bugfix (jira_issue): issue_name` (eq. `Bugfix (ARL-22): Fix permission groups modal dialog`)
    - for hotfixes: `Hotfix (release_version) (jira_issue): issue_name` (eq. `Hotfix (1.2.1) (ARL-22): Fix permission groups modal dialog`)
- merge your code
- start new feature/bugfix/hotfix

## Version Policy

This project is versioned according to `Semantic Versioning 2.0.0` with minor changes. The version number is: `MAJOR.MINOR.PATCH` (eg. `1.0.5`, `1.2.3`)
Each version is incremented according to the list below:
1. `MAJOR` version when you make incompatible API changes or a big functionality is introduced and the PM makes a decision to increase this version.
2. `MINOR` version when you add functionality in a backwards-compatible manner, and 3. `PATCH` version when you make backwards-compatible bug fixes.

The version policy is enforced and monitored by Technical Leader. A new version is created during release branch creation.
