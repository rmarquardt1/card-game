import React from 'react';

import classes from './Controls.module.css';

const controls = (props) =>  {
  return (
    <div className={classes.Controls}>
      {!props.newGame
      ? <div><button onClick={() => props.click(props.deck, 'up')}>Up</button>
      <button onClick={() => props.click(props.deck, 'down')}>Down</button></div>
      : <button onClick={props.newGameClick}>New Game</button> }
    </div>
  );
}

export default controls;