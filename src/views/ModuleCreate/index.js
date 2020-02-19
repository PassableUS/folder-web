import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Button, CircularProgress } from '@material-ui/core';
import Page from 'src/components/Page';
import { useForm } from 'react-hook-form';
import Alert from 'src/components/Alert';
import { useDispatch, useSelector } from 'react-redux';
import SnackbarNotification from 'src/components/SnackbarNotification';
import { createModule } from 'src/actions/moduleActions';
import { useHistory, useParams } from 'react-router';
import { addModuleToPathway } from 'src/actions/pathwayActions';
import ModuleDescription from './ModuleDescription';
import ModuleCourses from './ModuleCourses';
import AboutModule from './AboutModule';
import Header from './Header';

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
  aboutModule: {
    marginTop: theme.spacing(3)
  },
  moduleCourses: {
    marginTop: theme.spacing(3)
  },
  projectCover: {
    marginTop: theme.spacing(3)
  },
  moduleDescription: {
    marginTop: theme.spacing(3)
  },
  preferences: {
    marginTop: theme.spacing(3)
  },
  actions: {
    marginTop: theme.spacing(3)
  }
}));

const ModuleCreate = () => {
  const classes = useStyles();
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const moduleCreateIsLoading = useSelector((state) => state.module.isLoadingData);

  // Snackbar State
  const [snackbarState, setSnackbarState] = useState('');
  const showSnackbarWithNewState = (state) => {
    setSnackbarState(''); // Triggers rerender
    setSnackbarState(state);
  };

  // Module creation logic
  const onSuccess = (data) => {
    showSnackbarWithNewState('success');

    // Adds module to pathway if ID present in URL
    if (id) {
      history.push(`/pathways/${id}`);
      dispatch(addModuleToPathway(data.id, id));
    }
  };
  const onFailure = () => showSnackbarWithNewState('error');
  const onSubmit = (data) => dispatch(createModule(data, onFailure, onSuccess));

  return (
    <Page
      className={classes.root}
      title="Create a New Module"
    >
      <Container maxWidth="lg">
        <Header />
        <AboutModule errors={errors} register={register} className={classes.aboutModule} />
        <ModuleDescription errors={errors} register={register} className={classes.moduleDescription} />
        <ModuleCourses errors={errors} register={register} className={classes.moduleCourses} />
        {/* <AboutAuthor errors={errors} register={register} className={classes.aboutAuthor} /> */}
        {/* <ProjectCover errors={errors} register={register} className={classes.projectCover} /> */}
        {/* <Preferences errors={errors} register={register} className={classes.preferences} /> */}
        {/* Error messages if form elements are not filled */}
        {Object.keys(errors).map((error) => (
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
            {moduleCreateIsLoading
              ? <CircularProgress size={25} color="secondary" />
              : 'Create module'}
          </Button>
        </div>
      </Container>

      <SnackbarNotification
        errorMessage="Something went wrong while trying to create the module!"
        successMessage="Successfully created module!"
        snackbarState={snackbarState}
      />
    </Page>
  );
};

export default ModuleCreate;
