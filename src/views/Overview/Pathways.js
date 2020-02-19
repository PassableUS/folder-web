import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Button } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import PathwayCard from 'src/components/PathwayCard';
import { useDispatch } from 'react-redux';
import { fetchPathways } from 'src/actions/pathwayActions';

const useStyles = makeStyles((theme) => ({
  root: {},
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2)
  },
  title: {
    position: 'relative',
    '&:before': {
      position: 'absolute',
      bottom: -8,
      left: 0,
      content: '" "',
      height: 3,
      width: 48,
      backgroundColor: theme.palette.primary.main
    }
  },
  arrowIcon: {
    marginLeft: theme.spacing(1)
  }
}));

function Pathways({ className, ...rest }) {
  const classes = useStyles();
  const [pathways, setPathways] = useState([]);
  const dispatch = useDispatch();

  const onSuccess = (data) => setPathways(data);
  const onFailure = () => console.log('Unable to fetch pathways.');

  useEffect(() => {
    dispatch(fetchPathways(onFailure, onSuccess));
  }, [dispatch]);

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.header}>
        <Typography
          className={classes.title}
          variant="h5"
        >
          Active Pathways
        </Typography>
        <Button
          component={RouterLink}
          to="/pathways"
        >
          See all
          <KeyboardArrowRightIcon className={classes.arrowIcon} />
        </Button>
      </div>
      {pathways.map((pathway) => (
        <PathwayCard
          key={pathway.id}
          pathway={pathway}
        />
      ))}
    </div>
  );
}

Pathways.propTypes = {
  className: PropTypes.string
};

export default Pathways;
