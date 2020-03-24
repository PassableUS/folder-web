import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { createCalendarEvents } from 'src/actions/calendarActions';
import { updateUserModals } from 'src/actions/userActions';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    Typography,
    CardActions,
    CardContent,
    Select,
    MenuItem,
    Button,
} from '@material-ui/core';


import Calendar from '../views/Calendar';

const useStyles = makeStyles((theme) => ({
    header: {
        paddingLeft: theme.spacing(3),
    },
    subHeader: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    selectUnit: {
        marginBottom: theme.spacing(3),
    },
    card: {
        display: "flex",
        flexDirection: "column",
        height: "calc(100% - 80px)",
        width: "calc(100% - 80px)",
        margin: "40px"
    },
    cardContent: {
        overflowY: "scroll",
    },
    actionButton: {
        marginLeft: "auto"
    }
}));

function WeekScheduler({handleModalClose}) {
    const user = JSON.parse(localStorage.getItem('userProfile'));
    const lastWeekSchedulerSaved = user.busyTimesLastAsked || 0;
    const dontShowModalAgain = user.neverAskBusyTimes;
    const classes = useStyles();
    const dispatch = useDispatch();
    const nowTime = (new Date).getTime();
    const shownThisWeek = moment(nowTime).startOf('week').isSame(moment(lastWeekSchedulerSaved).startOf('week'), 'day');

    const [events, setEvent] = useState([]);
    const [daysToWork, setDaysToWork] = useState(1);
    const [minutesToWork, setMinutesToWork] = useState(45);

    const handleDontShow = () => {
        const onSuccess = (data) => { localStorage.setItem('userProfile', JSON.stringify(data)) };
        const onFailure = () => { alert("There was an error updating ask again") }
        dispatch(updateUserModals({ neverAskBusyTimes: true }, onSuccess, onFailure));
        handleModalClose({open: false});
    }

    const handleDateTimeSelect = (event) => {
        setEvent([...events, event]);
    }

    const handleDaysSelectChange = (event) => {
        setDaysToWork(event.target.value)
    }

    const handleMinutesSelectChange = (event) => {
        setMinutesToWork(event.target.value)
    }

    const addUserIds = (events) => {
        return events.map(event => {
            return { ...event, user: user.id };
        })
    }

    const handleSave = () => {
        const onFailure = () => {
            alert('There was an error while sending times');
        }
        const onSuccess = () => {
            const updateObject = {
                busyTimesLastAsked: nowTime,
                studyDaysPerWeek: daysToWork,
                studyMinutesPerDay: minutesToWork
            }
            const onUserUpdateSuccess = (data) => { localStorage.setItem('userProfile', JSON.stringify(data)) };
            const onUserUpdateFailure = () => { alert('There was an error while sending schedule') };
            dispatch(updateUserModals(updateObject, onUserUpdateSuccess, onUserUpdateFailure))
        }

        const eventsForBackend = addUserIds(events);
        dispatch(createCalendarEvents(eventsForBackend, onFailure, onSuccess));
        handleModalClose({open: false});
    }

    return (
        <>
            {
                (!dontShowModalAgain && !shownThisWeek && user.registrationStatus == "finished") &&
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                        <div className={classes.header}>
                            <Typography
                                className={classes.subHeader}
                                component="h5"
                                variant="h5"
                            >
                                Please, select the amound of days a week you'd like to study:
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
                            <Typography
                                className={classes.subHeader}
                                component="h5"
                                variant="h5"
                            >
                                Please, select the lenth of one lesson:
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
                            <Typography
                                className={classes.subHeader}
                                component="h5"
                                variant="h5"
                            >
                                Please, select the time you are unavailable at:
                                </Typography>
                        </div>
                        <Calendar weekScheduler={true} getSelectedDateTime={handleDateTimeSelect}></Calendar>
                    </CardContent>
                    <CardActions>
                        <Button onClick={handleDontShow} size="small" className={classes.actionButton}>
                            Don't show again
                        </Button>
                        <Button onClick={handleSave} size="small" color="primary" className={classes.actionButton}>
                            Save
                        </Button>
                    </CardActions>
                </Card>
            }
        </>
    );
}

WeekScheduler.propTypes = {
    handleModalClose: PropTypes.func
}


export default WeekScheduler;
