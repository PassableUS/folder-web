
import React, { useState, useEffect } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from 'src/components/Alert';

const SnackbarNotification = ({errorMessage, successMessage, snackbarState}) => {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarText, setSnackbarText] = useState('');
  const [severity, setSeverity] = useState('info');

  const handleSnackbarClose = () => setShowSnackbar(false);

  useEffect(() => {
    if (snackbarState === 'error' || snackbarState === 'success') {
      setShowSnackbar(true);
      snackbarState === 'error' ? setSeverity("error") : setSeverity("success")
      snackbarState === 'error' ? setSnackbarText(errorMessage) :
                                  setSnackbarText(successMessage)
      }
  }, [snackbarState, errorMessage, successMessage])  

  return (
    <Snackbar open={showSnackbar}>
      <Alert
        onClose={handleSnackbarClose}
        variant={severity}
        message={snackbarText}        
      />
    </Snackbar>
  )
}

export default SnackbarNotification