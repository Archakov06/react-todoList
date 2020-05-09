import React, { useState } from 'react'
import axios from 'axios'

const AddTaskForm = ({ list, onAddTask }) => {

    const [formVisible, setFormVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');


    const toggleFormVisible = () => {
        setFormVisible(!formVisible);
        setInputValue('');
    }

    const addTask = () => {
        const obj = {
            listId: list.id,
            text: inputValue,
            completed: false
        }

        axios.post('http://localhost:3001/tasks/', obj).then(({ data }) => {
            obj.id = data.id
            onAddTask(list.id, obj);
            toggleFormVisible()
        });
    }

    return (
        <div className="tasks__form">
            {!formVisible
            ? 
            <div className="tasks__form-new" onClick={toggleFormVisible}>
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" /></svg>
                <span>Новая задача</span>
            </div>
            :
            <div className="tasks__form-block">
                <input 
                    type="text" 
                    placeholder="Текст задачи" 
                    className="field"
                    onChange={e => setInputValue(e.target.value)}
                />
                <button onClick={addTask} className="button" >Добавить задачу</button>
                <button onClick={toggleFormVisible} className="button button--grey">Отмена</button>
            </div>
            }
        </div>
    )
}

export default AddTaskForm
