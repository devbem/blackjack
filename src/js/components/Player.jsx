import React from 'react';

export default class Player extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id : this.props.id,
            score: 0,
            currentCard: "",
            history: [],

        }
    }
    
    getCard = e => {
       const card = this.props.getNextCard();
       this.setState({currentCard : card});

       const history = [...this.state.history];
       history.push(card);
       this.setState({history});

       const value = this.props.cardValues[`${card}`];
       this.setState({score : this.state.score + value});
    };

    render(){
        return (
            <div className="player">
                <button onClick={this.getCard}>PLAYER</button>
                <h1>{this.state.currentCard}</h1>
            </div>
        );
    }
}

