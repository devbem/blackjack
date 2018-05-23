import React from 'react';
import PlayerHistory from './PlayerHistory.jsx';

export default class Player extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id : this.props.id,
            score: 0,
            currentCard: "",
            history: [],
            background : "",
            deck: "",
        }
    }
    componentDidMount(){
        this.determineDeck();
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

    //Player id:1 plays with hearts deck, player id:2 plays with spades deck
    determineDeck(){
        if(this.props.id === 1){
            this.setState({deck : this.props.heartsBackgrounds});
        } else if(this.props.id === 2){
           // this.setState({deck : this.props.spadesBackgrounds });
            //TODO: create deck to initialize this
        }
    }
    updateBackground(card){
        this.setState({background : `url(${this.props.heartsBackgrounds[card]})`});
        //TODO: change props.hearts... to this.state.deck, when deck initialized
    }

    render(){
        const background = {backgroundImage: this.state.background};
        return (
            <div className="player">
                <h1 className="player-title">Player {this.state.id}</h1>
                <PlayerHistory deck={this.props.heartsBackgrounds}
                               history={this.state.history}
                               score={this.state.score}
                               id={this.state.id}
                />
                <div className="player-card">
                    <div className="card" style={background}/>
                </div>

                <div className="player-draw">
                    <button className="player-draw-button" onClick={this.getCard}>Draw a card</button>
                </div>

            </div>
        );
    }
}

