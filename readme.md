# React To Do App

Improved version of my [previous Vanilla JS To Do App](https://github.com/Ruler90/to-do-app-1-js) refactored with React and after some time refactored again (class components -> stateless functional components, context and hooks).

You can think of it as of offline Trello with just basic functions.

**Update 2021-01-30**
- Removed all dependencies so ```npm install``` will only install React. If you install everything as described below, you'll get most recent version of every dependency. I didn't work on this project for a few months and I received alerts of potential security vulnerabilities that occur in dependencies. Some of them couldn't be resolved by dependabot due the fact that some dependencies needed to be installed in newer version.
- Major webpack config update. Newer version of webpack (5.x.x), webpack-cli and webpack-dev-server didnt' work with my previous config. Also added html-webpack-plugin.
- Added last working dependencies list at the end of readme.
- **Important:** there were some changes in React 17 related to event handlers. I installed React 17 but I found out that not everything works. E.g. when user edits task description and clicks anywhere, it should trigger onblur event and change some class on that item. With React 17 it didn't work that way, so I installed previously used version: 16.12.0.

## Quick start:

1. Clone this repo and make it your local repo.

2. Use ```npm i``` to install React.

3. Install other dependencies
- **Webpack:**
    ```
    npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin@next
    ```
- **Babel and loaders:**
    ```
    npm install --save-dev @babel/cli @babel/core @babel/plugin-proposal-class-properties @babel/plugin-transform-runtime @babel/preset-env @babel/preset-react babel-loader css-loader style-loader
    ```
- **ESLint:**
    ```
    npm install --save-dev eslint eslint-config-airbnb eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks babel-eslint
    ```

4. Use my ESLint config (airbnb) or delete it and create new one.

5. You are ready to go.

6. To start webpack-dev-server, use ```npm run start```.  
To bundle, minify and uglify all js/jsx and css code, use ```npm run build```.

## Features:

0. You can check it out as a [Chrome Extension](https://chrome.google.com/webstore/detail/to-do-app/khekhpfpmeododajpdckhknoaeibcicf).

1. Choose date and add list.
2. Use one of the buttons to create task on the list - first button creates task as the first task on the list and the second button as the last task on the list.
3. You can change list's name by clicking on it, typying new name and saving it by clicking anywhere or by hitting enter.
4. If you want to delete list, you have to confirm that action.
5. You can change task's state (color) to 'prio' (red) and 'in progress' (yellow).
6. You can change task's name the same way you do this for list's name.
7. You can drag and drop tasks and lists to change their order. You can drag and drop tasks between lists.
8. If you'll have more lists, you'll see horizontal scrollbar. You can use drag for faster scrolling.
9. If you'll have more tasks on one list, you'll see vertical scrollbar.
10. Every change is saved in local storage, so you'll keep your lists and task between window reloads and browsers restarts.
11. You can save your lists and tasks to .json file.
12. You can load that file to restore your lists and tasks. After successful load, make any change on any list or task to save everything to local storage.

### Last working dependencies list (2021-01-30):

```json
"devDependencies": {
   "@babel/cli": "^7.12.10",
    "@babel/core": "^7.12.10",
    "@babel/plugin-proposal-class-properties": "^7.12.1",
    "@babel/plugin-transform-runtime": "^7.12.10",
    "@babel/preset-env": "^7.12.11",
    "@babel/preset-react": "^7.12.10",
    "babel-eslint": "^10.1.0",
    "babel-loader": "^8.2.2",
    "css-loader": "^5.0.1",
    "eslint": "^7.18.0",
    "eslint-config-airbnb": "^18.2.1",
    "eslint-plugin-import": "^2.22.1",
    "eslint-plugin-jsx-a11y": "^6.4.1",
    "eslint-plugin-react": "^7.22.0",
    "eslint-plugin-react-hooks": "^4.2.0",
    "html-webpack-plugin": "^5.0.0-beta.6",
    "style-loader": "^2.0.0",
    "webpack": "^5.18.0",
    "webpack-cli": "^4.4.0",
    "webpack-dev-server": "^3.11.2"
  },
"dependencies": {
    "react": "^16.12.0",
    "react-dom": "^16.12.0"
  }
```