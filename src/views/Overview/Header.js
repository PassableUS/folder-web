import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid, Button, Hidden } from '@material-ui/core';
import BarChartIcon from '@material-ui/icons/BarChart';
import { useHistory } from 'react-router';

const useStyles = makeStyles(theme => ({
  root: {},
  summaryButton: {
    backgroundColor: theme.palette.common.white
  },
  barChartIcon: {
    marginRight: theme.spacing(1)
  },
  image: {
    width: '100%',
    maxHeight: 400
  }
}));

function Header({ className, ...rest }) {
  const classes = useStyles();
  const session = useSelector(state => state.session);
  const history = useHistory();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Grid alignItems="center" container justify="space-between" spacing={3}>
        <Grid item md={6} xs={12}>
          <Typography component="h2" gutterBottom variant="overline">
            Home
          </Typography>
          <Typography component="h1" gutterBottom variant="h3">
            Hey {session.user.firstName}!
          </Typography>
          <Typography gutterBottom variant="subtitle1">
            We've prepared your lesson plan for today.
          </Typography>
          <Button
            className={classes.summaryButton}
            edge="start"
            variant="contained"
            onClick={() => history.push('/calendar')}
          >
            <BarChartIcon className={classes.barChartIcon} />
            View today's plan
          </Button>
        </Grid>
        <Hidden smDown>
          <Grid item md={6}>
            <img
              alt="Cover"
              className={classes.image}
              src="/images/startup.svg"
            />
          </Grid>
        </Hidden>
      </Grid>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string
};

export default Header;
