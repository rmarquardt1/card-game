import React from 'react';

import classes from './Result.module.css';

const result = (props) => (
  <div className={classes.Result}>{props.result}</div>
);

export default result; 