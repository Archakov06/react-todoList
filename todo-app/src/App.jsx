import React, { useState, useEffect } from 'react';
import axios from 'axios'

import { List, AddList, Tasks } from './components'


function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks').then(({ data }) => {
      setLists(data);
    });
    axios.get('http://localhost:3001/colors').then(({ data }) => {
      setColors(data);
    });
    
  }, []);

const onAddList = (obj) => {
  const newList = [
    ...lists,
    obj
  ];
  setLists(newList)
}

  return (
    <div className='todo'>
      <div className='todo__sidebar'>
        <List items={[
          {
            icon: (<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="list" className="svg-inline--fa fa-list fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M80 368H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm0-320H16A16 16 0 0 0 0 64v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16zm0 160H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm416 176H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path></svg>
            ),
            name: "Все задачи"
          },
        ]}
        />
        <List 
          items={lists}
          onRemove={id => {
            const newLists = lists.filter(item => item.id !== id);
            setLists(newLists);
          }}
          isRemovable
        />
        <AddList 
          colors={colors}
          onAdd={onAddList}  
        />
      </div>
      <div className="todo__tasks">
        <Tasks />
      </div>
    </div>  
  );
}

export default App;
