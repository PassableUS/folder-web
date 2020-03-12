import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import {
  Paper,
  ButtonBase,
  Typography,
  makeStyles,
  Divider
} from '@material-ui/core';
import SubjectIcon from '@material-ui/icons/Subject';
import RichEditor from 'src/components/RichEditor';

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
  },
  drawingContainer: {
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '90%',
    width: '90%',
    marginTop: 15
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TextDialogue() {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ButtonBase onClick={handleOpen}>
        <Paper variant="outlined" className={classes.createButton}>
          <SubjectIcon fontSize="large" />{' '}
          <Typography className={classes.actionText}>
            Create a text note
          </Typography>
        </Paper>
      </ButtonBase>

      <Dialog
        className={classes.dialogContainer}
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth="lg"
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        disableBackdropClick
      >
        <DialogTitle id="alert-dialog-slide-title">
          Create a drawing
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Give your note a title and start writing below.
          </DialogContentText>
          <Divider />
          <Paper elevation="2" className={classes.drawingContainer}>
            <RichEditor placeholder="Start writing here..." />
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Discard
          </Button>
          <Button onClick={handleClose} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TextDialogue;
