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
import TextField from '@material-ui/core/TextField';
import Alert from 'src/components/Alert';
import { useForm } from 'react-hook-form';
import { createTextNote, fetchNotes } from 'src/actions/noteActions';
import { useDispatch } from 'react-redux';

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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TextDialogue() {
  const classes = useStyles();
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Function that receives the form data
  const onSubmit = data => {
    const newData = {
      noteType: 'text',
      ...data
    };

    dispatch(
      createTextNote(
        newData,
        () => alert('Something went wrong'),
        () =>
          dispatch(
            // Update notes after
            fetchNotes(
              () => {},
              error => alert(error)
            )
          )
      )
    );

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
        <DialogTitle id="alert-dialog-slide-title">Write a note</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Give your note a title and start writing below.
          </DialogContentText>

          <Divider />
          <TextField
            inputRef={register({
              required: true
            })}
            name="noteTitle"
            label="Enter a title here..."
            variant="outlined"
            fullWidth
            className={classes.titleInput}
          />
          <RichEditor
            formName="content"
            register={register}
            placeholder="Start writing here..."
          />

          {/* Form errors */}
          {Object.keys(errors).map(error => (
            <Alert
              key={error}
              variant="error"
              className={classes.formAlert}
              message={`${error} is required`}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Discard
          </Button>
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TextDialogue;
