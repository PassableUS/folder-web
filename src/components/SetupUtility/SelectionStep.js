import React from 'react';
import { ButtonBase, Paper, Typography, makeStyles } from '@material-ui/core';
import SubjectIcon from '@material-ui/icons/Subject';

const useStyles = makeStyles(theme => ({
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
  formAlert: {
    marginBottom: theme.spacing(2)
  },
  actionText: {
    marginTop: 15,
    fontSize: 14
  },
  titleInput: {
    marginBottom: 10
  }
}));

const SelectionStep = () => {
  const classes = useStyles();
  return (
    <>
      <ButtonBase>
        <Paper variant="outlined" className={classes.createButton}>
          <SubjectIcon fontSize="large" />{' '}
          <Typography className={classes.actionText}>
            Create a pathway and add multiple courses to my account
          </Typography>
        </Paper>
      </ButtonBase>

      <ButtonBase>
        <Paper variant="outlined" className={classes.createButton}>
          <SubjectIcon fontSize="large" />{' '}
          <Typography className={classes.actionText}>
            Add a single course to my account
          </Typography>
        </Paper>
      </ButtonBase>

      <ButtonBase>
        <Paper variant="outlined" className={classes.createButton}>
          <SubjectIcon fontSize="large" />{' '}
          <Typography className={classes.actionText}>
            Browse existing offerings
          </Typography>
        </Paper>
      </ButtonBase>
    </>
  );
};

export default SelectionStep;
