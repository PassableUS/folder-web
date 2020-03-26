import React, { useState, useEffect } from 'react';
import moment from 'moment';
import {
    Modal
} from '@material-ui/core';
import PropTypes from 'prop-types';
import WeekScheduler from './WeekScheduler';

function WeekSchedulerModal({show, onModalClose }) {
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

        if (onModalClose) {
            onModalClose();
        }
    };

    useEffect(() => {
        if ([true, false].includes(show)) {
            setModal({ open: show });
        }
    }, [show]);

    return (
        <>
            {
                ((!dontShowModalAgain && !shownThisWeek && user.registrationStatus === "finished") || show) &&

                <Modal
                    onClose={handleModalClose}
                    open={modal.open}
                >
                    <>
                        <WeekScheduler show={show} handleModalClose={handleModalClose}></WeekScheduler>
                    </>
                </Modal>
            }
        </>
    );
}

WeekSchedulerModal.propTypes = {
    show: PropTypes.bool,
    onModalClose: PropTypes.func
}

export default WeekSchedulerModal;
