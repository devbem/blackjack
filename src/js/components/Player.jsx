import React from 'react';

export default class Player extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id : this.props.id,
            score: 0,
            currentCard: "",
            history: [],
            background : "",
        }
    }
    
    getCard = e => {
        let card;
        if(typeof this.props.getNextCard === "function"){
           card = this.props.getNextCard();
        }

        this.setState({currentCard : card});
        const history = [...this.state.history];

        history.push(card);
        this.setState({history});

        const value = this.props.cardValues[`${card}`];
        this.setState({score : this.state.score + value});

        this.updateBackground(`${card}`);
    };

    updateBackground(val){
        this.setState({background : this.props.heartsBackgrounds[val]});
    }

    render(){
        const style = {backgroundSize: "contain", backgroundImage: this.state.background, height: 300, width: 200, backgroundRepeat: "no-repeat"};
        return (
            <div className="player">
                <button onClick={this.getCard}>PLAYER</button>
                <h1>{this.state.currentCard}</h1>
                <div className="player-card" style={style}/>
            </div>
        );
    }
}

