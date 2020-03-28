import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { fetchCalendarEvents } from 'src/actions/calendarActions';
import moment from 'moment';
import uuid from 'uuid/v1';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import timelinePlugin from '@fullcalendar/timeline';
import { makeStyles } from '@material-ui/styles';
import {
  Container,
  Modal,
  Card,
  CardContent,
  colors,
  useTheme,
  useMediaQuery,
  Divider
} from '@material-ui/core';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import '@fullcalendar/list/main.css';

import Page from 'src/components/Page';
import AddEditEvent from './AddEditEvent';
import Toolbar from './Toolbar';
import { getStudyTimes } from './getStudyTimes';
import WeekSchedulerModal from 'src/components/WeekSchedulerModal';
import Alert from 'src/components/Alert';

const useStyles = makeStyles(theme => ({
  rootNonModal: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  root: {
    '& .fc-unthemed td': {
      borderColor: theme.palette.divider
    },
    '& .fc-widget-header': {
      backgroundColor: colors.grey[50]
    },
    '& .fc-axis': {
      ...theme.typography.body2
    },
    '& .fc-list-item-time': {
      ...theme.typography.body2
    },
    '& .fc-list-item-title': {
      ...theme.typography.body1
    },
    '& .fc-list-heading-main': {
      ...theme.typography.h6
    },
    '& .fc-list-heading-alt': {
      ...theme.typography.h6
    },
    '& .fc th': {
      borderColor: theme.palette.divider
    },
    '& .fc-day-header': {
      ...theme.typography.subtitle2,
      fontWeight: 500,
      color: theme.palette.text.secondary,
      padding: theme.spacing(1),
      backgroundColor: colors.grey[50]
    },
    '& .fc-day-top': {
      ...theme.typography.body2
    },
    '& .fc-highlight': {
      backgroundColor: colors.blueGrey[50]
    },
    '& .fc-event': {
      color: theme.palette.primary.contrastText,
      borderWidth: 2,
      opacity: 0.9,
      '& .fc-time': {
        ...theme.typography.h6,
        color: 'inherit'
      },
      '& .fc-title': {
        ...theme.typography.body1,
        color: 'inherit'
      }
    },
    '& .fc-list-empty': {
      ...theme.typography.subtitle1
    }
  },
  card: {
    marginTop: theme.spacing(3)
  },
  divider: {
    marginBottom: theme.spacing(3)
  }
}));

function Calendar({ weekScheduler, getSelectedDateTime }) {
  const user = JSON.parse(localStorage.getItem('userProfile'));
  const classes = useStyles();
  const calendarRef = useRef(null);
  const theme = useTheme();
  const dispatch = useDispatch();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));
  const [view, setView] = useState('listWeek');
  const [date, setDate] = useState(moment().toDate());
  const [events, setEvents] = useState([]);
  const [studyAlert, setStudyAlert] = useState(false);
  const [showWeekScheduler, setShowWeekScheduler] = useState(false);
  const [eventModal, setEventModal] = useState({
    open: false,
    event: null
  });

  const handleEventClick = info => {
    let selected = events.find(event => event.id === info.event.id);

    if (info.event.title === 'Suggested study time') {
      selected = events.find(
        event =>
          moment(event.start).isSame(moment(info.event.start)) &&
          moment(event.end).isSame(moment(info.event.end))
      );
    }
    setEventModal({
      open: true,
      event: selected
    });
  };

  const handleDateSelect = event => {
    // if (!weekScheduler) return;
    const calendarApi = calendarRef.current.getApi();
    calendarApi.unselect();

    const selectedEvent = {
      id: uuid(),
      title: 'Busy time',
      allDay: event.allDay,
      start: event.start,
      end: event.end
    };
    console.log('event select', event);

    setEvents(currentEvents => [...currentEvents, selectedEvent]);
    getSelectedDateTime(selectedEvent);
    setEventModal({
      open: false,
      event: event
    });
  };

  const handleEventNew = () => {
    setEventModal({
      open: true,
      event: null
    });
  };

  const handleEventDelete = event => {
    setEvents(currentEvents => currentEvents.filter(e => e.id !== event.id));
    setEventModal({
      open: false,
      event: null
    });
  };

  const handleModalClose = () => {
    setEventModal({
      open: false,
      event: null
    });
  };

  const handleEventAdd = event => {
    setEvents(currentEvents => [...currentEvents, event]);
    setEventModal({
      open: false,
      event: null
    });
  };

  const handleEventEdit = event => {
    setEvents(currentEvents =>
      currentEvents.map(e => (e.id === event.id ? event : e))
    );
    setEventModal({
      open: false,
      event: null
    });
  };

  const handleDateToday = () => {
    const calendarApi = calendarRef.current.getApi();

    calendarApi.today();
    setDate(calendarApi.getDate());
  };

  const handleViewChange = newView => {
    const calendarApi = calendarRef.current.getApi();
    calendarApi.changeView(newView);
    setView(newView);
  };

  const handleDatePrev = () => {
    const calendarApi = calendarRef.current.getApi();

    calendarApi.prev();
    setDate(calendarApi.getDate());
  };

  const handleDateNext = () => {
    const calendarApi = calendarRef.current.getApi();

    calendarApi.next();
    setDate(calendarApi.getDate());
  };

  const getStudyEvents = (events, days, minutes) => {
    const daysToWork = days || user.studyDaysPerWeek;
    const minutesToWork = minutes || user.studyMinutesPerDay;

    const studyTimes = getStudyTimes(events, daysToWork, minutesToWork);

    return studyTimes.map(time => {
      time.title = 'Suggested study time';
      time.color = theme.palette.secondary.main;
      return time;
    });
  };

  const prepareOtherEvents = events => {
    return events.map(event => {
      event.color = theme.palette.primary.main;
      return event;
    });
  };

  const handleBusyTimesSave = busyTimeData => {
    const busyTimes = [];
    const others = [];

    events.forEach(event => {
      if (event.title === 'Busy time') {
        busyTimes.push(event);
      } else if (event.title !== 'Suggested study time') {
        others.push(event);
      }
    });

    const studyEvents = getStudyEvents(
      [...busyTimeData.events, ...busyTimes],
      busyTimeData.studyDaysPerWeek,
      busyTimeData.studyMinutesPerDay
    );
    console.log(busyTimes);
    setEvents([...others, ...busyTimes, ...studyEvents]);
  };

  const handleCloseStudyAlert = () => {
    setStudyAlert(false);
  };

  const handleNewBusyEvent = () => {
    setShowWeekScheduler(true);
  };

  const onModalClose = () => {
    setShowWeekScheduler(false);
  };

  useEffect(() => {
    let mounted = true;

    const fetchEvents = () => {
      if (mounted) {
        const onSuccess = data => {
          const studyEvents = getStudyEvents(data);
          const otherEvents = prepareOtherEvents(data);
          setEvents([...otherEvents, ...studyEvents]);
          setStudyAlert(studyEvents.length < user.studyDaysPerWeek);
        };

        const onFailure = () => {};
        dispatch(fetchCalendarEvents(onFailure, onSuccess));
      }
    };

    fetchEvents();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const calendarApi = calendarRef.current.getApi();
    const newView = weekScheduler
      ? 'timeGridWeek' // Scheduler view
      : mobileDevice
      ? 'listWeek'
      : 'listWeek';

    if (weekScheduler) {
      handleDateToday();
    }
    calendarApi.changeView(newView);
    setView(newView);
  }, [mobileDevice]);

  return (
    <Page
      className={[
        classes.root,
        !weekScheduler ? classes.rootNonModal : ''
      ].join(' ')}
      title="Calendar"
    >
      {!weekScheduler && (
        <WeekSchedulerModal
          show={showWeekScheduler}
          onModalClose={onModalClose}
          onSave={handleBusyTimesSave}
        ></WeekSchedulerModal>
      )}
      {studyAlert && (
        <>
          <Alert
            className={classes.alert}
            message="You don't have enough time to study your planned amount of days per week."
            onClose={handleCloseStudyAlert}
          />
          <Divider className={classes.divider} />
        </>
      )}
      <Container maxWidth={false}>
        {!weekScheduler && (
          <Toolbar
            date={date}
            onDateNext={handleDateNext}
            onDatePrev={handleDatePrev}
            onDateToday={handleDateToday}
            onEventAdd={handleEventNew}
            onBusyEventAdd={handleNewBusyEvent}
            onViewChange={handleViewChange}
            view={view}
          />
        )}
        <Card className={classes.card}>
          <CardContent>
            <FullCalendar
              allDayMaintainDuration
              defaultDate={date}
              defaultView={view}
              droppable
              editable
              eventClick={handleEventClick}
              eventResizableFromStart
              events={events}
              header={false}
              height={800}
              plugins={[
                dayGridPlugin,
                timeGridPlugin,
                interactionPlugin,
                listPlugin,
                timelinePlugin
              ]}
              ref={calendarRef}
              rerenderDelay={10}
              selectable
              selectMirror={true}
              select={handleDateSelect}
              weekends
            />
          </CardContent>
        </Card>
        <Modal onClose={handleModalClose} open={eventModal.open}>
          <AddEditEvent
            event={eventModal.event}
            onAdd={handleEventAdd}
            onCancel={handleModalClose}
            onDelete={handleEventDelete}
            onEdit={handleEventEdit}
          />
        </Modal>
      </Container>
    </Page>
  );
}

Calendar.propTypes = {
  weekScheduler: PropTypes.bool,
  getSelectedDateTime: PropTypes.func
};

export default Calendar;
