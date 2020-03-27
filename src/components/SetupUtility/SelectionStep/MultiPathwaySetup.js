import React, { useState } from 'react';
import PathwayCreate from 'src/views/PathwayCreate';
import ModuleCreate from 'src/views/ModuleCreate';
import { Typography, CircularProgress } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { joinPathway } from 'src/actions/pathwayActions';

const ExistingPathwaySetup = () => {
  const [pathwayId, setPathwayId] = useState();
  const [currentStep, setCurrentStep] = useState('createPathway');
  const dispatch = useDispatch();

  const goToModuleStep = id => {
    setPathwayId(id);
    setCurrentStep('createModule');
    // eslint-disable-next-line no-alert
    alert(
      'Now, create a module to hold your courses. This module will automatically be added to the pathway you just created.'
    );
  };

  const goToFinalStep = () => {
    setCurrentStep('joiningPathway');
    dispatch(
      joinPathway(
        pathwayId,
        // eslint-disable-next-line no-alert
        () => alert('There was an error joining the pathway!'),
        () => setCurrentStep('finished')
      )
    );
  };

  const generateStep = () => {
    if (currentStep === 'createPathway') {
      return (
        <PathwayCreate
          className="pathwayCreate"
          goToModuleStep={goToModuleStep}
          userFlowMode
        />
      );
    }
    if (currentStep === 'createModule') {
      return (
        <ModuleCreate
          className="createModule"
          userFlowMode
          userFlowPathwayId={pathwayId}
          goToFinalStep={goToFinalStep}
        />
      );
    }

    if (currentStep === 'joiningPathway') {
      return (
        <>
          <CircularProgress />
          <Typography>Joining Pathway...</Typography>
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
    return (
      <Typography>There was a problem rendering this component.</Typography>
    );
  };

  return generateStep();
};

export default ExistingPathwaySetup;
