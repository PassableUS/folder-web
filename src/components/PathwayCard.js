import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Link,
  Typography,
  CardActions,
  Button
} from '@material-ui/core';

import getInitials from 'src/utils/getInitials';
import Label from 'src/components/Label';
import removeMarkdown from 'remove-markdown';
import { useDispatch, useSelector } from 'react-redux';
import { joinPathway } from 'src/actions/pathwayActions';

const useStyles = makeStyles(theme => ({
  root: {},
  header: {
    paddingBottom: 0
  },
  content: {
    padding: 0,
    '&:last-child': {
      paddingBottom: 0
    }
  },
  description: {
    padding: theme.spacing(2, 3, 1, 3)
  },
  tags: {
    padding: theme.spacing(0, 3, 2, 3),
    '& > * + *': {
      marginLeft: theme.spacing(1)
    }
  },
  learnMoreButton: {
    marginLeft: theme.spacing(2)
  },
  shareButton: {
    marginLeft: theme.spacing(1)
  },
  details: {
    padding: theme.spacing(2, 3)
  }
}));

function PathwayCard({ pathway, className, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const enrolledPathways = useSelector(
    state => state.session.user.enrolledPathways
  );
  const [enrolledInPathway, setEnrolledInPathway] = useState(() =>
    enrolledPathways ? enrolledPathways.includes(pathway.id) : null
  );

  if (!pathway) {
    console.error('PathwayCard cannot render without `pathway` passed to it.');
    return null;
  }

  if (!pathway.author) {
    console.error(
      'PathwayCard missing author information, check to see if pathway is being passed to it. The author may have deleted its user.'
    );
    return null;
  }

  const handleJoinPathway = () => {
    dispatch(
      joinPathway(
        pathway.id,
        () => alert('There was an error joining the pathway.'),
        () => setEnrolledInPathway(true)
      )
    );
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader
        avatar={
          <Avatar alt="Author" src={pathway.author.avatar}>
            {getInitials(
              `${pathway.author.firstName} ${pathway.author.lastName}`
            )}
          </Avatar>
        }
        className={classes.header}
        disableTypography
        subheader={
          <Typography variant="body2">
            by{' '}
            <Link
              color="textPrimary"
              component={RouterLink}
              to="/profile/1/timeline"
              variant="h6"
            >
              {`${pathway.author.firstName} ${pathway.author.lastName}`}
            </Link>{' '}
            | Updated: {moment(pathway.updatedAt).fromNow()}
          </Typography>
        }
        title={
          <Link
            color="textPrimary"
            component={RouterLink}
            to={`/pathways/${pathway.id}/overview`}
            variant="h5"
          >
            {pathway.name}
          </Link>
        }
      />
      <CardContent className={classes.content}>
        <div className={classes.description}>
          <Typography color="textSecondary" variant="subtitle2">
            {removeMarkdown(pathway.description)}
          </Typography>
        </div>
        <div className={classes.tags}>
          {pathway.tags.map(tag => (
            <Label key={tag} color="green">
              {tag}
            </Label>
          ))}
        </div>
        <Divider />
        {/* <div className={classes.details}>
          <Grid
            alignItems="center"
            container
            justify="space-between"
            spacing={3}
          >
            <Grid item>
              <Typography variant="h5">
                $PLACEHOLDER
              </Typography>
              <Typography variant="body2">Per Project</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">PLACEHOLDER LOCATION</Typography>
              <Typography variant="body2">Location</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h5">PLACEHOLDER TYPE</Typography>
              <Typography variant="body2">Type</Typography>
            </Grid>
            <Grid item>
              {liked ? (
                <Tooltip title="Unlike">
                  <IconButton
                    className={classes.likedButton}
                    onClick={handleUnlike}
                    size="small"
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Like">
                  <IconButton
                    className={classes.likeButton}
                    onClick={handleLike}
                    size="small"
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="Share">
                <IconButton
                  className={classes.shareButton}
                  size="small"
                >
                  <ShareIcon />
                </IconButton>
              </Tooltip>
              <Button
                className={classes.learnMoreButton}
                component={RouterLink}
                size="small"
                to={`/pathways/${pathway.id}/overview`}
              >
                Learn more
              </Button>
            </Grid>
          </Grid>
        </div> */}
      </CardContent>
      {enrolledInPathway ? null : (
        <CardActions>
          <Button
            size="small"
            variant="contained"
            onClick={handleJoinPathway}
            color="primary"
          >
            Enroll in pathway
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

PathwayCard.propTypes = {
  className: PropTypes.string,
  pathway: PropTypes.object.isRequired
};

export default PathwayCard;
