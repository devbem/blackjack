import React from 'react';

export default class Player extends React.Component{
    constructor(props){
        super(props);
    }
    
    getCard = e => {
       const h = this.props.getNextCard();
       console.log(h);
       const value = this.props.cardValues[`${h}`];
       console.log(value);
    };

    render(){
        return (
            <div className="player">
                <button onClick={this.getCard}>PLAYER</button>
            </div>
        );
    }
}

