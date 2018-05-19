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
            heartsBackgrounds : {
                "2" : "url(./assets/imgs/2h.png)",
                "3" : "url(./assets/imgs/3h.png)",
                "4" : "url(./assets/imgs/4h.png)",
                "5" : "url(./assets/imgs/5h.png)",
                "6" : "url(./assets/imgs/6h.png)",
                "7" : "url(./assets/imgs/7h.png)",
                "8" : "url(./assets/imgs/8h.png)",
                "9" : "url(./assets/imgs/9h.png)",
                "10" : "url(./assets/imgs/10h.png)",
                "J" : "url(./assets/imgs/Jh.png)",
                "Q" : "url(./assets/imgs/Qh.png)",
                "K" : "url(./assets/imgs/Kh.png)",
                "A" : "url(./assets/imgs/Ah.png)",
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
                <button onClick={this.getNextCard}>TEST</button>
                <Player getNextCard={this.getNextCard}
                        cardValues={this.state.cardValues}
                        heartsBackgrounds={this.state.heartsBackgrounds}
                />
            </section>
        );
    }
}

