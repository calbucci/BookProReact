import React, {Component, PropTypes} from 'react';
import { render } from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class AnimatedShoppingList extends Component{
    constructor(){
        super(...arguments);
        
        this.state = {
            items: [ ],
            initialCount: 0
        };
    }
    
    addFromInitial(){
        if(this.state.initialCount >= this.props.items.length)
            return;
            
        var item = this.props.items[this.state.initialCount];
        var newItems = this.state.items.concat(item);
        var newState = { items: newItems, initialCount: this.state.initialCount + 1 };
        this.setState(newState);
        setTimeout(this.addFromInitial.bind(this), 50);
    }
    
    componentDidMount(){
        this.addFromInitial();
        //this.setState({ items: this.props.items, initialCount: 0});
    }
    
    handleChange(evt){
        if(evt.key === 'Enter'){
            let newItem = {id: Date.now(), name: evt.target.value }
            let newItems = this.state.items.concat(newItem);
            
            evt.target.value = '';
            this.setState({items: newItems, initialCount: this.state.initialCount});
        }
    }
    
    handleRemove(i){
        var newItems = [].concat(this.state.items);
        newItems.splice(i, 1);
        this.setState({items: newItems});
    }
    
    
    
    render(){
        let shoppingItems = this.state.items.map( (item, i) => (
           <div key={item.id} className="item"
                onClick={this.handleRemove.bind(this, i)}>
                {item.name}
           </div> 
        ));
        
        return (
            <div>
                <ReactCSSTransitionGroup 
                    transitionName="example"
                    transitionEnterTimeout={300}
                    transitionLeaveTimeout={300}
                    transitionAppear={true}
                    transitionAppearTimeout={300}
                    >
                {shoppingItems}
                </ReactCSSTransitionGroup>
                <input type="text" value={this.state.newItem}
                    onKeyDown={this.handleChange.bind(this)} />
            </div>  
        );
    }
}

let initialItems = [
                {id: 1, name: 'Milk'},
                {id: 2, name: 'Yogurt'},
                {id: 3, name: 'Orange Juice'}
            ];

render(<AnimatedShoppingList items={initialItems}  />, document.getElementById('root'))
 