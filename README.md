# eduNow
###### This is a part of a larger platform intended for people studying web development. The purpose of this codebase is to build an environment where students and companies interested in future developers can search for each other and interact.

## Starting the app
In all cases you will need to have these things installed on your computer:
Node.js
NPM
MongoDB
Since this app uses MongoDB, you will need to know the basics of how to run that.

##### For viewing purposes only
1. Fork the repository
2. Navigate to the root-folder of the project in your command-line.
3. Type in "npm install --production". This will install dependencies.
4. Type in "npm start". This will start the express-server.
5. Navigate to "localhost:3000" in your browser.

##### For editing purposes
Follow steps 1 and 2 in previous instructions then:
1. Type in "npm install". This will install all dependencies, including devDependencies.
2. In one cli-window/tab type in "npm run dev", this will start the webpack-dev-server enabling automatic bundling of js- and scss-files in the app-folder on save. Also automatically updates in your browser.
3. In second cli-window/tab type in "npm start". This will start the express-server.
4. Navigate to "localhost:8080" in your browser.

##### Adding users
Without users this code does very little. So add some!
In the src-folder there is a file named "seed.js". This contains data for a number of students. To load these students in to your database you only need to do one thing. Before starting your server with "npm start". Open the "server.js" file located in the root folder and uncomment this line:
```javascript
// require('./src/seed');
```
