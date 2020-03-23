import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent } from '@material-ui/core';
import Markdown from 'src/components/Markdown';

const useStyles = makeStyles(() => ({
  root: {}
}));

function Description({ description, className, ...rest }) {
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Markdown source={description} />
      </CardContent>
    </Card>
  );
}

Description.propTypes = {
  description: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Description;
