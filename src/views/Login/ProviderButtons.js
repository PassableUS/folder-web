import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

const baseURL = 'http://localhost:3000/api/authentication/'

const authenticateWithProvider = (provider) => {
  window.location = baseURL + provider + '/start'
}

const useStyles = makeStyles((theme) => ({
  root: {},
  submitButton: {
    marginTop: theme.spacing(2),
    width: '100%'
  },
  googleButton: {
    marginBottom: theme.spacing(1),
    width: '100%'
  },
  facebookButton: {
    marginBottom: theme.spacing(1),
    width: '100%'
  }
}));

const ProviderButtons = () => {
  const classes = useStyles();

  return (
    <>
      <Button
        className={classes.googleButton}
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        onClick={() => authenticateWithProvider('google')}
      >
        Sign in with Google
      </Button>
      <Button
        className={classes.facebookButton}
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        onClick={() => authenticateWithProvider('facebook')}
      >
        Sign in with Facebook
      </Button>
    </>
  )
};

export default ProviderButtons;