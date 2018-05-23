import React from 'react';

export default class PlayerHistory extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            flexDirection: {},
            scorePosition: {},
        }
    }

    componentDidMount(){
        this.setFlexDirection();
    }
    renderCards(){
        let id = 0;
        const cards = this.props.history.map(card => {
            return <img key={id++} src={this.props.deck[card]} alt={`card: ${card}`} className="player-history-card"/>;
        });

        return cards;
    }

    setFlexDirection(){
        if(this.props.id===1){
            this.setState({flexDirection : {flexDirection: "row-reverse", paddingRight: "110px"}});
            this.setState({scorePosition : {right: "0"}});
        }else if(this.props.id===2){
            this.setState({flexDirection : {flexDirection: "row", paddingLeft: "110px"}});
            this.setState({scorePosition : {left: "0"}});
        }
    }

    render(){
        return (
            <div className="player-history" style={this.state.flexDirection}>
                <div className="player-history-score" style={this.state.scorePosition}>
                    COUNT <span>{this.props.score}</span>
                </div>
                {this.renderCards()}
            </div>
        );
    }
}

