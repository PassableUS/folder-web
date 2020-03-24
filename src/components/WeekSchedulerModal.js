import React, { useState } from 'react';
import moment from 'moment';
import {
    Modal
} from '@material-ui/core';
import WeekScheduler from './WeekScheduler';

function WeekSchedulerModal() {
    const user = JSON.parse(localStorage.getItem('userProfile'));
    const lastWeekSchedulerSaved = user.busyTimesLastAsked || 0;
    const dontShowModalAgain = user.neverAskBusyTimes;
    const nowTime = (new Date).getTime();
    const shownThisWeek = moment(nowTime).startOf('week').isSame(moment(lastWeekSchedulerSaved).startOf('week'), 'day');

    const [modal, setModal] = useState({
        open: true
    });

    const handleModalClose = () => {
        setModal({
            open: false
        });
    };

    return (
        <>
            {
                (!dontShowModalAgain && !shownThisWeek && user.registrationStatus == "finished") &&

                <Modal
                    onClose={handleModalClose}
                    open={modal.open}
                >
                    <WeekScheduler handleModalClose={handleModalClose}></WeekScheduler>
                </Modal>
            }
        </>
    );
}


export default WeekSchedulerModal;
