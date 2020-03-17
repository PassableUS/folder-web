import React, { useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { createCalendarEvents } from 'src/actions/calendarActions';
import { makeStyles } from '@material-ui/styles';
import {
    Modal,
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

function WeekScheduler() {
    //helper to check if dates are from the same week
    const isSameWeek = (firstDay, secondDay, offset) => {
        const firstMoment = moment(firstDay);
        const secondMoment = moment(secondDay);

        const startOfWeek = (_moment, _offset) => {
            return _moment.add("days", _moment.weekday() * -1 + (_moment.weekday() >= 7 + _offset ? 7 + _offset : _offset));
        }
        console.log('startOfWeek', startOfWeek(firstMoment, offset), startOfWeek(secondMoment, offset), startOfWeek(firstMoment, offset).isSame(startOfWeek(secondMoment, offset), "day"))
        return startOfWeek(firstMoment, offset).isSame(startOfWeek(secondMoment, offset), "day");
    }

    //check if modal with dates was shown and then show if
    const lastWeekSchedulerSaved = localStorage.getItem("lastWeekSchedulerSaved") || '0';
    const dontShowModalAgain = !!localStorage.getItem("dontShowSchedulerModalAgain");
    const classes = useStyles();
    const dispatch = useDispatch();
    const nowTime = (new Date).getTime();
    const shownThisWeek = isSameWeek(nowTime, Number(lastWeekSchedulerSaved), 0);

    const [modal, setModal] = useState({
        open: true
    });
    const [events, setEvent] = useState([]);
    const [daysToWork, setDaysToWork] = useState(1);
    const [minutesToWork, setMinutesToWork] = useState(45);

    const handleModalClose = () => {
        setModal({
            open: false
        });
    };

    const handleDontShow = () => {
        localStorage.setItem("dontShowSchedulerModalAgain", "true");
        setModal({
            open: false
        });
    }

    const handleDateTimeSelect = (event) => {
        setEvent([...events, event]);
        if (events.length) {
            testAlgorythmForBackend();
        }
    }

    const handleDaysSelectChange = (event) => {
        setDaysToWork(event.target.value)
    }

    const handleMinutesSelectChange = (event) => {
        setMinutesToWork(event.target.value)
    }

    const inverseToFree = (events) => {
        //get first and last days of week
        const startOfPeriod = moment(events[0].start).startOf('week').startOf('day').toDate();
        const endOfPeriod = moment(events[events.length - 1].end).endOf('week').endOf('day').toDate();

        const freeTimes = [];
        events.forEach((event, i) => {
            if (i == 0) {
                freeTimes.push({ start: startOfPeriod, end: event.start });
            }
            else {
                freeTimes.push({ start: events[i - 1].end, end: event.start })
            }

        })
        
        freeTimes.push({ start: events[events.length - 1].end, end: endOfPeriod });

        return freeTimes
    }

    const cutByDay = (start, end) => {
        let intervalStart = moment(start);
        const intervalEnd = moment(end);

        //check if in different dates
        if (intervalStart.isSame(intervalEnd, 'date')) {
            return [{start, end}];
        } else {
            let daysDiff = intervalEnd.diff(intervalStart, 'd') + 2;
            const daylyIntervals = [];

            while (daysDiff) {
                let end;
                if (daysDiff == 1) {
                    end = intervalEnd.toDate();
                } else {
                    end = intervalStart.clone().endOf('day').toDate();
                }

                daylyIntervals.push({
                    start: intervalStart.toDate(),
                    end
                });
                intervalStart = intervalStart.add(1, 'd').startOf('day');
                daysDiff--;
            }
            return daylyIntervals;
        }
    }

    const pickTimeEachDay = (freeTimes, amountOfDays, minutesPerTime) => {
        const timesForStudy = [];
        const datesFilled = [];

        freeTimes.forEach(time => {
            //check if array filled 
            if (timesForStudy.length >= amountOfDays) return;

            const start = moment(time.start);
            const end = moment(time.end);

            const dateISOString = start.clone().startOf('day').toString();
            const index = datesFilled.indexOf(dateISOString);
            
            //date not there
            if (index == -1) {
                const minutesInRange = end.diff(start, 'minutes');

                if (minutesInRange >= minutesPerTime) {
                    timesForStudy.push({
                        start: start.toDate(),
                        end: start.add(minutesPerTime, 'minutes').toDate()
                    });
                    datesFilled.push(dateISOString);
                }
            }
        });

        return timesForStudy;
    }

    const testAlgorythmForBackend = () => {
        // events, daysToWork, minutesToWork

        // inversetofree
        const freeTime = inverseToFree(events);
        // console.log('freeTime', freeTime)
        
        //cut by day
        const freeTimeByDay = freeTime.reduce((acc, cur) => {
            const byDate = cutByDay(cur.start, cur.end);
            return acc.concat(byDate)
        }, []);

        // pick time each day
        const studyTimes = pickTimeEachDay(freeTimeByDay, daysToWork, minutesToWork);

        console.log('studyTimes', studyTimes);
    }

    const handleSave = () => {
        const onFailure = () => {
            alert('There was an error while sending times');
        }
        const onSuccess = () => {
            localStorage.setItem("lastWeekSchedulerSaved", nowTime.toString());
        }
        if (events.length) {
            testAlgorythmForBackend();
        }
        // dispatch(createCalendarEvents(events, daysToWork, minutesToWork, onFailure, onSuccess));
        setModal({
            open: false
        });
    }



    return (
        <>
            {
                // dontShowModalAgain != "true" && !shownThisWeek &&

                <Modal
                    onClose={handleModalClose}
                    open={modal.open}
                >
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
                </Modal>
            }
        </>
    );
}


export default WeekScheduler;
