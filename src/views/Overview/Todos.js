/* eslint-disable react/no-multi-comp */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Radio,
  Tooltip,
  Typography,
  colors,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Label from 'src/components/Label';
import { createTodo, fetchTodos } from 'src/actions/dashboardActions';
import { useDispatch } from 'react-redux';
import { DateTimePicker } from '@material-ui/pickers';

const getLabel = todo => {
  if (todo.done) {
    return null;
  }

  if (moment(todo.deadline).isBefore(moment(), 'day')) {
    return (
      <Label color={colors.red[600]}>
        {`Due ${moment(todo.deadline).fromNow()}`}
      </Label>
    );
  }

  if (moment(todo.deadline).isSame(moment(), 'day')) {
    return <Label color={colors.orange[600]}>Due today</Label>;
  }

  return <Label>{`Due ${moment(todo.deadline).fromNow()}`}</Label>;
};

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  addIcon: {
    marginRight: theme.spacing(1)
  },
  done: {
    textDecoration: 'line-through',
    color: theme.palette.text.secondary
  },
  datePickerInput: {
    marginTop: theme.spacing(1)
  }
}));

function Todos({ className, ...rest }) {
  const classes = useStyles();
  const [todos, setTodos] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState('');
  const dispatch = useDispatch();

  const handleOpen = () => setDialogOpen(true);
  const handleClose = () => setDialogOpen(false);

  const [selectedDate, handleDateChange] = useState(new Date());

  const handleSubmit = () => {
    setDialogOpen(false);
    dispatch(
      createTodo(
        {
          text: dialogValue,
          created_at: moment(),
          deadline: selectedDate,
          done: false
        },
        () => alert('There was an error creating your todo.'),
        data => setTodos(data)
      )
    );
  };

  const handleDialogChange = event => setDialogValue(event.target.value);

  const handleRadioChange = (event, todo) => {
    event.persist();

    setTodos(prevTodos =>
      prevTodos.map(prevTodo => {
        if (prevTodo.id === todo.id) {
          return {
            ...todo,
            done: !todo.done
          };
        }

        return prevTodo;
      })
    );
  };

  useEffect(() => {
    dispatch(
      fetchTodos(
        () =>
          console.log(
            'Something went wrong while trying to retrieve your todos.'
          ),
        data => setTodos(data)
      )
    );
  }, [dispatch]);

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        action={
          <Button color="primary" size="small" onClick={handleOpen}>
            <AddIcon className={classes.addIcon} />
            Add
          </Button>
        }
        title="My todos"
      />
      <Divider />
      <CardContent className={classes.content}>
        <List>
          {todos.map((todo, i) => (
            <ListItem divider={i < todos.length - 1} key={todo.text}>
              <ListItemIcon>
                <Radio
                  checked={todo.done}
                  onClick={event => handleRadioChange(event, todo)}
                />
              </ListItemIcon>
              <ListItemText>
                <Typography
                  className={clsx({
                    [classes.done]: todo.done
                  })}
                  variant="body1"
                >
                  {todo.text}
                </Typography>
              </ListItemText>
              {getLabel(todo)}
              <Tooltip title="Delete Todo">
                <IconButton
                  onClick={() => alert('Deleting todos to come very soon.')}
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </CardContent>

      {/* Add todo dialog */}
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Create a todo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter your task here. We will let you know how long you have
            until your task is due on your dashboard
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="task"
            label="Task"
            fullWidth
            value={dialogValue}
            onChange={handleDialogChange}
          />
          <DateTimePicker
            label="Due Date"
            fullWidth
            value={selectedDate}
            onChange={handleDateChange}
            className={classes.datePickerInput}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}

Todos.propTypes = {
  className: PropTypes.string
};

export default Todos;
