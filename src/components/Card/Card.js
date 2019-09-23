import React from 'react';

import classes from './Card.module.css';

const card = (props) => {
  return (
    <div className={classes.Card}>
      <img src={props.cardImg} alt="" />
    </div>
  );
}

export default card;