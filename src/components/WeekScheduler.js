import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {
    Modal,
    Card,
    CardHeader,
    Typography,
    colors,
    useTheme,
    useMediaQuery,
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
        height:  "calc(100% - 80px)",
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

    //check if modal with dates was shown and then show if
    const lastWeekSchedulerSaved = localStorage.getItem("lastWeekSchedulerSaved");
    const dontShowModalAgain = !!localStorage.getItem("dontShowModalAgain");
    const classes = useStyles();
    console.log('lastWeekSchedulerSaved', lastWeekSchedulerSaved, dontShowModalAgain)
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
        setModal({
            open: false
        });
    }

    return (
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
    );
}


export default WeekScheduler;
