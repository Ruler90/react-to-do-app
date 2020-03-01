import React, { useContext } from 'react';
import { ToDoContext } from '../../contexts/ToDoContext';
import List from '../list/List';

const ToDoLists = () => {
  const { myTaskLists } = useContext(ToDoContext);


  const taskLists = myTaskLists.map(list => (
    <List { ...list } key={list.listId} />
  ));
  return (
    taskLists
  );
};

export default ToDoLists;
