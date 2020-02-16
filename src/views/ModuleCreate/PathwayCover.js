import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import FilesDropzone from 'src/components/FilesDropzone';
import Alert from 'src/components/Alert';

const useStyles = makeStyles((theme) => ({
  root: {},
  alert: {
    marginBottom: theme.spacing(3)
  }
}));

function PathwayCover({ register, className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      {...rest}
      register={''} // Register causes an issue when being passed to the card, so we replace it with an empty object. 
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Pathway cover" />
      <CardContent>
        <Alert
          className={classes.alert}
          message="Images are not fully supported just yet. Rapid development may cause the database table surrounding images to be formatted."
        />
        <FilesDropzone />
      </CardContent>
    </Card>
  );
}

PathwayCover.propTypes = {
  className: PropTypes.string
};

export default PathwayCover;
