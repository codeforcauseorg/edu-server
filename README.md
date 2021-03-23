<h1 align="center">
     Edu Server 
</h1>
  <p align="center">Product focuses on 100% education as well as upskilling developing countries and rural areas.</p>
<p align="center">
<a href="https://github.com/codeforcauseorg/edu-server/"><img src="https://img.shields.io/github/package-json/v/codeforcauseorg/edu-server" alt="App Version" /></a>
<a href="LICENSE"><img src="https://img.shields.io/github/license/codeforcauseorg/edu-server" alt="License" /></a>
<a href="https://discord.gg/dydQp2Q">
  <img src="https://img.shields.io/discord/717102560909197493" alt="chat"/></a>
<a href="https://twitter.com/codeforcausein?lang=en"><img src="https://img.shields.io/twitter/follow/codeforcausein.svg?style=social"></a>
</p>

## Description

Education platform is a product which will strive to enable 100% education and will help in upskilling developing countries and rural areas.
Edu server is a backend application written using Nestjs, it provides api endpoints which are used by [Edu Client](https://github.com/codeforcauseorg/edu-client) mobile application.

### Table of Contents
 
- [Tech Stack](#tech-stack)  
- [Setup and Run](#setup-run)  
  - [Setup local repo](#setup-repo)  
  - [Setup Firebase admin SDK](#setup-firebase)  
  - [Setup remote](#setup-remote)  
  - [Run app](#run-app)  
  - [Run test](#run-test) 
- [Contributing](#contributing)   
- [Discord](#discord)   
- [Potential Maintainers](#maintainers) 
- [License](#license)

<a id="tech-stack"></a>
## ⚙️ Tech Stack

* JavaScript/TypeScript
* [NodeJs](https://nodejs.org/en/) 
* [NestJS](https://nestjs.com/)
* [Docker](https://www.docker.com/)

<a id="setup-run"></a>
## 🔨 Setup and Run

<a id="setup-repo"></a>
### Setup local repo
Let's setup the backend server on your local machine.

### 0. Prerequisites
* Install [Node.js](http://nodejs.org)

### 1. Fork repo
Fork this repo to your GitHub account  
![](https://i.ibb.co/bmyFtCg/forkeduserver.png)

### 2. Clone repo
Clone the forked repo to your local machine
```bash
git clone https://github.com/<YOUR-GITHUB-USERNAME>/edu-server.git
```
Navigate to project directory
```bash
cd edu-server
```

### 3. Install Dependencies
```bash
npm install
```

<a id="setup-firebase"></a>
### 4. Setup firebase admin SDK for development

- To use the Firebase Admin SDK in the project, create a new firebase project using [firebase console](https://console.firebase.google.com/).
- After creating a project, go to [project settings](https://console.firebase.google.com/project/_/settings/general/).
- In project settings of your newly created project there will be tab called as "Service Accounts". 
- Click on it, then it will ask to create a service account, click to create a new service account.
- After creating a service account, click on generate new private key it will automatically download a json file.
- Copy the json file from your downloads folder and paste it into the project **src/config** folder and rename it to "service.json"


<a id="setup-remote"></a>
### 5. 📡 Setup remote

0. You will have to set up remote repositories for getting latest changes from original repository
1. Specify a new remote upstream repository that will be synced with the fork using follwoing command :
 ```bash
$ git remote add upstream https://github.com/codeforcauseorg/edu-server.git
```

2. Verify the new upstream repository you've specified for your fork using `git remote -v`
```console

origin  https://github.com/<your-user-name>/edu-server.git (fetch)
origin  https://github.com/<your-user-name>/edu-server.git (push)
upstream        https://github.com/codeforcauseorg/edu-server.git (fetch)
upstream        https://github.com/codeforcauseorg/edu-server.git (push)

```

Your application setup is successfully completed!
<a id="run-app"></a>
### Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# fix linting
$ npm run lint:fix
```

<a id="run-test"></a>
### Running Tests

```bash
# lint tests
$ npm run lint

# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

6). Setting Up mongoDB and nest as databases for the project:-

Step 1 — Download the MongoDB MSI Installer Package
Head over here (https://www.mongodb.com/try/download/community) and download the current version of MongoDB. Make sure you select MSI as the package you want to download.

Step 2 — Install MongoDB with the Installation Wizard
A. Make sure you are logged in as a user with Admin privileges. Then navigate to your downloads folder and double click on the .msi package you just downloaded. This will launch the installation wizard.


B. Click Next to start installation.

C. Accept the licence agreement then click Next.

D. Select the Complete setup.

E. Select “Run service as Network Service user” and make a note of the data directory, we’ll need this later.

F. We won’t need Mongo Compass, so deselect it and click Next.

G. Click Install to begin installation.

F. Hit Finish to complete installation.


Step 3— Create the Data Folders to Store our Databases
A. Navigate to the C Drive on your computer using Explorer and create a new folder called data here.

B. Inside the data folder you just created, create another folder called db.

Step 4 — Setup Alias Shortcuts for Mongo and Mongod
Once installation is complete, we’ll need to set up MongoDB on the local system.
A. Open up your Hyper terminal running Git Bash.
B. Change directory to your home directory with the following command:
cd ~
C. Here, we’re going to create a file called .bash_profile using the following command:
touch .bash_profile
D. Open the newly created .bash_profile with vim using the following command:
vim .bash_profile
E. In vim, hit the I key on the keyboard to enter insert mode.

F. In your explorer go to C → Program Files → MongoDB → Server
Now you should see the version of your MongoDB.

G. Paste in the following code into vim, make sure your replace the 4.0 with your version that you see in explorer
alias mongod="/c/Program\ files/MongoDB/Server/4.0/bin/mongod.exe"
alias mongo="/c/Program\ Files/MongoDB/Server/4.0/bin/mongo.exe"
F. Hit the Escape key on your keyboard to exit the insert mode. Then type
:wq!
to save and exit Vim.

Step 5 — Verify That Setup was Successful
A. Close down the current Hyper terminal and quit the application.
B. Re-launch Hyper.
C. Type the following commands into the Hyper terminal:
mongo --version
Once you’ve hit enter, you should see something like this:



![image](https://user-images.githubusercontent.com/59202075/112122593-749b3600-8be6-11eb-93b2-ca21d7572aee.png)




This means that you have successfully installed and setup MongoDB on your local system!
If you see something that looks like bash mongo command not found, then make sure you check back at all the steps above and follow it step-by-step making sure there are no typos and you haven’t missed any of the steps.

<a id="contributing"></a>
## Contributing

Please read our [Code of Conduct](./CODE_OF_CONDUCT.md) and Reporting Guidelines for [Bug Report](.github/ISSUE_TEMPLATE/bug_report.md) and [Feature Request](.github/ISSUE_TEMPLATE/feature-request.md) 

<a id="discord"></a>
## 💬 Discord
Connect with us on [Discord](https://discord.gg/dydQp2Q).

<a id="maintainers"></a>
## 💻 Potential Maintainers

[Anuj Garg](https://github.com/KeenWarrior)\
[Ganga Chaturvedi](https://github.com/GangaChatrvedi)\
[Kunal Kushwaha](https://github.com/kunal-kushwaha)\
[Abhishek Kumar](https://github.com/Abhishek-kumar09)

  
<a id="license"></a>
## 📜 Licence
This software is open source, licensed under the [MIT License](LICENSE).
