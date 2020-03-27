import React from 'react';
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector } from 'react-redux';
import SetupStepper from './SetupStepper';

// import { dismissWarning } from 'src/actions/axiosActions';
// import { useHistory } from 'react-router';
// import { logout } from 'src/actions/sessionActions';

const SetupUtility = () => {
  const registrationStatus = useSelector(
    state => state.session.user.registrationStatus
  );

  const dialogOpen = !(
    (registrationStatus === 'finished' || !registrationStatus) // If 'finished' or registartionStatus does not exist, it is NOT open
  );
  // const dispatch = useDispatch();

  return (
    <Dialog
      open={dialogOpen} // Change this to dialogOpen when working on it
      onClose={() => {}}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullScreen
    >
      <DialogTitle id="alert-dialog-title">Initial Setup</DialogTitle>
      <DialogContent>
        <SetupStepper />
      </DialogContent>
    </Dialog>
  );
};

export default SetupUtility;
