import React from 'react';

export default class PlayerHistory extends React.Component{
    constructor(props){
        super(props);
    }

    renderCards(){
        let id = 0;
        const cards = this.props.history.map(card => {
            return <img key={id++} src={this.props.deck[card]} alt={`card: ${card}`} className="player-history-card"/>;
        });

        return cards;
    }
    render(){
        return (
            <div className="player-history">
                {this.renderCards()}
            </div>
        );
    }
}

