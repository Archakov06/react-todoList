import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { List, Badge } from '../'

import closeSvg from '../../assets/close.svg';

import "./AddList.scss";

const AddList = ({ colors, onAdd }) => {
    const [state, setState] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    

    useEffect(() => {
        if(colors !== null) {
            setSelectedColor(colors[0].id);
        }
    }, [colors])

    const onClose = () => {
        setState(false);
        setInputValue('');
        setSelectedColor(colors[0].id)
    }

    const addList = () => {
        if (!inputValue) {
            alert('Empty name')
            return;
        }
        setIsLoading(true)
        axios.post('http://localhost:3001/lists', {
                name: inputValue, 
                colorId: selectedColor
        }).then(({ data }) => {
            const color = colors.filter(c => c.id === selectedColor)[0].name
            const listObj = {...data, color: {name: color}}
            onAdd(listObj);
            onClose();
        }).finally(() => {
            setIsLoading(false);
        })
    }

    return (
        <div className="add-list">
            <List
                onClick={() => setState(true)}
                items={[
                    {
                        className: "list__add-button",
                        icon: <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" /></svg>,
                        name: "Добавить список"
                    },
                ]}
            />
            {state && <div className="add-list__popup">
                <img 
                    src={closeSvg} 
                    alt="close btn" 
                    className="add-list__popup-close-btn"
                    onClick={onClose}
                />

                <input 
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    type="text" 
                    placeholder="Название списка" 
                    className="field"
                />
                
                <div className="add-list__popup-colors">
                    {colors.map(color => (
                        <Badge 
                            onClick={() => setSelectedColor(color.id)} 
                            key={color.id} 
                            color={color.name}
                            className={selectedColor === color.id && 'active'}
                        />
                    ))}
                </div>
                <button onClick={addList} className="button">{!isLoading ? 'Добавить' : 'Добавляется...'}</button>
            </div>}
        </div>
    );
}

export default AddList