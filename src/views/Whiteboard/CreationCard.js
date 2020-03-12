import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { ButtonBase, Card, CardContent, Grid } from '@material-ui/core';
import DrawingDialogue from './DrawingDialogue';
import TextDialogue from './TextDialogue';

const useStyles = makeStyles(() => ({
  root: {},
  createButton: {
    height: 200,
    width: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    '&:hover': {
      background: '#f5f5f5'
    }
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
            <ButtonBase>
              <TextDialogue />
            </ButtonBase>
          </Grid>
          <Grid item>
            <DrawingDialogue />
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
