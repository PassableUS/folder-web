import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid, Button, colors } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import Label from 'src/components/Label';
import CreateModuleModal from './CreateModuleModal';
import { useDispatch } from 'react-redux';
import { fetchPathway, joinPathway } from 'src/actions/pathwayActions';

const useStyles = makeStyles(theme => ({
  root: {},
  label: {
    marginTop: theme.spacing(1)
  },
  shareButton: {
    backgroundColor: theme.palette.common.white,
    marginRight: theme.spacing(2)
  },
  shareIcon: {
    marginRight: theme.spacing(1)
  },
  createButton: {
    color: theme.palette.common.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  },
  joinButton: {
    color: theme.palette.common.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    },
    marginLeft: theme.spacing(2)
  }
}));

function Header({ pathway, className, ...rest }) {
  const classes = useStyles();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const [userJustEnrolled, setUserJustEnrolled] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleJoinPathway = () => {
    dispatch(
      joinPathway(
        pathway.id,
        () => alert('There was an error joining the pathway.'),
        () => setUserJustEnrolled(true)
      )
    );
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Grid alignItems="flex-end" container justify="space-between" spacing={3}>
        <Grid item>
          <Typography component="h2" gutterBottom variant="overline">
            Browse pathways
          </Typography>
          <Typography component="h1" gutterBottom variant="h3">
            {pathway.name}
          </Typography>
          {pathway.tags.map(tag => (
            <Label
              className={classes.label}
              color={colors.green[600]}
              variant="outlined"
              key={tag}
            >
              {tag}
            </Label>
          ))}
        </Grid>
        <Grid item>
          <Button
            onClick={() => alert('Awaiting API access for sharing support.')}
            className={classes.shareButton}
            variant="contained"
          >
            <ShareIcon className={classes.shareIcon} />
            Share
          </Button>
          {pathway.isOwner ? (
            <Button
              className={classes.createButton}
              onClick={handleModalOpen}
              variant="contained"
            >
              Create Module
            </Button>
          ) : null}

          {!pathway.isEnrolled && !userJustEnrolled ? (
            <Button
              className={classes.joinButton}
              onClick={handleJoinPathway}
              variant="contained"
            >
              Join Pathway
            </Button>
          ) : null}
        </Grid>
      </Grid>
      <CreateModuleModal
        pathway={pathway}
        onSubmit={handleModalClose}
        onClose={handleModalClose}
        open={isModalOpen}
      />
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  pathway: PropTypes.object.isRequired
};

Header.defaultProps = {};

export default Header;
