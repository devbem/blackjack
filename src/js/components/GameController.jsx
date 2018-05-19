import React from 'react';
import Player from './Player.jsx';

export default class GameController extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            deck : [],
            cardValues : {
                "2" : 2,
                "3" : 3 ,
                "4" : 4,
                "5" : 5,
                "6" : 6,
                "7" : 7,
                "8" : 8,
                "9" : 9,
                "10" : 10,
                "J" : 10,
                "Q" : 10,
                "K" : 10,
                "A" : 11,
            },
            player: 0,
        }
    }

    componentDidMount(){
        this.startGame();
        //this.getNextCard();
    }

    // ======================= Initializing starting game state ==================
    startGame(){
        this.initializePlayers();
        this.generateDeck(100);
    }

    initializePlayers(){
        let player = Math.floor(Math.random()*2 +1);
        console.log(player);
        this.setState({player});
    }

    generateDeck(count){
        const cards = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
        const deck = [];

        for(let i = 0; i < count; i++){
            let index = Math.floor(Math.random() * 13);
            deck.push(cards[index]);
        }

        console.log(deck);
        this.setState({deck});
    }
    // ===========================================================================

    setTurn = e =>{
        const { player } = this.state;
        player===1? this.setState({player : 2}) : this.setState({player : 1});
    };

    getNextCard = e =>{
        const deck = [...this.state.deck];
        const card = deck.pop();
        this.setState({deck});
        return card;
    };

    render(){
        return (
            <section className="board">
                <h1>Game board</h1>
                <button onClick={this.getNextCard}>KUTAS</button>
                <Player getNextCard={this.getNextCard}
                        cardValues={this.state.cardValues}
                />
            </section>
        );
    }
}

