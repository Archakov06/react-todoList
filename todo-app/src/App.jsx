import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, useHistory } from 'react-router-dom';

import { List, AddList, Tasks } from './components'


function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  let history = useHistory();

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

  const onAddTask = (listId, task) => {
    const newList = lists.map(list => {
      if (list.id === listId) {
        list.tasks = [...list.tasks, task];
      }
      return list;
    });
    setLists(newList);
  }

  const onCheckTask = (listId, taskId) => {
    const newList = lists.map(list => {
      if (list.id === listId) {
        list.tasks.filter(task => {
          if (task.id === taskId) {
            task.completed = !task.completed
            axios.patch('http://localhost:3001/tasks/' + taskId, {
              completed: task.completed
            })
          }
          return task
        })
      }
      return list;
    })
    setLists(newList);
  }

  const onRemoveTask = (listId, taskId) => {
    axios.delete('http://localhost:3001/tasks/' + taskId);
    const newList = lists.map(list => {
      if(list.id === listId) {
        list.tasks = list.tasks.filter(task => task.id !== taskId)
      }
      return list;
    });
    setLists(newList);
  }

  const onEditListTitle = (id, title) => {
    const newList = lists.map(list => {
      if (list.id === id) list.name = title
      return list;
    })
    setLists(newList);
  }

  useEffect(() => {
    const listId = history.location.pathname.split('lists/')[1];
    if (lists) {
      const list = lists.find(list => list.id === Number(listId))
      setActiveItem(list);
    }
  }, [lists, history.location.pathname])

  return (
    <div className='todo'>
      <div className='todo__sidebar'>
        <List 
          onClickItem={list => {
            history.push('/')
          }}
          items={[
            {
              active: true,
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
            setActiveItem(null);
            history.push('/')
          }}
          onClickItem={item => {
            history.push(`/lists/${item.id}`)
          }}
          activeItem={activeItem}
          isRemovable
        />
        <AddList 
          colors={colors}
          onAdd={onAddList}
        />
      </div>
      <div className="todo__tasks">
        <Route exact path="/">
          {
            lists && lists.map(list => <Tasks
              key={list.id} 
              list={list} 
              onEditTitle={onEditListTitle}
              onAddTask={onAddTask}
              onRemove={onRemoveTask}
              onCheck={onCheckTask}
              withoutEmpty
            />)
          }
          
        </Route>
        <Route exact path='/lists/:id'>
          {lists && activeItem && (
            <Tasks 
              list={activeItem} 
              onEditTitle={onEditListTitle}
              onAddTask={onAddTask}
              onRemove={onRemoveTask}
              onCheck={onCheckTask}
            />
          )}
        </Route>
        
      </div>
    </div>  
  );
}

export default App;
