import React, { createContext, useState } from 'react';

export const ToDoContext = createContext();

const ToDoContextProvider = (props) => {
  const [myTaskLists, setMyTaskLists] = useState(() => {
    if (localStorage.myReactTasks) {
      return JSON.parse(localStorage.myReactTasks);
    } return [];
  });

  return (
    <ToDoContext.Provider value={{ myTaskLists, setMyTaskLists }}>
      { props.children }
    </ToDoContext.Provider>
  );
};

export default ToDoContextProvider;
