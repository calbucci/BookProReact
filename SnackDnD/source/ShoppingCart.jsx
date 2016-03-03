import React, {PropTypes, Component} from 'react';
import { DropTarget } from 'react-dnd';

const ShoppingCartSpec = {
    drop(){
        return {name: 'ShoppingCart' };
    }
};

let collect = (connect, monitor ) =>{
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
};


class ShoppingCart extends Component{
    render(){
        const {canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;
        
        let backgroundColor = '#ffffff';
        if(isActive)
            backgroundColor = '#f7f7bd';
        else if(canDrop)
            backgroundColor = '#f7f7f7';
        
        const style={
            backgroundColor: backgroundColor
        };
        
        return connectDropTarget(
            <div className="shopping-cart" style={style}>
                {isActive?"Hummmmm, snack!":"Drag here to order"}
            </div>              
        );
    }
}

ShoppingCart.propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired
};

export default DropTarget("snack", ShoppingCartSpec, collect)(ShoppingCart);
