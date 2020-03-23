import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
// import { dismissWarning } from 'src/actions/axiosActions';
// import { useHistory } from 'react-router';
// import { logout } from 'src/actions/sessionActions';

const SessionAlert = () => {
  const registrationStatus = useSelector(
    state => state.session.user.registrationStatus
  );

  const dialogOpen = !(
    registrationStatus === 'finished' || !registrationStatus
  );
  const dispatch = useDispatch();

  return (
    <Dialog
      open={false} // Change this to dialogOpen when working on it
      onClose={() => {}}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullScreen
    >
      <DialogTitle id="alert-dialog-title"> Test</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Test
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default SessionAlert;
