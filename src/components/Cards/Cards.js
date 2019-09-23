import React from 'react';
import Card from '../Card/Card';

import classes from './Cards.module.css';

const cards = (props) => {
  let playerCards = [];
  for (let i = 0; i < props.cardArr.length; i++) {
    playerCards.push(<Card 
        key={i}
        cardImg={props.cardArr[i][0].image}
        cardSuit={props.cardArr[i][0].suit}
        cardValue={props.cardArr[i][0].value}
      />);
  }
  return (
    <div className={classes.Cards}>
      {playerCards}
    </div>
  );
}

export default cards;