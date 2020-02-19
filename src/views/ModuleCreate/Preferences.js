import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  options: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column'
  },
  cardContent: {
    paddingTop: theme.spacing(1)
  }
}));

function Preferences({ className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      {...rest}
      register="" // Register causes an issue when being passed to the card, so we replace it with an empty object.
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Preferences" />
      <CardContent className={classes.cardContent}>
        <Typography
          gutterBottom
          variant="h6"
        >
          Privacy
        </Typography>
        <Typography variant="body2">
          You will receive emails regarding this pathway.
        </Typography>
        <div className={classes.options}>
          <FormControlLabel
            control={(
              <Checkbox
                color="primary"
                defaultChecked //
              />
            )}
            label="Allow my pathway to be customized"
          />
          <FormControlLabel
            control={(
              <Checkbox
                color="primary"
                defaultChecked //
              />
            )}
            label="Make my pathway public"
          />
        </div>
      </CardContent>
    </Card>
  );
}

Preferences.propTypes = {
  className: PropTypes.string
};

export default Preferences;
