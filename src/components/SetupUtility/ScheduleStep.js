import React from 'react';
import PropTypes from 'prop-types';

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

SelectionStep.propTypes = {
  handleBack: PropTypes.func,
  handleNext: PropTypes.func
};

export default SelectionStep;
