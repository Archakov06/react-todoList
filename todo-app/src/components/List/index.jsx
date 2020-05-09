import React from 'react';
import classNames from 'classnames';
import axios from 'axios'

import removeSvg from '../../assets/close.svg';

import Badge from '../Badge'

import "./List.scss";

const List = ({ items, isRemovable, onClickItem, onClick, onRemove, activeItem }) => {

    const removeList = (item) => {
        if(window.confirm('Are u sure?')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id)
            })
        }
    }

    return (
        <ul onClick={onClick} className="list">
            { items !== null &&
                items.map((item, index) => (
                    <li 
                        key={index} 
                        className={classNames(item.className, {
                            active: activeItem && activeItem.id === item.id})}
                        onClick={onClickItem ? () => onClickItem(item) : null}
                    >
                        <i>{item.icon ? item.icon : <Badge color={item.color.name}/> }</i>
                        <span>
                            {item.name}
                            {item.tasks && item.tasks.length > 0 && ` (${item.tasks.length})`}
                        </span>
                        {isRemovable && (
                        <img 
                            className="list__remove-icon"
                            width='10px' 
                            src={removeSvg} 
                            alt="bruh"
                            onClick={() => removeList(item)}
                        />)}
                    </li>
                ))
            }
        </ul>
    );
}

export default List;