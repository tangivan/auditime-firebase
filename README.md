<p align="center">
  <a href="https://github.com/tangivan/auditime-firebase">
    <img src="public/favicon/android-chrome-512x512.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Auditime</h3>

  <p align="center">
    Audit your time with task timers
  </p>
</p>

<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#firebase-project-setup">Firebase Setup</a></li>
      </ul>
    </li>
  </ol>
</details>

# About The Project
![auditime-demo](https://github.com/tangivan/auditime-firebase/blob/main/src/media/auditime-github-gif.gif)  
[Check out the Live Demo!](https://auditime.one)
<br />
<br />
AudiTime is a web application used to keep track of your time spent in any task. The app is built with React Hooks and uses Firebase for both user authentification and database storage. For users who do not want to create an account, you can start right away with a Guest account and link it to your email if you like it!

Every user account can save their timers and come back to it whenever they want. The data for the timers are stored in a firebase database and can be viewed in the analytics tab. In the analytics tab, you can also see the breakdown of where most of your time spent through react charts.

### Built With
* [React Hooks](https://reactjs.org/docs/hooks-intro.html)
* [React Chart.js 2](https://www.npmjs.com/package/react-chartjs-2)
* [Firebase](https://firebase.google.com/)

# Getting Started
In order to use this project, you will have to create your own firebase project for the api keys at https://console.firebase.google.com/ and then follow the next few steps.

### Installation
1. Create your own firebase project. [Steps to set-up Firebase](#firebase-project-setup)
2. Clone the repo  
    ```
     git clone https://github.com/tangivan/auditime-firebase.git
    ```
3. install npm packages
     ```
     npm install
     ```
4. Create a .env.local file and enter your api keys
    ```
    REACT_APP_FIREBASE_API_KEY='your api key'
    REACT_APP_FIREBASE_AUTH_DOMAIN='your domain'
    REACT_APP_FIREBASE_PROJECT_ID='your project id'
    REACT_APP_FIREBASE_STORAGE_BUCKET='your storage bucket'
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID='your sender id'
    REACT_APP_FIREBASE_APP_ID=1:'your app id'
    ```
5. Use the start command and you're all set! 
     ```
     npm run start
     ```
### Firebase Project Setup
1. Go to https://console.firebase.google.com/
2. Add new Project
3. Choose the 'Add web app' option and register your app name
4. Choose 'use npm' for the Firebase SDK
5. Go to the Authentification tab and choose 'Sign-in method'
6. Enable Email/Password, Google, and Anonymous sign-in methods
7. Go to Firestore Database and click 'Create database'
8. Start in production mode and choose your time-zone
9. Go to the rules tab of the Firestore Database
10. Change the rules to the following:
     ```
     service cloud.firestore {
     match /databases/{database}/documents {
         match /users/{userId}/{documents=**} {
           allow read, write: if isOwner(userId);
         }
       }

       function isOwner(userId) {
         return request.auth.uid == userId;
       }
     }
     ```
11. Click on the settings icon :gear: of Project Overview for Project Settings
12. Scroll down to find your API keys for setting up the project during [Installation](#installation)
