import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Container,
  Tabs,
  Tab,
  Divider,
  colors
} from '@material-ui/core';
import Page from 'src/components/Page';
import Alert from 'src/components/Alert';
import { fetchPathway } from 'src/actions/pathwayActions';
import { useDispatch } from 'react-redux';
import Header from './Header';
import Overview from './Overview';
import Curriculum from './Curriculum';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  tabs: {
    marginTop: theme.spacing(3)
  },
  divider: {
    backgroundColor: colors.grey[300]
  },
  alert: {
    marginTop: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(3)
  }
}));

function PathwayDetails({ match, history }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id, tab } = match.params;
  const [openAlert, setOpenAlert] = useState(true);
  const [pathway, setPathway] = useState(null);
  const tabs = [
    { value: 'overview', label: 'Overview' },
    { value: 'curriculum', label: 'Curriculum' },
    // { value: 'activity', label: 'Activity' },
    // { value: 'subscribers', label: 'Subscribers' }
  ];

  const handleAlertClose = () => {
    setOpenAlert(false);
  };

  const handleTabsChange = (event, value) => {
    history.push(value);
  };

  useEffect(() => {
    // TODO: Improve the handler for failure
    dispatch(fetchPathway(id, () => console.log('There was an error fetching the pathway.'), (data) => setPathway(data)));
  }, [dispatch, id]);

  if (!tab) {
    return <Redirect to={`/pathways/${id}/overview`} />;
  }

  // Redirects to 404 if the user tries to access a tab that does not exist
  if (!tabs.find((t) => t.value === tab)) {
    return <Redirect to="/errors/error-404" />;
  }

  // If no project, returns null
  if (!pathway) {
    return null;
  }


  return (
    <Page
      className={classes.root}
      title="Pathway Details"
    >
      <Container maxWidth="lg">
        <Header pathway={pathway} />
        <Tabs
          className={classes.tabs}
          onChange={handleTabsChange}
          scrollButtons="auto"
          value={tab}
          variant="scrollable"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.value}
              label={tab.label}
              value={tab.value}
            />
          ))}
        </Tabs>
        <Divider className={classes.divider} />
        {openAlert && (
          <Alert
            className={classes.alert}
            message="This pathway has not been updated to support the current pathway schema. Please ask the creator to update their pathway to take advantage of all of Folder's new features."
            onClose={handleAlertClose}
          />
        )}
        <div className={classes.content}>
          {tab === 'overview' && <Overview pathway={pathway} />}
          {tab === 'curriculum' && <Curriculum pathway={pathway} />}
          {/* {tab === 'subscribers' && (
            <Subscribers subscribers={project.subscribers} />
          )} */}
        </div>
      </Container>
    </Page>
  );
}

PathwayDetails.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default PathwayDetails;
