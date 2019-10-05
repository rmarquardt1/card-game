import React, { Component } from 'react';
import axios from 'axios';
import Cards from '../../components/Cards/Cards';
import Controls from '../../components/Controls/Controls';
import Result from '../../components/Result/Result';

import classes from './Game.module.css';

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

  newGameHandler = () => {
    this.setState({cards: [], result: null});
    this.getNewDeckHandler();
  }

  getNewDeckHandler = async () => {
    try {
      const deck = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/');
      await this.drawCardHandler(deck.data.deck_id);
      this.setState({deckId: deck.data.deck_id});
    } catch (error) {
      console.log('error: ' + error);
    }
  };

  drawCardHandler = async (deckId, direction) => {
    const currentCards = this.state.newGame ? [] : [...this.state.cards];
    try {
      const card = await axios.get(
        'https://deckofcardsapi.com/api/deck/' + deckId + '/draw/', {
          params: {
            count: 1
          }
        });
      const cardData = await card.data.cards.map(card => {
        let cardVal = null;
        switch (card.value) {
          case 'JACK':
            cardVal = 11;
            break;
          case 'QUEEN':
            cardVal = 12;
            break;
          case 'KING':
            cardVal = 13;
            break;
          case 'ACE':
            cardVal = 14;
            break;
          default:
            cardVal = parseInt(card.value);
        }
        return {
          image: card.image,
          value: cardVal
        };
      });
      const newCards = [...currentCards, await cardData];
      this.setState({
        cards: newCards,
        newGame: false,
        result: null
      });
      if (newCards.length > 1) {
        this.checkWinnerHandler(newCards, direction);
      }
    } catch (error) {
      console.log('error: ' + error);
    }
  };

  checkWinnerHandler = (cards, direction) => {
    const firstCard = cards[0][0].value;
    const secondCard = cards[1][0].value;
    let gameResult = null;
    switch (direction) {
      case 'up':
        gameResult =
          secondCard > firstCard
            ? 'Winner!'
            : secondCard < firstCard
            ? 'Lost :('
            : 'Tie';
        break;
      case 'down':
        gameResult =
          secondCard < firstCard
            ? 'Winner!'
            : secondCard > firstCard
            ? 'Lost :('
            : 'Tie';
        break;
      default:
        gameResult = 'Something went wrong :(';
    }
    this.setState({ newGame: true, result: gameResult });
  };

  render() {
    return (
      <div className={classes.Game}>
        {this.state.result ? <Result result={this.state.result} /> : null}
        {this.state.cards ? <Cards cardArr={this.state.cards} /> : null}
        {this.state.deckId ? (
          <Controls
            deck={this.state.deckId}
            click={this.drawCardHandler}
            newGame={this.state.newGame}
            newGameClick={this.newGameHandler}
          />
        ) : null}
      </div>
    );
  }
}

export default Game;