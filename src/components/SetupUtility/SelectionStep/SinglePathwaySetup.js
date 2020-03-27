import React, { useState } from 'react';
import PathwayCreate from 'src/views/PathwayCreate';
import ModuleCreate from 'src/views/ModuleCreate';
import {
  Typography,
  CircularProgress,
  TextField,
  Button,
  Grid,
  makeStyles
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import SetupStepper from '../SetupStepper';

import {
  createPathway,
  addModuleToPathway,
  joinPathway
} from 'src/actions/pathwayActions';
import { createModule } from 'src/actions/moduleActions';

const useStyles = makeStyles(theme => ({
  inputContainer: {
    height: '40vh'
  }
}));

function isValidURL(string) {
  var res = string.match(
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
  );
  return res !== null;
}

const SinglePathwaySetup = () => {
  const [error, setError] = useState();
  const [linkError, setLinkError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [currentStep, setCurrentStep] = useState('getCourseInformation');
  const dispatch = useDispatch();
  const classes = useStyles();

  const user = useSelector(state => state.session.user);

  const showError = error => {
    setCurrentStep('error');
    setError(error);
  };

  const handleCreate = () => {
    if (title.length === 0) {
      setTitleError(true);
      return;
    }

    if (!isValidURL(link)) {
      setLinkError(true);
      return;
    }
    setCurrentStep('createPathway');

    const pathway = {
      pathwayName: `${user.firstName}'s ${title} Pathway`,
      description: `Automatically generated pathway based around ${title}`,
      occupation: 'autogenerated',
      tags: JSON.stringify(['autogenerated'])
    };

    const module = {
      moduleName: 'Starting Course',
      description: "Module autogenerated from user's initial course selection.",
      courses: JSON.stringify([
        {
          name: title,
          link
        }
      ])
    };

    dispatch(
      createPathway(
        // Creates pathway
        pathway,
        e => showError(e),
        returnedPathway => {
          // On successful pathway creation
          setCurrentStep('createModule');
          dispatch(
            createModule(
              // Creates module
              module,
              e => showError(e),
              returnedModule => {
                // On successful module creation
                setCurrentStep('addModuleToPathway');
                dispatch(
                  addModuleToPathway(
                    returnedModule.id,
                    returnedPathway.id,
                    e => showError(e),
                    // On successful pathway-module add
                    () => {
                      setCurrentStep('joiningPathway');
                      dispatch(
                        joinPathway(
                          returnedPathway.id,
                          e => showError(e),
                          setCurrentStep('finished')
                        )
                      );
                    }
                  )
                );
              }
            )
          );
        }
      )
    );
  };

  const generateStep = () => {
    if (currentStep === 'getCourseInformation') {
      const handleTitleChange = e => setTitle(e.target.value);
      const handleLinkChange = e => setLink(e.target.value);
      return (
        <Grid
          // className={classes.inputContainer}
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={2}
        >
          <Grid container item>
            <TextField
              id="courseTitle"
              onChange={handleTitleChange}
              value={title}
              error={titleError}
              label="Course Title"
              variant="outlined"
              placeholder="Enter the course's title"
            />
          </Grid>
          <Grid container item>
            <TextField
              id="courseLink"
              onChange={handleLinkChange}
              value={link}
              error={linkError}
              label="Course Link"
              variant="outlined"
              placeholder="Enter the course's link"
            />
          </Grid>
          <Grid container item>
            <Button onClick={handleCreate} variant="contained">
              Create
            </Button>
          </Grid>
        </Grid>
      );
    }
    if (currentStep === 'createPathway') {
      return (
        <>
          <CircularProgress />
          <Typography>Creating your pathway...</Typography>
        </>
      );
    }

    if (currentStep === 'createModule') {
      return (
        <>
          <CircularProgress />
          <Typography>Creating your modules...</Typography>
        </>
      );
    }

    if (currentStep === 'addModuleToPathway') {
      return (
        <>
          <CircularProgress />
          <Typography>Linking your modules to your pathway...</Typography>
        </>
      );
    }

    if (currentStep === 'joiningPathway') {
      return (
        <>
          <CircularProgress />
          <Typography>Finishing up your pathway and joining it...</Typography>
        </>
      );
    }

    if (currentStep === 'finished') {
      return (
        <Typography>
          Successfully joined pathway. You&apos;re all set!
        </Typography>
      );
    }

    if (currentStep === 'error') {
      return (
        <>
          <Typography>
            {error
              ? error.message
              : 'Something went wrong with creating your plan.'}
          </Typography>

          <Button
            onClick={() => setCurrentStep('getCourseInformation')}
            variant="contained"
          >
            Retry
          </Button>
        </>
      );
    }
    return (
      <Typography>There was a problem rendering this component.</Typography>
    );
  };

  return generateStep();
};

export default SinglePathwaySetup;
