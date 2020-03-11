import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardContent,
  Grid,
  colors,
  Paper
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  createButton: {
    height: 200,
    width: 200
  }
}));

const CreationCard = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          className={classes.root}
          spacing={3}
        >
          <Grid item>
            <Paper variant="outlined" className={classes.createButton} />
          </Grid>
          <Grid item>
            <Paper variant="outlined" className={classes.createButton} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

CreationCard.propTypes = {
  className: PropTypes.string
};

export default CreationCard;
