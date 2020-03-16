import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  List, ListSubheader, ListItem, ListItemIcon, ListItemText, StarBorder
} from '@material-ui/core';
import { CheckCircleOutline } from '@material-ui/icons';
import { fetchGoals } from '../../actions/goalsActions'


const useStyles = makeStyles((theme) => ({
  root: {},
  summaryButton: {
    backgroundColor: theme.palette.common.white
  },
  barChartIcon: {
    marginRight: theme.spacing(1)
  },
  image: {
    width: '100%',
    maxHeight: 400
  }
}));

function WeeklyGoals() {
  const classes = useStyles();
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
        dispatch(fetchGoals(
          moment().startOf('week').startOf('day').toISOString(),
          moment().endOf('week').startOf('day').toISOString(),
          onFailure,
          onSuccess));
      }
    };

    fetchWeeklyGoals();

    return () => {
      mounted = false;
    };
  }, []);

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
          Goals for this week:
        </ListSubheader>
      }
      className={classes.root}
    >
      {spawnGoalsListItems()}
    </List>
  );
}

export default WeeklyGoals;
