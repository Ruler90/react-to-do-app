import React, { useContext } from 'react';
import { ToDoContext } from '../../contexts/ToDoContext';
import './scss/MainControls.css';

const MainControls = () => {
  const { myTaskLists, setMyTaskLists } = useContext(ToDoContext);

  const addList = () => {
    const dateInput = document.querySelector('#chooseDate').value;
    const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    if (dateInput !== '' && dateInput !== undefined) {
      const realDate = new Date(dateInput);
      const list = {
        listId: new Date().getTime(),
        listName: dateInput + ' (' + dayName[realDate.getDay()] + ')',
        listClasses: ['ToDoList__nameBar'],
        isListDragged: false,
        isListDraggedOver: false,
        tasks: [],
      };
      const newListsArray = [...myTaskLists, list];
      setMyTaskLists(newListsArray);
      localStorage.setItem('myReactTasks', (JSON.stringify(newListsArray)));
    }
  };

  const tasksBackup = () => {
    const allTasks = JSON.stringify(myTaskLists);
    const blob = new Blob([allTasks], { type: 'application/json;charset=utf-8' });
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(blob);
    downloadLink.download = 'tasksBackup.json';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href);
    document.body.removeChild(downloadLink);
  };

  const loadFromFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onloadend = () => {
      setMyTaskLists(JSON.parse(reader.result));
      // 2 lines below are needed to clear file from input in case you want to load the same file again without page reload
      const loadFromFileBtn = document.querySelector('#fileInput');
      loadFromFileBtn.value = '';
    };
    reader.onerror = function () {
      alert('Couldn\'t load the file');
    };
  };

  return (
    <div className="mainControls">
      <input type="date" id="chooseDate" />
      <input type="button" className="mainButton addListBtn" value="Add list" onClick={addList} />
      <input type="button" className="mainButton saveToFileBtn" value="Save to file" onClick={tasksBackup} />
      <input type="file" name="getFile" id="fileInput" accept="application/json" onChange={loadFromFile} />
      <button type="button" tabIndex="-1" className="mainButton loadFromFileBtn"><label htmlFor="fileInput">Load file</label></button>
    </div>
  );
};

export default MainControls;
