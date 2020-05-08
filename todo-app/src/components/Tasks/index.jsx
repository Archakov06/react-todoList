import React from 'react'

import editSvg from '../../assets/edit.svg'

import './Tasks.scss'

const Tasks = () => {
    return (
        <div className="tasks">
            <h2 className="tasks__title">
                Фронтенд
                <img width="20px" src={editSvg} alt="edit"/>
            </h2>

            <div className="tasks__items">
                <div className="tasks__items-row">
                    <div className="checkbox">
                        <input type="checkbox" id="check"/>
                        <label htmlFor="check">
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z"/></svg>
                        </label>
                    </div>
                    <input value="ReactJS Hooks"/>
                </div>
            </div>
        </div>
    )
}

export default Tasks
