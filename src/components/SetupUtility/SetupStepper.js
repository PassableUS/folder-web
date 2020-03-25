import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';

import SelectionStep from './SelectionStep';
import ScheduleStep from './ScheduleStep';
import GoalStep from './GoalStep';
import { updateUserRegistrationStatus } from 'src/actions/userActions';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%'
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  actionsContainer: {
    marginBottom: theme.spacing(2)
  },
  resetContainer: {
    padding: theme.spacing(3)
  }
}));

function getSteps() {
  return [
    'Enroll in a course or pathway',
    'Schedule your learning plan',
    'Set some goals'
  ];
}

const SetupStepper = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();
  const dispatch = useDispatch();

  const handleNext = () => {
    if (activeStep === 0) {
      dispatch(
        updateUserRegistrationStatus('calendar', () =>
          alert('There was an error updating your information.')
        )
      );
    } else if (activeStep === 1) {
      dispatch(
        updateUserRegistrationStatus('goals', () =>
          alert('There was an error updating your information.')
        )
      );
    } else if (activeStep === 2) {
      dispatch(
        updateUserRegistrationStatus('finished', () =>
          alert('There was an error updating your information.')
        )
      );
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <SelectionStep />;
      case 1:
        return <ScheduleStep handleBack={handleBack} handleNext={handleNext} />;
      case 2:
        return <GoalStep handleBack={handleBack} handleNext={handleNext} />;
      default:
        return 'Unknown step';
    }
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {getStepContent(index)}
              {activeStep === 0 ? (
                <div className={classes.actionsContainer}>
                  <div>
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      className={classes.button}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </div>
                </div>
              ) : null}
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
          </Button>
        </Paper>
      )}
    </div>
  );
};

export default SetupStepper;
