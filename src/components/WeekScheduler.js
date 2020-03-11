import React, { useState } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
    Modal,
    Card,
    CardHeader,
    CardActions,
    Button
} from '@material-ui/core';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';

import Calendar from '../views/Calendar';

const useStyles = makeStyles((theme) => ({
    card: {
        display: "flex",
        flexDirection: "column",
        height: "calc(100% - 80px)",
        width: "calc(100% - 80px)",
        margin: "40px"
    },
    calendarCard: {
        overflowY: "scroll",
    },
    actionButton: {
        marginLeft: "auto"
    }
}));

function WeekScheduler() {
    //helpers to check if dates are from the same week
    const startOfWeek = (_moment, _offset) => {
        return _moment.add("days", _moment.weekday() * -1 + (_moment.weekday() >= 7 + _offset ? 7 + _offset : _offset));
    }

    const isSameWeek = (firstDay, secondDay, offset) => {
        const firstMoment = moment(firstDay);
        const secondMoment = moment(secondDay);

        return startOfWeek(firstMoment, offset).isSame(startOfWeek(secondMoment, offset), "day");
    }

    //check if modal with dates was shown and then show if
    const lastWeekSchedulerSaved = localStorage.getItem("lastWeekSchedulerSaved") || '0';
    const dontShowModalAgain = !!localStorage.getItem("dontShowModalAgain");
    const classes = useStyles();
    const nowTime = (new Date).getTime();
    const shownThisWeek = isSameWeek(nowTime, Number(lastWeekSchedulerSaved));

    console.log('shownThisWeek', shownThisWeek, nowTime, lastWeekSchedulerSaved)

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
        localStorage.setItem("dontShowModalAgain", "true");
        setModal({
            open: false
        });
    }

    const handleSave = () => {
        console.log('events', events)
        localStorage.setItem("lastWeekSchedulerSaved", nowTime.toString());
        setModal({
            open: false
        });
    }

    return (
        <>
        {
            !dontShowModalAgain && !shownThisWeek &&

            <Modal
                onClose={handleModalClose}
                open={modal.open}
            >
                <Card className={classes.card}>
                    <CardHeader title="Please, select the time you are unavailable at:">
                    </CardHeader>
                    <Card className={classes.calendarCard}>
                        <Calendar weekScheduler={true} getSelectedDateTime={handleDateTimeSelect}></Calendar>
                    </Card>
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
