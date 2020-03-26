import React, { useState } from 'react';
import PathwayCreate from 'src/views/PathwayCreate';
import ModuleCreate from 'src/views/ModuleCreate';

const ExistingPathwaySetup = () => {
  const [pathwayId, setPathwayId] = useState();
  const [currentStep, setCurrentStep] = useState('createPathway');

  const goToModuleStep = id => {
    setPathwayId(id);
    setCurrentStep('createModule');
    alert(
      'Now, create a module to hold your courses. This module will automatically be added to the pathway you just created.'
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
    } else if (currentStep === 'createModule') {
      return <ModuleCreate className="createModule" userFlowMode />;
    }

    return <p>There was a problem rendering this component.</p>;
  };

  return generateStep();
};

export default ExistingPathwaySetup;
