# github-clone-pr

Allows you to easily clone a Github PR with only the URL for the Pull Request from the UI.

Eventually I'd like to make this a true git addon e.g. `git clone-pr` like I did for [git-blame-someone-else](https://github.com/jayphelps/git-blame-someone-else).

# Install

```shell
npm install -g github-clone-pr
```

# Usage

```shell
clone-pr <url> <directory>
```

* url: https://github.com/:owner/:repo/pull/:number
* directory: where you want the repo cloned to

e.g.

```shell
clone-pr https://github.com/jayphelps/github-clone-pr/pull/1 some-place-you-want
```

It will also automatically create a remote for the `upstream`, so you can do things like:

```shell
git rebase upstream/master
```