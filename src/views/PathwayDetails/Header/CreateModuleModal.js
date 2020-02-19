import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Button,
  Dialog,
  TextField,
  Typography,
  colors
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 960
  },
  header: {
    padding: theme.spacing(3),
    maxWidth: 720,
    margin: '0 auto'
  },
  content: {
    padding: theme.spacing(0, 2),
    maxWidth: 720,
    margin: '0 auto'
  },
  helperText: {
    textAlign: 'right',
    marginRight: 0
  },
  author: {
    margin: theme.spacing(4, 0),
    display: 'flex'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    backgroundColor: colors.grey[100],
    padding: theme.spacing(2),
    display: 'flex',
    justifyContent: 'center'
  },
  applyButton: {
    color: theme.palette.common.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

function Application({
  pathway,
  // author,
  open,
  onClose,
  onSubmit,
  className,
  ...rest
}) {
  const [value, setValue] = useState('');
  const classes = useStyles();

  const handleChange = (event) => {
    event.persist();
    setValue(event.target.value);
  };

  return (
    <Dialog
      maxWidth="lg"
      onClose={onClose}
      open={open}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <div className={classes.header}>
          <Typography
            align="center"
            className={classes.title}
            gutterBottom
            variant="h3"
          >
            Create a module for "
            {pathway.name}
            "
          </Typography>
          <Typography
            align="center"
            className={classes.subtitle}
            variant="subtitle2"
          >
            Automatic organization via this modal is not yet supported. Please use the button below to create a site-wide module.
          </Typography>
        </div>
        <div className={classes.content}>
          <TextField
            autoFocus
            className={classes.textField}
            // eslint-disable-next-line react/jsx-sort-props
            FormHelperTextProps={{ classes: { root: classes.helperText } }}
            fullWidth
            helperText={`${200 - value.length} characters left`}
            label="Describe the module in 200 characters or less. (Disabled)"
            multiline
            onChange={handleChange}
            placeholder="Type a description..."
            rows={5}
            value={value}
            variant="outlined"
            disabled
          />
        </div>
        <div className={classes.actions}>
          <Button
            className={classes.applyButton}
            onClick={onSubmit}
            component={Link}
            to={`/modules/create/${pathway.id}`}
            variant="contained"
          >
            Create Sitewide Module
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

Application.propTypes = {
  pathway: PropTypes.object.isRequired,
  // author: PropTypes.object.isRequired,
  className: PropTypes.string,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired
};

export default Application;
