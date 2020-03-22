import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Card,
  Link,
  CardHeader,
  CardContent,
  CardActions,
  Button
} from '@material-ui/core';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import gradients from 'src/utils/gradients';
import GoalsSetup from 'src/components/GoalsSetup';
import GoalsList from 'src/components/GoalsList';

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
    display: 'flex',
    flexDirection: "row",
    flexWrap: "wrap"
    // '@media only screen and (min-width : 1025px)': {
    // }
  },
  courseInfo: {
    marginRight: "auto"
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
  },
}));

function Course({ course, className, moduleId, ...rest }) {
  const classes = useStyles();
  const [showGoalsModal, setGoalsModal] = useState(false);

  const avatars = {
    contest_created: (
      <Avatar className={classes.avatarIndigo}>
        <DashboardIcon />
      </Avatar>
    )
  };

  const takeCourse = () => {
    setGoalsModal(true);
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      {avatars.contest_created}
      <Card className={classes.card} variant="outlined">
        <div className={classes.courseInfo}>
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
          <CardActions>
            <Button 
            onClick={takeCourse}
            color="primary"
            size="small">
              Take course
            </Button>
            <GoalsSetup mode="course" show={showGoalsModal} activateBybutton={true} courseData={{moduleId, courseURL: course.link}}></GoalsSetup>
          </CardActions>
        </div>
        <Card>
          <CardContent>
            <GoalsList mode="course" courseData={{moduleId, courseURL: course.link}}></GoalsList>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}

Course.propTypes = {
  course: PropTypes.object.isRequired,
  className: PropTypes.string,
  moduleId: PropTypes.string
};

export default Course;
