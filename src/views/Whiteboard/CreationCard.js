import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  ButtonBase,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography
} from '@material-ui/core';
import SubjectIcon from '@material-ui/icons/Subject';
import DrawingDialogue from './DrawingDialogue';

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
  },
  actionText: {
    marginTop: 15,
    fontSize: 14
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
              <Paper variant="outlined" className={classes.createButton}>
                <SubjectIcon fontSize="large" />
                <Typography className={classes.actionText}>
                  Create a text note
                </Typography>
              </Paper>
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
