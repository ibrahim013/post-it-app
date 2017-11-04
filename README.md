[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen.svg)](https://choosealicense.com/licenses/mit/)
[![Build Status](https://travis-ci.org/ibrahim013/post-it-app.svg?branch=feedback)](https://travis-ci.org/ibrahim013/post-it-app)
[![Coverage Status](https://coveralls.io/repos/github/ibrahim013/post-it-app/badge.svg?branch=feedback)](https://coveralls.io/github/ibrahim013/post-it-app?branch=feedback)

<h1>Project Title</h1>

PostIt is a simple application that allows friends and colleagues create groups for notifications. This way one person can post notifications to everyone by sending a message once. The application allows people create accounts, create groups and add registered users to the groups, and then send messages out to these groups whenever they want.
Hosted version can be found [Here](https://post-it-app.herokuapp.com/)

These application provieds a RestApi Endpoint [Api Documentation](https://github.com/ibrahim013/post-it-app/blob/developmain/server/Readme.md)

<h1>Built With</h1>
This application is in two parts, server(API)and client(reactjs). The backend(API) was developed using NodeJs with express for routing. firebase was used for data persistency. The frontend was built using reactJs with redux framework.

[Node js](https://nodejs.org) , [Express](https://expressjs.com/), [Firebase](https://firebase.google.com/)
 

<h1>API FEATURES</h1>

PostIt has the following API features:

<h2>Authentication</h2>
All Authentication are handled using firebase/ goole oAuth.

<h2>Users</h2>

It allows user to create account
It allows user to login
It allows user to signup and login using google account
It allows user to create groups and post messages to the created groups

<h2>Groups</h2>

Groups can be created by users to share messages
Members can be added to group.
Only unique groups can be created
user are allowed to be added only once

<h2>Messages</h2>

Messages are posted based on priority levels, that is: Critical, Urgent and Normal
SMS and email notification is sent to group members for Critical messages
Email notification is sent to group members for Urgent messages
In-app notification is sent to group members for Normal messages
Only the members of a group can post message into a group
users who already viewed message can be seen 

<h1>Installation</h1>

```
1. Clone the repo https://github.com/ibrahim013/post-it-app.git

2. Move into local directory cd post-it-app-2 

3. Run npm install on terminal to Install all project dependencies

4. Visit [Firebase](https://console.firebase.google.com) Console to add a new project

5. Create a .env file and set the variables in the env-sample to your specified database connection

6. Run npm start to stat up server 

7. Then visit http://localhost:3000 to view the app.

8. To run server test npm test

9. To run client test npm run testClient

```
Testing using Postman

Here is the various endpoint 

| Endpoint | Functions | Payload | Request Mode 
| --- | --- | --- | --- |
| `api/v1/signup` | it allows user create an account | username, phonenumber, email, password | POST 
| `api/v1/signin` | it allow user sign into the account | email, password | POST 
| `api/v1/signout` | it allow  users sign out from there account | No payload | GET |
| `api/v1/passwordreset` | it allow user to be able to reset ther password | email | POST |
| `api/v1/group` | it allow user create groups | group name, group description | POST |
| `api/v1/group/groups` | it allows users get all groups they belong | No Payload | GET
| `api/v1/group/addmember` | it allows user add members to group | groupname,username | POST 
| `api/v1/postmessage` | allow user post message to group they belong to | groupname | POST
| `api/v1/group/:groupid/messages` | get all message under a perticuler group | :groupId | GET
| `api/v1/:groupid/members` | it get all the members of a group | :groupId | GET |



<h1>Limitations</h1><br/>

 - Group creator cannot remove users from groups
 - Users cannot update their profile
 - Users cannot deactivate their accounts
 - Users cannot add image to there account avater


<h1>Coding Style</h1>

 - Airbnb: Airbnb is a coding style guide that guides the development of this app

<h1>How to Contribute</h1>

 - Fork this repository.
 - Clone it.
 - Create your feature branch on your local machine with `git checkout -b your-feature-branch`
 - Push your changes to your remote branch with `git push origin your-feature-branch`
 - Open a `pull request` to the master branch, and describe how your feature works
Refer to this wiki for proper [GIT CONVENTION](https://github.com/ibrahim013/post-it-app/wiki)
Ensure your codes follow [AirBnB Javascript Styles Guide](https://github.com/airbnb/javascript)

<h2>License</h2>

This project is coverd by [MIT](https://choosealicense.com/licenses/mit) license

<h1>Faqs</h1>

```Not available at the moment```

<h1>Authors</h1>

Ibrahim Abdulazeez - Initial work

<h1>Acknowledgments</h1>

Andelans<br/>
Friends<br/>
Leaning Facilitator<br/>
Family
