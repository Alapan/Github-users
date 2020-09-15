This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Description

The project displays a paginated list of all Github users. Each user's avatar and username is shown. When the avatar/username is clicked, the viewer is taken to second view where further details of the user such as number of followers, number following etc. A back button is provided in this second view, which serves the same purpose as the browser back button.

### Libraries used

#### React-router

This is a single-page application, and react-router has been used to navigate between the users' list and user view. In the user view, the username from the URL is used to fetch user details upon initial rendering of the User component. Refreshing the user view should render the same details.

#### Redux

The current page and number of items per page is being saved in an application-level 'global' state using Redux. The benefit of this is - if the user has selected 50 items per page, and selects a user from page 4, clicking the back button takes the user back to page 4 with 50 items per page, not the default page 1 with 30 per page.

#### Material UI

Used to render the UI components like select, table, button.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run lint`

TSLint for static code analysis.

### `npm run prettier`

Look for places to improve code formatting.

### `npm run prettier:fix`

Improve code formatting with Prettier.
