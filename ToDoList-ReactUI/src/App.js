import React, { Component } from 'react';
import './App.css';
import Lists from './ToDoList';
import ApiWrapper from './ApiWrapper';

import Input from '@material-ui/core/Input';
import { Button } from 'reactstrap';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      items: []
    };
    this.api = new ApiWrapper();
  }

  // Automatically Fetch ToDo List On Component Load
  componentDidMount(){
    this.fetchToDoList();
  }

  // Watch Input Value For ToDo Item
  onChange = (event) => {
    this.setState({ term: event.target.value });
  }

  // Push ToDo Item To The DB
  onSubmit = (event) => {
    event.preventDefault();
    this.api.createToDoListItem(this.state.term)
    .then((response) => {
      // Refresh ToDo List State
      console.log('Create Item Response', response)
      this.fetchToDoList();
    });
  }

  // Delete A ToDo Item Form The DB
  onDelete = (event, itemToDelete) => {
    event.preventDefault();

    this.api.deleteToDoListItem(itemToDelete)
    .then((response) => {
      // Refresh ToDo List State
      console.log('Delete Item Response: ', response)
      this.fetchToDoList();
    });
  }

  // Fetch All ToDo Items
  fetchToDoList() {
    console.log('callback')
    const getItems = this.api.fetchToDoList();
    getItems.then((items) => {
      console.log(items);
      this.setState({
        term: '',
        items: [...items]
      })
    }
    )
    .catch(function (err) {
        // API call failed...
        console.log(err);
    });
  }
  
  toggleToDoItem = (event, item) => {
    // Prevent Event Defaults
    event.preventDefault();

    let 
        api = new ApiWrapper(), 
        response = null;

    switch(item.status[0]){
        case "complete":
            response = api.toggleToDoListItem(item._id, "pending");
        break;
        case "pending":
            response = api.toggleToDoListItem(item._id, "complete");
        break;
        default:
            console.log('Something Funny Happened...');
        break;
    }

    response.then((response) => {
        console.log('Complete ToDo:', response)
        this.fetchToDoList();
    });
}

  render() {
    return (
      <div className="App">
      <h3 className="header">My ToDo List:</h3>
        <form onSubmit={this.onSubmit} className="form">
          <Input
            autoFocus={true}
            placeholder="Get Almond Milk..."
            value={this.state.term} 
            onChange={this.onChange} 
            className="toDoInput"/>
          <br/>
          <Button className="submitButton" variant="contained" color="inherit">
            Add ToDo Item
          </Button>
        </form>
        <div className="listContainer">
          <Lists 
          items={this.state.items} 
          onDelete={(event, item) => this.onDelete(event, item)}
          toggleToDoList={(event, item) => this.toggleToDoItem(event, item)}/>
        </div>
      </div>
    );
  }
}

export default App;
