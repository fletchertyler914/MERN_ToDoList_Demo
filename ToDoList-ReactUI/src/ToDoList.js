
import React from 'react';
import './App.css'

import { ListGroup, ListGroupItem } from 'reactstrap';
import Delete from '@material-ui/icons/DeleteRounded';
import Checkbox from '@material-ui/core/Checkbox';

const ListItem = ({ index, item, onClick, toggleToDoList }) => (
    
    <ListGroupItem className="listGroupItem" key={index}>
        <Checkbox className="checkBox"
            checked={item.status[0] === "complete"}
            onChange={(event) => toggleToDoList(event, item)}
            value={item.status[0]}
            color="#4682b4"/>
        <span className="toDoItem">{item.name} </span>
        <Delete className="deleteButton" onClick={(event) => onClick(event)}>Delete</Delete>
    </ListGroupItem>
);

const Lists = ({ items, onDelete, toggleToDoList }) => (
    <ListGroup>
                {
                    items.map((item, i) => 
                        <ListItem  
                        key={i} 
                        item={item}
                        onClick={(event) => onDelete(event, item._id)}
                        toggleToDoList={(event, item) => toggleToDoList(event, item)}
                        />)
                }
    </ListGroup>
);

export default Lists;

