import React, {Component} from 'react';
import KanbanBoard from './KanbanBoard';
import  'whatwg-fetch';
import update from 'react-addons-update';
import 'babel-polyfill';
import { throttle } from './utils';

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
        
        this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
        this.updateCardPosition = throttle(this.updateCardPosition.bind(this), 500); 
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
    
    updateCardStatus(cardId, listId){
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
        let card = this.state.cards[cardIndex];
        console.log('ucs: card.status = ' + card.status + ' / listId = ' + listId);
        if(card.status !== listId){
            this.setState(update(this.state, {
                cards: { [cardIndex]:
                {
                    status: {$set: listId}
                }}
            }));
        }
    }
    
    updateCardPosition(cardId, afterId){
        if(cardId !== afterId){
            let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
            let card = this.state.cards[cardIndex];
            let afterIndex = this.state.cards.findIndex((card) => card.id === afterId);
            this.setState(update(this.state, {
                cards: {
                    $splice: [
                        [cardIndex, 1],
                        [afterIndex, 0, card]
                    ]
                }
            }));
        }
    }
    
    persistCardDrag(cardId, status){
        let cardIndex = this.state.cards.findIndex((card) => card.id === cardId);
        let card = this.state.cards[cardIndex];
        fetch(`${API_URL}/cards/${cardId}`, {
            method: 'PUT',
            headers: API_HEADERS,
            body: JSON.stringify({status: card.status, row_order_position: cardIndex})
        })
        .then((response) => {
            if(!response.ok){
                throw new Error('Server resonse wasn\'t OK');
            }
        })
        .catch((error) => {
            console.error('Fetch error', error);
            this.setState(
                update(this.state, {
                    cards: {
                        [cardIndex]:{
                            status: {$set: status}
                        }
                    }
                })
            ); 
        });
    }
    
    render(){
        return (
            <KanbanBoard cards={this.state.cards}
                tasksCallbacks={{
                    toggle: this.toggleTask.bind(this),
                    delete: this.deleteTask.bind(this),
                    add: this.addTask.bind(this)
                }}
                cardCallbacks = {{
                    updateStatus: this.updateCardStatus,
                    updatePosition: this.updateCardPosition,
                    persistCardDrag: this.persistCardDrag.bind(this)
                }}
         />);
    }
}

export default KanbanBoardContainer;