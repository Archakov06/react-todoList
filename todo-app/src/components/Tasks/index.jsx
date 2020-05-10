import React from 'react'
import axios from 'axios'

import editSvg from '../../assets/edit.svg'
import closeSvg from '../../assets/close.svg'

import './Tasks.scss'

import AddTaskForm from './AddTaskForm'

const Tasks = ({ list, onEditTitle, onAddTask, withoutEmpty, onRemove, onCheck }) => {

    const editTitle = (list) => {
        const newTitle = window.prompt('Название списка', list.name)
        if (newTitle) {
            onEditTitle(list.id, newTitle);
            axios.patch('http://localhost:3001/lists/' + list.id, {
                name: newTitle
            })
        }
    }

        return (
        <div className="tasks">
            <h2 style={{color: list.color.hex}} className="tasks__title">
                {list.name}
                <img onClick={() => editTitle(list)} width="20px" src={editSvg} alt="edit"/>
            </h2>

            <div className="tasks__items">
                {!list.tasks.length && <h2>Задачи отсутствуют</h2> }
                {
                    list.tasks.map(task => (
                        <div key={task.id} className="tasks__items-row">
                            <div className="checkbox">
                                <input readOnly checked={task.completed} onClick={() => onCheck(list.id, task.id)} type="checkbox" id={`task-${task.id}`}/>
                                <label htmlFor={`task-${task.id}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
                                </label>
                            </div>
                            <input readOnly value={task.text}/>
                            <div className="tasks__items-row-actions">
                                <div>
                                    <img 
                                        onClick={() => onRemove(list.id, task.id)}
                                        width='15px'
                                        src={closeSvg} 
                                        alt="Delete task"
                                    />
                                </div>
                            </div>
                        </div>
                    ))
                }
                {!withoutEmpty && <AddTaskForm key={list.id} list={list} onAddTask={onAddTask}/>}
            </div>
        </div>
    )
}

export default Tasks
