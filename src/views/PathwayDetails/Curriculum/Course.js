import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Card,
  Link,
  CardHeader,
  CardContent,
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import gradients from 'src/utils/gradients';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  name: {
    paddingBottom: theme.spacing(1)
  },
  card: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  linkContainer: {
    paddingTop: theme.spacing(1)
  },
  avatarBlue: {
    backgroundImage: gradients.blue
  },
  avatarGreen: {
    backgroundImage: gradients.green
  },
  avatarOrange: {
    backgroundImage: gradients.orange
  },
  avatarIndigo: {
    backgroundImage: gradients.indigo
  }
}));

function Course({ course, className, ...rest }) {
  const classes = useStyles();

  const avatars = {
    contest_created: (
      <Avatar className={classes.avatarIndigo}>
        <DashboardIcon />
      </Avatar>
    )
  };


  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      {avatars.contest_created}
      <Card className={classes.card} variant="outlined">
        <CardHeader
          className={classes.name}
          title={course.name}
          titleTypographyProps={{
            variant: 'h4'
          }}
        />
        <CardContent
          className={classes.linkContainer}
        >
          <Link
            className={classes.link}
            href={course.link}
            variant="h5"
          >
            View Course
          </Link>
        </CardContent>

      </Card>
    </div>
  );
}

Course.propTypes = {
  course: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default Course;
