import React, { useState } from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { createCalendarEvents } from 'src/actions/calendarActions';
import { makeStyles } from '@material-ui/styles';
import {
    Modal,
    Card,
    CardHeader,
    CardActions,
    CardContent,
    Button
} from '@material-ui/core';

import Calendar from '../views/Calendar';

const useStyles = makeStyles((theme) => ({
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
    

    const handleModalClose = () => {
        setModal({
            open: false
        });
    };

    const handleDateTimeSelect = (event) => {
        setEvent([...events, event]);
    }

    const handleDontShow = () => {
        localStorage.setItem("dontShowSchedulerModalAgain", "true");
        setModal({
            open: false
        });
    }

    const handleSave = () => {
        const onFailure = () => {
            alert('There was an error while setting goals');
        }
        const onSuccess = () => {
            localStorage.setItem("lastWeekSchedulerSaved", nowTime.toString());
        }
        dispatch(createCalendarEvents(events, onFailure, onSuccess));
        setModal({
            open: false
        });
    }

    return (
        <>
        {
            dontShowModalAgain != "true" && !shownThisWeek &&

            <Modal
                onClose={handleModalClose}
                open={modal.open}
            >
                <Card className={classes.card}>
                    <CardHeader title="Please, select the time you are unavailable at:">
                    </CardHeader>
                    <CardContent className={classes.cardContent}>
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
