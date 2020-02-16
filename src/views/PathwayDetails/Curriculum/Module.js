import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  Typography,
} from '@material-ui/core';
import Course from './Course'

const useStyles = makeStyles((theme) => ({
  root: {
  },
  courses: {
    paddingTop: theme.spacing(1)
  },
  card: {
    padding: theme.spacing(3),
  },
  date: {
    marginLeft: 'auto',
    flexShrink: 0
  },
  title: {
    marginBottom: theme.spacing(1)
  },
  course: {
    marginBottom: theme.spacing(1)
  }
}));

function Module({ module, className, ...rest }) {
  const classes = useStyles();
  console.log("MODULE", module)

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Card className={classes.card}>
        <Typography
          className={classes.title}
          variant="h3"
        >
          {module.name}
        </Typography>
        <Typography
          className={classes.title}
          variant="subtitle1"
        >
          {module.description}
        </Typography>
        <div className={classes.courses}>
          {module.courses.map(course => (
            <Course className={classes.course} key={course.name} course={course} />
          ))}
        </div>
      </Card>
    </div>
  );
}

Module.propTypes = {
  module: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default Module;
