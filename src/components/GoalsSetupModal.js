import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import { Modal, Card, CardHeader, CardContent } from '@material-ui/core';
import GoalsSetup from './GoalsSetup';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
}));

function GoalsSetupModal({
  show,
  mode,
  pathwayData,
  courseData,
  onModalClose,
  onSave
}) {
  let user = JSON.parse(localStorage.getItem('userProfile'));

  if (!user) {
    user = {};
  }

  const lastWeekGoalSaved = user.weeklyGoalsLastAsked || '0';
  const dontShowModalAgain =
    mode == 'week'
      ? user.neverAskWeeklyGoals
      : mode == 'course'
        ? user.neverAskCourseGoals
        : user.neverAskPathwayGoals;
  const classes = useStyles();
  const nowTime = new Date().getTime();
  const shownThisWeek = moment(nowTime)
    .startOf('week')
    .isSame(moment(Number(lastWeekGoalSaved)).startOf('week'), 'day');
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

  const getModalTitle = () => {
    const titles = {
      week: 'Please, enter your weekly goals:',
      course: 'Please, enter your goals for this course:',
      pathway: 'Please, enter your goals for this pathway:'
    };

    return titles[mode];
  };

  return (
    <>
      {((!dontShowModalAgain &&
        user.registrationStatus == 'finished' &&
        (mode != 'week' || !shownThisWeek)) ||
        show) && (
          <Modal
            className={classes.modal}
            onClose={handleModalClose}
            open={modal.open}
          >
            <div>
              <Card className={classes.card}>
                <CardHeader title={getModalTitle()} />
                <CardContent>
                  <GoalsSetup
                    show={show}
                    mode={mode}
                    pathwayData={pathwayData}
                    courseData={courseData}
                    onModalClose={onModalClose}
                    onSave={onSave}
                  />
                </CardContent>
              </Card>
            </div>
          </Modal>
        )}
    </>
  );
}

GoalsSetupModal.propTypes = {
  show: PropTypes.bool,
  mode: PropTypes.oneOf(['course', 'pathway', 'week']),
  pathwayData: PropTypes.shape({ id: PropTypes.string }),
  courseData: PropTypes.shape({
    moduleId: PropTypes.string,
    courseURL: PropTypes.string
  }),
  onModalClose: PropTypes.func,
  onSave: PropTypes.func
};

export default GoalsSetupModal;
