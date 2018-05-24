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
                "2" : "./assets/imgs/2h.png",
                "3" : "./assets/imgs/3h.png",
                "4" : "./assets/imgs/4h.png",
                "5" : "./assets/imgs/5h.png",
                "6" : "./assets/imgs/6h.png",
                "7" : "./assets/imgs/7h.png",
                "8" : "./assets/imgs/8h.png",
                "9" : "./assets/imgs/9h.png",
                "10" : "./assets/imgs/10h.png",
                "J" : "./assets/imgs/Jh.png",
                "Q" : "./assets/imgs/Qh.png",
                "K" : "./assets/imgs/Kh.png",
                "A" : "./assets/imgs/Ah.png",
            },

            player: Math.floor(Math.random()*2 +1),
            playerScore1: 0,
            playerScore2: 0,
            gameMessage: "",
            newGame: false,
            endGame: false,
            resetButtonStyle: {opacity: "0", transition: "all 0.5s ease-out"},
            resetButtonDisabled: "disabled",
        }
    }

    componentDidMount(){
        this.startGame();
    }

    // ======================= Initializing new game state ==================
    startGame= e=>{
        this.generateDeck(100);
        this.initializeScores();
        this.initializeMessage(this.initializePlayer());
        this.resetPlayers();
        this.hideNewGameButton();
    };

    initializePlayer(){
        const player =  Math.floor(Math.random()*2 +1);
        this.setState({player});
        return player;
    }

    initializeScores(){
        this.setState({
            playerScore1 : 0,
            playerScore2: 0,
        });
    }

    initializeMessage(player){
        this.setState({gameMessage : `Start the game: Player ${player}`});
    }
    resetPlayers(){
        this.setState({
            newGame : true,
            endGame: false,
        });
    }
    hideNewGameButton(){
        this.setState({resetButtonStyle : {opacity: "0", transition: "all 0.5s ease-in"}});
        this.setState({resetButtonDisabled: "disabled"});
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

    // ========================== Game logic =====================================
    setTurn = e =>{
        const { player } = this.state;
        if(player===1) {
            this.setState({
                player : 2,
                gameMessage: `Play now: Player 2`
            });
        } else{
            this.setState({
                player : 1,
                gameMessage: `Play now: Player 1`
            });
        }
    };

    getNextCard = e =>{
        const deck = [...this.state.deck];
        const card = deck.pop();
        this.setState({deck, newGame: false});
        return card;
    };

    updateScore= (id, score) =>{
        if(score >= 21){
            this.endGame(id);
        }
        this.setState({[`playerScore${id}`] : score});
        console.log("player ", id, " score: ", score);
    };

    // =======================================================================

    // ========================= GAME END ====================================
    endGame(playerId){
       this.setState({endGame: true,});
       this.showNewGameButton();
       this.endgameMessage(playerId);
    }
    endgameMessage(playerId){
        this.setState({gameMessage : `Player ${playerId} wins! Congratulations!`});
    }
    showNewGameButton(){
        this.setState({resetButtonDisabled: ""});
        this.setState({resetButtonStyle : {opacity: "1", transition: "all 0.5s ease-out"}});
    }
    // =======================================================================

    render(){
        return (
            <section className="board">
                <div className="container">
                    <h1 className="title">Simplified Blackjack</h1>

                    <div className="board-message">
                        {this.state.gameMessage}
                    </div>
                    <div className="board-players">

                        <Player getNextCard={this.getNextCard}
                                nextTurn={this.setTurn}
                                updateScore={this.updateScore}
                                cardValues={this.state.cardValues}
                                heartsBackgrounds={this.state.heartsBackgrounds}
                                id={1}
                                turn={this.state.player}
                                newGame={this.state.newGame}
                                endGame={this.state.endGame}
                        />
                        <Player getNextCard={this.getNextCard}
                                nextTurn={this.setTurn}
                                updateScore={this.updateScore}
                                cardValues={this.state.cardValues}
                                heartsBackgrounds={this.state.heartsBackgrounds}
                                id={2}
                                turn={this.state.player}
                                newGame={this.state.newGame}
                                endGame={this.state.endGame}
                        />
                    </div>
                    <div className="board-reset" style={this.state.resetButtonStyle}>
                        <button className="board-reset-button" disabled={this.state.resetButtonDisabled}
                                onClick={this.startGame}>Start new game</button>
                    </div>
                </div>
            </section>
        );
    }
}

