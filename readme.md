# React To Do App

Improved version of my [previous Vanilla JS To Do App](https://github.com/Ruler90/to-do-app-1-js) refactored with React and after some time refactored again (class components -> stateless functional components, context and hooks).

You can think of it as of offline Trello with just basic functions.

## Quick start:

1. Clone this repo and make it your local repo.

2. Use ```npm install``` to install all dependencies listed in package.json.

3. To start webpack-dev-server, use ```npm run start```
To bundle, minify and uglify all js/jsx and css code, use ```npm run build```

4. Create ESLint configuration file (I'm using airbnb styleguide).

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