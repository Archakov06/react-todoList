import React, { useState } from 'react';
import List from '../List';

import Badge from '../Badge'

import "./AddList.scss";

const AddList = ({ colors }) => {
    const [state, setState] = useState(false);
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
                isRemovable
            />
            {state && <div className="add-list__popup">
                <input type="text" placeholder="Название списка" className="field"/>
                <div className="add-list__popup-colors">
                    {
                        colors.map(color => <Badge key={color.id} color={color.name}/>)
                    }
                </div>
                <button className="button">Добавить</button>
            </div>}
        </div>
    );
}

export default AddList