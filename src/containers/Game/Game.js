import React, { Component } from "react";
import axios from "axios";
import Cards from "../../components/Cards/Cards";
import Controls from "../../components/Controls/Controls";
import Result from "../../components/Result/Result";

import classes from "./Game.module.css";

class Game extends Component {
  state = {
    deckId: null,
    cards: [],
    newGame: false,
    result: null
  };

  componentDidMount() {
    this.getNewDeckHandler();
  }

  getNewDeckHandler = () => {
    this.setState({cards: [], result: null});
    axios
      .get("https://deckofcardsapi.com/api/deck/new/shuffle/")
      .then(response => {
        this.setState({ deckId: response.data.deck_id, newGame: false });
        this.drawCardHandler(response.data.deck_id);
      })
      .catch(error => {
        console.log("error: " + error);
      });
  };

  drawCardHandler = (deckId, direction) => {
    axios
      .get("https://deckofcardsapi.com/api/deck/" + deckId + "/draw/", {
        params: {
          count: 1
        }
      })
      .then(response => {
        const cardArr = [...this.state.cards];
        cardArr.push(response.data.cards);
        if (cardArr.length > 1) {
          this.checkIfWinnerHandler(response.data.cards, direction);
        }
        this.setState({ cards: cardArr });
      })
      .catch(error => {
        console.log("error: " + error);
      });
  }

  checkIfWinnerHandler = (nextCard, direction) => {
    const currentCard = [...this.state.cards].pop();
    let currentCardVal = currentCard[0].value;
    let nextCardVal = nextCard[0].value;
    nextCardVal =
      nextCardVal === "ACE"
        ? 14
        : nextCardVal === "KING"
        ? 13
        : nextCardVal === "QUEEN"
        ? 12
        : nextCardVal === "JACK"
        ? 11
        : nextCardVal;
    currentCardVal =
      currentCardVal === "ACE"
        ? 14
        : currentCardVal === "KING"
        ? 13
        : currentCardVal === "QUEEN"
        ? 12
        : currentCardVal === "JACK"
        ? 11
        : currentCardVal;
        if (direction === 'up') {
          if (nextCardVal > currentCardVal) {
            this.setState({result: 'Winner!'});
          } 
          else if (nextCardVal === currentCardVal) {
            this.setState({result: 'Tie'});
          }
          else {
            this.setState({result: 'Lost :('});
          }
        }
        if (direction === 'down') {
          if (nextCardVal < currentCardVal) {
            this.setState({result: 'Winner!'});
          } 
          else if (nextCardVal === currentCardVal) {
            this.setState({result: 'Tie'});
          }
          else {
            this.setState({result: 'Lost :('});
          }
        }
        this.setState({newGame: true});  
    }

  render() {
    return (
      <div className={classes.Game}>

        {this.state.result ? <Result result={this.state.result} /> : null}
      

        {this.state.cards ? <Cards cardArr={this.state.cards} /> : null}
        {this.state.deckId 
        ? <Controls 
          deck={this.state.deckId} 
          click={this.drawCardHandler} 
          newGame={this.state.newGame}
          newGameClick={this.getNewDeckHandler}
        />
        : null}
      </div>
    );
  }
}

export default Game;