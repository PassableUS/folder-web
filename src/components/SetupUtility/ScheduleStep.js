import React from 'react';
import WeekScheduler from 'src/components/WeekScheduler';

const SelectionStep = ({ handleBack, handleNext }) => {
  return (
    <WeekScheduler
      userFlowMode
      handleBack={handleBack}
      handleNext={handleNext}
      handleModalClose={() => {}}
    />
  );
};

export default SelectionStep;
