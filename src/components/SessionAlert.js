import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import { dismissWarning } from 'src/actions/axiosActions';
import { useHistory } from 'react-router';
import { logout } from 'src/actions/sessionActions';

const SessionAlert = () => {
  const showWarning = useSelector((state) => state.axios.showWarning);
  const errorMessage = useSelector((state) => state.axios.error);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClose = () => {
    dispatch(dismissWarning);
  };

  const handleRedirect = () => {
    handleClose();
    dispatch(logout());
    history.push('/auth/login');
  };

  return (
    <Dialog
      open={showWarning}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title"> Your request was denied. Sign in again? </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {`A request that you had just submitted returned with the following error: ${JSON.stringify(errorMessage)}`}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleRedirect} color="primary" autoFocus>
          Sign In
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SessionAlert;
