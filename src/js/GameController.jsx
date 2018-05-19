import React from 'react';
import { render } from 'react-dom';
import GameBoard from './components/GameBoard.jsx';


class GameController extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            deck : [],
            player: 0,
        }
    }

    componentDidMount(){
        this.startGame();
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

    startGame(){
        this.initializePlayers();
        this.generateDeck(100);
    }

    setTurn = e =>{
        const { player } = this.state;
        player===1? this.setState({player : 2}) : this.setState({player : 1});
    };

    render(){
        return (
            <div>
                <GameBoard/>
            </div>
        );
    }
}


document.addEventListener("DOMContentLoaded", function(){
    render(<GameController/>, document.getElementById('app'));
});