import React, { useState } from 'react';
import { ButtonBase, Paper, Typography, makeStyles } from '@material-ui/core';
import SubjectIcon from '@material-ui/icons/Subject';
import MultiPathwaySetup from './MultiPathwaySetup';
import SinglePathwaySetup from './SinglePathwaySetup';
import ExistingPathwaySetup from './ExistingPathwaySetup';

const useStyles = makeStyles(theme => ({
  root: {},
  createButton: {
    height: 200,
    width: 200,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    '&:hover': {
      background: '#f5f5f5'
    }
  },
  formAlert: {
    marginBottom: theme.spacing(2)
  },
  actionText: {
    marginTop: 15,
    fontSize: 14
  },
  titleInput: {
    marginBottom: 10
  }
}));

const SelectionStep = () => {
  const classes = useStyles();
  const [selection, setSelection] = useState('selecting');

  // eslint-disable-next-line no-shadow
  const generateStepContent = selection => {
    if (selection === 'selecting') {
      return (
        <>
          <ButtonBase onClick={() => setSelection('multiPathway')}>
            <Paper variant="outlined" className={classes.createButton}>
              <SubjectIcon fontSize="large" />{' '}
              <Typography className={classes.actionText}>
                Create a pathway and add multiple courses to my account
              </Typography>
            </Paper>
          </ButtonBase>

          <ButtonBase onClick={() => setSelection('singlePathway')}>
            <Paper variant="outlined" className={classes.createButton}>
              <SubjectIcon fontSize="large" />{' '}
              <Typography className={classes.actionText}>
                Add a single course to my account
              </Typography>
            </Paper>
          </ButtonBase>

          <ButtonBase onClick={() => setSelection('existingPathway')}>
            <Paper variant="outlined" className={classes.createButton}>
              <SubjectIcon fontSize="large" />{' '}
              <Typography className={classes.actionText}>
                Browse existing offerings
              </Typography>
            </Paper>
          </ButtonBase>
        </>
      );
    }
    if (selection === 'singlePathway') {
      return <SinglePathwaySetup />;
    }
    if (selection === 'multiPathway') {
      return <MultiPathwaySetup />;
    }
    if (selection === 'existingPathway') {
      return <ExistingPathwaySetup />;
    }

    return <Typography>There was an error generating this step.</Typography>;
  };

  return generateStepContent(selection);
};

export default SelectionStep;
