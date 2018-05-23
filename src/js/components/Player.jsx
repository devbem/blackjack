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
        const style = {backgroundSize: "contain", backgroundImage: this.state.background, height: 300, width: 200, backgroundRepeat: "no-repeat"};
        return (
            <div className="player">
                <button onClick={this.getCard}>PLAYER</button>
                <PlayerHistory deck={this.props.heartsBackgrounds}
                               history={this.state.history}
                />
                <h1>{this.state.currentCard}</h1>
                <div className="player-card" style={style}/>
            </div>
        );
    }
}

