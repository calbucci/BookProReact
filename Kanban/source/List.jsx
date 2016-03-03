import React, {Component, PropTypes} from "react";
import Card from "./Card";

class List extends Component{
    render(){
        var cards = this.props.cards.map((card) => {
           return <Card key={card.id}
                        {...card}
                        tasksCallbacks={this.props.tasksCallbacks} 
                        /> 
        });
        
        return (
          <div className="list">
            <h1>{this.props.title}</h1>
            {cards}
          </div>  
        );
    }
}

List.propTypes = {
    title: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(PropTypes.object),
    tasksCallbacks: PropTypes.object,    
};

export default List;