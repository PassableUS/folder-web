import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import RichEditor from 'src/components/RichEditor';

const useStyles = makeStyles(() => ({
  root: {}
}));

function ModuleDescription({ register, className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      {...rest}
      register="" // Register causes an issue when being passed to the card, so we replace it with an empty object.
      className={clsx(classes.root, className)}
    >

      {/* TODO: Implement validation for description */}
      <CardHeader title="Module description" />
      <CardContent>
        <RichEditor register={register} placeholder="Enter a description for the module..." />
      </CardContent>
    </Card>
  );
}

ModuleDescription.propTypes = {
  className: PropTypes.string
};

export default ModuleDescription;
