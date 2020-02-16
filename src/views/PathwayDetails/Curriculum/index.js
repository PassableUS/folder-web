import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography } from '@material-ui/core';
import Module from './Module';

const useStyles = makeStyles((theme) => ({
  root: {},
  title: {
    marginBottom: theme.spacing(3)
  },
  module: {
    marginBottom: theme.spacing(2)
  }
}));

function Curriculum({ pathway, className, ...rest }) {
  const classes = useStyles();
  

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.group}>
        {pathway.modules.length === 0 ?
        <Typography variant="h1">
        No modules have been created yet.
        </Typography> : 
        
        pathway.modules.map(module => (
          <Module
            module={module}
            className={classes.module}
            key={module.id}
          />
        ))}
      </div>
    </div>
  );
}

Curriculum.propTypes = {
  pathway: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default Curriculum;
