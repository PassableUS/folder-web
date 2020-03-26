import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import {
  List, ListSubheader, ListItem, ListItemIcon, ListItemText, Button, Typography
} from '@material-ui/core';
import { CheckCircleOutline } from '@material-ui/icons';
import { fetchGoalsByWeek, fetchGoalsByPathway, fetchGoalsByCourse } from '../actions/goalsActions'
import GoalsSetupModal from './GoalsSetupModal';

function GoalsList({ mode, pathwayData, courseData }) {
  const dispatch = useDispatch();
  const [goals, setGoals] = useState([]);
  const [showGoalsSetup, setShowGoalsSetup] = useState(false);

  useEffect(() => {
    let mounted = true;

    const fetchWeeklyGoals = () => {
      if (mounted) {
        const onSuccess = (data) => {
          setGoals(data);
        }

        const onFailure = () => { };

        if (mode === 'week') {
          dispatch(fetchGoalsByWeek(
            moment().startOf('week').startOf('day').toISOString(),
            moment().endOf('week').startOf('day').toISOString(),
            onFailure,
            onSuccess));
        } else if (mode === 'course') {
          dispatch(fetchGoalsByCourse(
            courseData.moduleId,
            courseData.courseURL.split('/'),
            onFailure,
            onSuccess));
        } else if (mode === 'pathway') {
          dispatch(fetchGoalsByPathway(
            pathwayData.id,
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

  const callGoalsSetup = () => {
    setShowGoalsSetup(true);
  }

  const handleCloseModal = () => {
    setShowGoalsSetup(false);
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
    <>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            {
              goals.length > 0 &&
              getGoalsTitle()
            }
            {
              goals.length === 0 &&
              <>
                <div>
                  You have 0 goals set
                </div>
                <Button
                  onClick={callGoalsSetup}
                  color="primary"
                  size="small">
                  Set Goals
                </Button>
              </>
            }
          </ListSubheader>
        }
      >
        {spawnGoalsListItems()}
      </List>
      {
        showGoalsSetup &&
        <GoalsSetupModal mode={mode} show={showGoalsSetup} pathwayData={pathwayData} courseData={courseData} onModalClose={handleCloseModal}></GoalsSetupModal>
      }
    </>
  );
}



/*
    **mode**
    course, pathway or week - depending on that different headers displayed and  different data goes to backend

    those two are used if 'set goals button called':
    **pathwayData**
    place for pathway id so when goal created it may be fetched for this user and this pathway specifically
    **courseData**
    same as pathwayDaya - module id and course url for identification
*/
GoalsList.propTypes = {
  mode: PropTypes.oneOf(['course', 'pathway', 'week']),
  pathwayData: PropTypes.shape({ id: PropTypes.string }),
  courseData: PropTypes.shape({ moduleId: PropTypes.string, courseURL: PropTypes.string })
}

export default GoalsList;
