import React, { useState, useEffect } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import WeekScheduler from './WeekScheduler';
import { Modal, makeStyles, Card, CardContent } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  header: {
    paddingLeft: theme.spacing(3)
  },
  subHeader: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
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
  }
}));

function WeekSchedulerModal({ show, onModalClose }) {
  let user = JSON.parse(localStorage.getItem('userProfile'));

  if (!user) {
    user = {};
  }

  const lastWeekSchedulerSaved = user.busyTimesLastAsked || 0;
  const dontShowModalAgain = user.neverAskBusyTimes;
  const nowTime = new Date().getTime();
  const classes = useStyles();
  const shownThisWeek = moment(nowTime)
    .startOf('week')
    .isSame(moment(lastWeekSchedulerSaved).startOf('week'), 'day');
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
      {((!dontShowModalAgain &&
        !shownThisWeek &&
        user.registrationStatus == 'finished') ||
        show) && (
        <Modal onClose={handleModalClose} open={modal.open}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <WeekScheduler
                handleModalClose={handleModalClose}
              ></WeekScheduler>
            </CardContent>
          </Card>
        </Modal>
      )}
    </>
  );
}

WeekSchedulerModal.propTypes = {
  show: PropTypes.bool,
  onModalClose: PropTypes.func
};

export default WeekSchedulerModal;
