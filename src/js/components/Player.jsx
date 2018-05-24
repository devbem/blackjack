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
            playable: "disabled",
        }
    }
    componentDidMount(){
        this.determineDeck();
    }

    componentWillReceiveProps(nextProps){
        this.determinePlayer(nextProps.turn);
        if(nextProps.newGame===true){
            this.resetPlayer();
        }
        if(nextProps.endGame===true){
            this.endGame();
        }
    }
    getCard = e => {
        let card;
        if(typeof this.props.getNextCard === "function"){
           card = this.props.getNextCard();
        }

        this.setState({currentCard : card});
        this.updateBackground(`${card}`);

        const history = [...this.state.history];
        history.push(card);
        this.setState({history});

        const value = this.props.cardValues[`${card}`];
        const currentScore = this.state.score + value;
        this.setState({score : currentScore});

        if(typeof this.props.nextTurn === "function"){
            this.props.nextTurn();
        }
        if(typeof this.props.updateScore === "function"){
            this.props.updateScore(this.state.id, currentScore);
        }
    };

    //Player id:1 plays with hearts deck, player id:2 plays with spades deck
    determineDeck(){
        if(this.props.id === 1){
            this.setState({deck : this.props.heartsBackgrounds});
        } else if(this.props.id === 2){
           // this.setState({deck : this.props.spadesBackgrounds });
            //TODO: create deck to initialize this
        }
    };

    determinePlayer= turn =>{
        if(turn === this.state.id){
            this.setState({playable : ""});
        }else{
            this.setState({playable : "disabled"});
        }
    };

    endGame(){
        this.setState({playable : "disabled"});
    }
    resetPlayer(){
        this.setState({
            score: 0,
            history: [],
            currentCard: "",
            background: "url('./assets/imgs/card-reverse.png')"
        });
    }

    updateBackground(card){
        this.setState({background : `url(${this.props.heartsBackgrounds[card]})`});
        //TODO: change props.hearts... to this.state.deck, when deck initialized
    };

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
                    <button className="player-draw-button" onClick={this.getCard}
                            disabled={this.state.playable}>
                        Draw a card
                    </button>
                </div>

            </div>
        );
    }
}

