# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

This will help you install all the dependencies you need for the project

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run deploy`

With the help of this command, your variables that you saved in the "master" will be sent to deploy

DESCRIPTION

Authentication
For user authentication, a local browser storage is utilized. User data is automatically deleted upon logout to avoid cluttering the local storage.

Recipe Data
All recipe data is hardcoded in the "recipeData.ts" file. Users can add recipes to their favorites and create their own recipes.

Recipe Editing
Users can only edit their own recipes. This restriction is implemented to maintain logical consistency and data integrity.

Search Functionality
The project includes search functionality in the main recipe list as well as in the user's favorites list.

Favorite Recipes
In the favorites section, users have the option to hide or show the recipes they have added or favorited.

Please feel free to explore the project and enjoy using it!
