# Welcome to Advanced React of Today and Tomorrow!

Before attending the workshop, please make sure you can run the apps in this repository.

## Step 1 - Dependencies

You will need:

* [Git](http://git-scm.com/downloads)
* [node](https://nodejs.org/)
* [yarn](https://yarnpkg.com/en/docs/install)

Please install them if you don't have them already.

## Step 2 - Clone the repository:

From the command line, clone the repository:

```sh
$ git clone https://github.com/ryanflorence/advanced-react-workshop.git
```

## Step 3 - Install dependencies

```sh
$ cd advanced-react-workshop
$ yarn
```

This will install all the dependencies for all of the exercises, _it might take a while_.

You can use npm but yarn's caching will make it a better experience.

## Step 4 - Run an app

Each exercise is a separate app using [Create React App](https://github.com/facebookincubator/create-react-app).

To run one, first `cd` into the directory:

```sh
cd 01/01-exercise
```

Then run it

```sh
yarn start
```

Your browser should open up to a running app that looks like this:

![screenshot](./screenshot.png)

## Troubleshooting

A few common problems:

* **You're having problems cloning the repository.** Some corporate networks block port 22, which git uses to communicate with GitHub over SSH. Instead of using SSH, clone the repo over HTTPS. Use the following command to tell git to always use `https` instead of `git`:

```sh
$ git config --global url."https://".insteadOf git://

# This adds the following to your `~/.gitconfig`:
[url "https://"]
  insteadOf = git://
```

* **You're having trouble installing node.** We recommend using [nvm](https://github.com/creationix/nvm). nvm makes it really easy to use multiple versions of node on the same machine painlessly. After you install nvm, install the latest stable version of node with the following command:

```sh
$ nvm use default stable
```

* **You don't have permissions to install stuff.** You might see an error like `EACCES` during the `npm install` step. If that's the case, it probably means that at some point you did an `sudo npm install` and installed some stuff with root permissions. To fix this, you need to forcefully remove all files that npm caches on your machine and re-install without sudo.

```sh
$ sudo rm -rf node_modules

# If you installed node with nvm (suggested):
$ sudo rm -rf ~/.npm

# If you installed node with Homebrew:
$ sudo rm -rf /usr/local/lib/node_modules

# Then (look ma, no sudo!):
$ npm install
```

### License

This material is available for private, non-commercial use under the [GPL version 3](http://www.gnu.org/licenses/gpl-3.0-standalone.html). If you would like to use this material to conduct your own workshop, please contact me at ryan@workshop.me.
