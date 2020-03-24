import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
    Modal,
} from '@material-ui/core';
import GoalsSetup from './GoalsSetup';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}));

function GoalsSetupModal({ show, mode, pathwayData, courseData, onModalClose }) {
    const user = JSON.parse(localStorage.getItem('userProfile'));
    const lastWeekGoalSaved = user.weeklyGoalsLastAsked || '0';
    const dontShowModalAgain =
        mode == 'week' ?
            user.neverAskWeeklyGoals :
            (mode == 'course' ? user.neverAskCourseGoals : user.neverAskPathwayGoals);
    const classes = useStyles();
    const nowTime = (new Date).getTime();
    const shownThisWeek = moment(nowTime).startOf('week').isSame(moment(Number(lastWeekGoalSaved)).startOf('week'), 'day');
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
                ((!dontShowModalAgain && user.registrationStatus == "finished") || show) && (mode != 'week' || !shownThisWeek) &&

                <Modal
                    className={classes.modal}
                    onClose={handleModalClose}
                    open={modal.open}
                >
                    <div>
                        <GoalsSetup show={show} mode={mode} pathwayData={pathwayData} courseData={courseData} onModalClose={onModalClose}></GoalsSetup>
                    </div>
                </Modal>
            }
        </>
    );
}

GoalsSetupModal.propTypes = {
    show: PropTypes.bool,
    mode: PropTypes.oneOf(['course', 'pathway', 'week']),
    pathwayData: PropTypes.shape({ id: PropTypes.string }),
    courseData: PropTypes.shape({ moduleId: PropTypes.string, courseURL: PropTypes.string }),
    onModalClose: PropTypes.func
};

export default GoalsSetupModal;
