import React from 'react';
import GoalsSetup from 'src/components/GoalsSetup';

const GoalStep = ({ handleBack, handleNext }) => {
  return (
    <GoalsSetup
      handleBack={handleBack}
      handleNext={handleNext}
      show
      userFlowMode
      mode="week"
    />
  );
};

export default GoalStep;
