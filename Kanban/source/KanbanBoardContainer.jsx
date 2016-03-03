import React, {Component} from 'react';
import KanbanBoard from './KanbanBoard';
import  'whatwg-fetch';
import update from 'react-addons-update';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': 'marcelo@calbucci.com'
};

class KanbanBoardContainer extends Component{
    constructor(){
        super(...arguments);
        this.state = {
            cards:[]
        };        
    }
    componentDidMount(){
        fetch(API_URL + '/cards', {headers: API_HEADERS})
        .then((response) => response.json())
        .then((responseData) => {
            this.setState({cards: responseData});
            window.state = this.state;
        })
        .catch((error) => {
            console.log('Error fetching and parsing data', error);
        });
    }
    
    addTask(cardId, taskName){
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
        let newTask = {id:Date.now(), name:taskName, done: false};
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {$push: [newTask]}
            }
        });
        
        this.setState({cards: nextState});
        
        fetch(`${API_URL}/cards/${cardId}/tasks`, {
            method: 'POST',
            headers: API_HEADERS,
            body: JSON.stringify(newTask)
        })
        .then((response) => {
            if(response.ok)
            {
                return response.json();    
            }
            else
            {
                throw new Error("Server response wasn't OK");
            }
        })
        .then((respondeData) => {
            newTask.id = responseData.id;
            // This looks like a bug to me. In theory, you shouldn't
            // call setState with the same object twice, if it has changed
            this.setState({cards: nextState});
        })
        .catch((error) => {
            this.setState(prevState); 
        });
        
    }
    deleteTask(cardId, taskId, taskIndex){
        console.log('Delete task');
        let cardIndex = this.state.cards.findIndex(
            (card) => card.id === cardId
        );
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {$splice: [[taskIndex, 1]]}
            }
        });
        
        this.setState({cards: nextState});
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'DELETE',
            headers: API_HEADERS
        });
    }
    toggleTask(cardId, taskId, taskIndex){
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
        let newDoneValue;
        let nextState = update(this.state.cards,{
            [cardIndex]: {
                tasks: {
                    [taskIndex]: {
                        done: {$apply: (done) => {
                            newDoneValue = !done;
                            return newDoneValue;
                        }}
                    }
                }
            }
        });
        
        this.setState({cards: nextState});
        
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'PUT',
            headers: API_HEADERS,
            body: JSON.stringify({done: newDoneValue})
        });
    }
    
    render(){
        return (<KanbanBoard cards={this.state.cards}
            tasksCallbacks={{
                toggle: this.toggleTask.bind(this),
                delete: this.deleteTask.bind(this),
                add: this.addTask.bind(this)
            }}
         />);
    }
}

export default KanbanBoardContainer;