import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import RichEditor from 'src/components/RichEditor';

const useStyles = makeStyles(() => ({
  root: {}
}));

function PathwayDescription({ register, className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      {...rest}
      register="" // Register causes an issue when being passed to the card, so we replace it with an empty object.
      className={clsx(classes.root, className)}
    >

      {/* TODO: Implement validation for description */}
      <CardHeader title="Pathway description" />
      <CardContent>
        <RichEditor register={register} placeholder="Enter a description for the pathway..." />
      </CardContent>
    </Card>
  );
}

PathwayDescription.propTypes = {
  className: PropTypes.string
};

export default PathwayDescription;
