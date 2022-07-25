# Todo lis App

A simple todo list app with basic features like add task, delete task and fetch the list and edit particular field. Once created an account, they will be able to add tasks in todo page. The web has built with MERN full stack and it has been deployed with Heroku.

## DEMO

https://todo-appmern.herokuapp.com/

## FEATURES

1. Register, Login and changepassword. The system validates the inputs. Todo page is only accessible for users who have registered and logged in.
2. Add Task . Added task can be edited and deleted
3. View task list . Filter and sort them too.

## TECH

Technologies used: MongoDB, HTML, CSS, Reactjs, JavaScript, Nodejs, MUI

## GETTING STARTED

The application stores all the data in MongoDB database, so creating MongoDB cluster is required for running the project locally.

1. Go to the root folder ```cd mern-todo-app```
2. ```npm install```
3. Create your environment variables in .env file

```
PORT=8080
MONGO_URI=<YOUR_MONGODB_URI_TO_CONNECT_YOUR_APPLICATION>
NODE_ENV=production
```
4. Go to the client folder ```cd client``` run the following command

```
npm install
npm run build
```

5. Run the application from root folder (mern-todo-app)

``` npm start ```

Your application will be running in ```localhost:8080```
