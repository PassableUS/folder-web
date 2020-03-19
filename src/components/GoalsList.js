import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import {
  List, ListSubheader, ListItem, ListItemIcon, ListItemText
} from '@material-ui/core';
import { CheckCircleOutline } from '@material-ui/icons';
import { fetchGoalsByWeek, fetchGoalsByPathway, fetchGoalsByCourse } from '../actions/goalsActions'

function GoalsList({ mode, pathwayData, courseData }) {
  const user = JSON.parse(localStorage.getItem('userProfile'));
  const dispatch = useDispatch();
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    let mounted = true;

    const fetchWeeklyGoals = () => {
      if (mounted) {
        const onSuccess = (data) => {
          setGoals(data);
        }

        const onFailure = () => { };

        if (mode == 'week') {
          dispatch(fetchGoalsByWeek(
            moment().startOf('week').startOf('day').toISOString(),
            moment().endOf('week').startOf('day').toISOString(),
            user.id,
            onFailure,
            onSuccess));
        } else if (mode == 'course') { 
          dispatch(fetchGoalsByCourse(
            courseData.moduleId,
            courseData.courseURL.split('/'),
            user.id,
            onFailure,
            onSuccess));
        } else if (mode == 'pathway') {
          dispatch(fetchGoalsByPathway(
            pathwayData.id,
            user.id,
            onFailure,
            onSuccess));
        }
      }
    };

    fetchWeeklyGoals();

    return () => {
      mounted = false;
    };
  }, []);

  const getGoalsTitle = () => {
    const titles = {
      'week': 'Goals for this week:',
      'course': 'Goals for this course:',
      'pathway': 'Goals for this pathway:'
    };
    return titles[mode];
  }

  const spawnGoalsListItems = () => {
    return goals.map((goal, i) => (
      <ListItem key={i.toString()}>
        <ListItemIcon>
          <CheckCircleOutline />
        </ListItemIcon>
        <ListItemText primary={goal.goal} />
      </ListItem>
    ))
  }

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          { goals.length &&
            getGoalsTitle()
          }
        </ListSubheader>
      }
    >
      {spawnGoalsListItems()}
    </List>
  );
}

GoalsList.propTypes = {
  mode: PropTypes.oneOf(['course', 'pathway', 'week']),
  pathwayData: PropTypes.shape({ id: PropTypes.string }),
  courseData: PropTypes.shape({ moduleId: PropTypes.string, courseURL: PropTypes.string })
}

export default GoalsList;
