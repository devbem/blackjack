import React from 'react';
import { render } from 'react-dom';
import GameController from './components/GameController.jsx';


class App extends React.Component{
    constructor(props){
        super(props);
    }



    render(){
        return (
            <div className="main-background">
                <GameController/>
            </div>
        );
    }
}


document.addEventListener("DOMContentLoaded", function(){
    render(<App/>, document.getElementById('app'));
});