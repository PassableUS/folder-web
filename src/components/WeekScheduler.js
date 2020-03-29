import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { createCalendarEvents } from 'src/actions/calendarActions';
import { updateUserModals } from 'src/actions/userActions';
import { makeStyles } from '@material-ui/styles';
import {
  Typography,
  CardActions,
  Select,
  MenuItem,
  Button
} from '@material-ui/core';

import Calendar from '../views/Calendar';

const useStyles = makeStyles(theme => ({
  header: {
    paddingLeft: theme.spacing(3)
  },
  subHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  selectUnit: {
    marginBottom: theme.spacing(3)
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100% - 80px)',
    width: 'calc(100% - 80px)',
    margin: '40px'
  },
  cardContent: {
    overflowY: 'scroll'
  },
  actionButton: {
    marginLeft: 'auto'
  },
  explanation: {
    marginBottom: theme.spacing(2)
  }
}));

function WeekScheduler({
  handleBack = () => {},
  handleNext = () => {},
  userFlowMode = false,
  handleModalClose,
  onSave
}) {
  const user = JSON.parse(localStorage.getItem('userProfile'));
  const lastWeekSchedulerSaved = user.busyTimesLastAsked || 0;
  const dontShowModalAgain = user.neverAskBusyTimes;
  const classes = useStyles();
  const dispatch = useDispatch();
  const nowTime = new Date().getTime();
  const shownThisWeek = moment(nowTime)
    .startOf('week')
    .isSame(moment(lastWeekSchedulerSaved).startOf('week'), 'day');

  const [events, setEvent] = useState([]);
  const [daysToWork, setDaysToWork] = useState(1);
  const [minutesToWork, setMinutesToWork] = useState(45);

  const handleDontShow = () => {
    const onSuccess = data => {
      localStorage.setItem('userProfile', JSON.stringify(data));
    };
    const onFailure = () => {
      alert('There was an error updating ask again');
    };
    dispatch(
      updateUserModals({ neverAskBusyTimes: true }, onSuccess, onFailure)
    );
    handleModalClose({ open: false });
  };

  const handleDateTimeSelect = event => {
    setEvent([...events, event]);
  };

  const handleDaysSelectChange = event => {
    setDaysToWork(event.target.value);
  };

  const handleMinutesSelectChange = event => {
    setMinutesToWork(event.target.value);
  };

  const addUserIds = events => {
    return events.map(event => {
      return { ...event, user: user.id };
    });
  };

  const handleSave = () => {
    const onFailure = () => {
      alert('There was an error while sending times');
    };
    const onSuccess = () => {
      const updateObject = {
        busyTimesLastAsked: nowTime,
        studyDaysPerWeek: daysToWork,
        studyMinutesPerDay: minutesToWork
      };
      const onUserUpdateSuccess = data => {
        localStorage.setItem('userProfile', JSON.stringify(data));
      };
      const onUserUpdateFailure = () => {
        alert('There was an error while sending schedule');
      };
      dispatch(
        updateUserModals(updateObject, onUserUpdateSuccess, onUserUpdateFailure)
      );

      handleNext();
    };

    const eventsForBackend = addUserIds(events);
    dispatch(createCalendarEvents(eventsForBackend, onFailure, onSuccess));
    handleModalClose({ open: false });
    if (onSave) {
      onSave({
        events: eventsForBackend,
        studyDaysPerWeek: daysToWork,
        studyMinutesPerDay: minutesToWork
      });
    }
  };

  return (
    <>
      <div className={classes.header}>
        <Typography component="h1" variant="h1">
          Time Scheduler
        </Typography>
        <Typography variant="subtitle2" className={classes.explanation}>
          Folder will try to give you recommended blocks to work on your courses
          based on your availability and preferences. Scheduling specific times
          with consistent durations to work improves productivity dramatically.
        </Typography>

        <Typography className={classes.subHeader} component="h5" variant="h5">
          How many days do you want to study this week?
        </Typography>
        <Select
          className={classes.selectUnit}
          value={daysToWork}
          onChange={handleDaysSelectChange}
        >
          <MenuItem value={1}>One</MenuItem>
          <MenuItem value={2}>Two</MenuItem>
          <MenuItem value={3}>Three</MenuItem>
          <MenuItem value={4}>Four</MenuItem>
          <MenuItem value={5}>Five</MenuItem>
          <MenuItem value={6}>Six</MenuItem>
          <MenuItem value={7}>Seven</MenuItem>
        </Select>
        <Typography className={classes.subHeader} component="h5" variant="h5">
          Ideally, how long should each lesson be?
        </Typography>
        <Select
          className={classes.selectUnit}
          value={minutesToWork}
          onChange={handleMinutesSelectChange}
        >
          <MenuItem value={15}>15 min</MenuItem>
          <MenuItem value={30}>30 min</MenuItem>
          <MenuItem value={45}>45 min</MenuItem>
          <MenuItem value={60}>60 min</MenuItem>
          <MenuItem value={75}>75 min</MenuItem>
          <MenuItem value={90}>90 min</MenuItem>
          <MenuItem value={105}>105 min</MenuItem>
          <MenuItem value={120}>120 min</MenuItem>
        </Select>
        <Typography className={classes.subHeader} component="h5" variant="h5">
          Drag to block out time slots where you wouldn't be able to work below:
        </Typography>
      </div>
      <Calendar
        weekScheduler={true}
        getSelectedDateTime={handleDateTimeSelect}
      ></Calendar>
      {userFlowMode ? (
        <div>
          <Button onClick={handleBack} className={classes.button}>
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            className={classes.button}
          >
            Next
          </Button>
        </div>
      ) : (
        <CardActions>
          <Button
            onClick={handleDontShow}
            size="small"
            className={classes.actionButton}
          >
            Don't show again
          </Button>
          <Button
            onClick={handleSave}
            size="small"
            color="primary"
            className={classes.actionButton}
          >
            Save
          </Button>
        </CardActions>
      )}
    </>
  );
}

/*
    **show**
    force setup to be visible overwriting other checks
    **handleModalClose**
    if visibility controlled with show - notify parent about closing so it updates their state.
    Useful in case you open and close multiple times - only updated props cause rerender
    **onSave**
    sends saved data back to the calendar if called from
*/

WeekScheduler.propTypes = {
  handleModalClose: PropTypes.func,
  onSave: PropTypes.func
};

export default WeekScheduler;
