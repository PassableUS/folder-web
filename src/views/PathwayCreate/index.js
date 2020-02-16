import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Button, CircularProgress } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import AboutAuthor from './AboutAuthor';
import AboutPathway from './AboutPathway';
import Preferences from './Preferences';
import ProjectCover from './PathwayCover';
import PathwayDescription from './PathwayDescription';
import { useForm } from "react-hook-form";
import Alert from 'src/components/Alert';
import { createPathway } from 'src/actions/pathwayActions';
import { useDispatch, useSelector } from 'react-redux';
import SnackbarNotification from 'src/components/SnackbarNotification';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  aboutAuthor: {
    marginTop: theme.spacing(3)
  },
  formAlert: {
    marginBottom: theme.spacing(2)
  },
  aboutPathway: {
    marginTop: theme.spacing(3)
  },
  projectCover: {
    marginTop: theme.spacing(3)
  },
  pathwayDescription: {
    marginTop: theme.spacing(3)
  },
  preferences: {
    marginTop: theme.spacing(3)
  },
  actions: {
    marginTop: theme.spacing(3)
  }
}));

const PathwayCreate = ({ history }) => {
  const classes = useStyles();
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  // const history = useHistory();

  const pathwayCreateIsLoading = useSelector(state => state.pathway.isLoadingData)

  // Snackbar State
  const [snackbarState, setSnackbarState] = useState('');
  const showSnackbarWithNewState = (state) => {
    setSnackbarState(''); // Triggers rerender
    setSnackbarState(state);
  }

  // Pathway creation logic
  const onSuccess = (data) => {
    showSnackbarWithNewState('success')
    history.push(data.id)
  }
  const onFailure = () => showSnackbarWithNewState('error')

  const onSubmit = data => dispatch(createPathway(data, onFailure, onSuccess));

  return (
    <Page
      className={classes.root}
      title="Create a Pathway"
    >
      <Container maxWidth="lg">
        <Header />
        <AboutAuthor errors={errors} register={register} className={classes.aboutAuthor} />
        <AboutPathway errors={errors} register={register} className={classes.aboutPathway} />
        <ProjectCover errors={errors} register={register} className={classes.projectCover} />
        <PathwayDescription errors={errors} register={register} className={classes.pathwayDescription} />
        <Preferences errors={errors} register={register} className={classes.preferences} />
        {/* Error messages if form elements are not filled */}
        {Object.keys(errors).map(error => (
          <Alert
            key={error}
            variant="error"
            className={classes.formAlert}
            message={`${error} is required`}
          />
        ))}
        <div className={classes.actions}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleSubmit(onSubmit)}
          >
            {pathwayCreateIsLoading ?
              <CircularProgress size={25} color="secondary" /> :
              "Create pathway"
            }
          </Button>
        </div>
      </Container>

      <SnackbarNotification
        errorMessage={'Something went wrong while trying to create the pathway!'}
        successMessage={'Successfully created pathway!'}
        snackbarState={snackbarState}
      />
    </Page>
  );
}

export default PathwayCreate;
