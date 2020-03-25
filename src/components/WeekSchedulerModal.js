import React, { useState } from 'react';
import moment from 'moment';
import { Modal, makeStyles, Card, CardContent } from '@material-ui/core';
import WeekScheduler from './WeekScheduler';

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

function WeekSchedulerModal() {
  const user = JSON.parse(localStorage.getItem('userProfile'));
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
  };

  return (
    <>
      {!dontShowModalAgain &&
        !shownThisWeek &&
        user.registrationStatus == 'finished' && (
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

export default WeekSchedulerModal;
