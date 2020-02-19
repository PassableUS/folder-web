import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Link,
  Typography,
  colors
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import removeMarkdown from 'remove-markdown';

const useStyles = makeStyles((theme) => ({
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
  courses: {
    padding: theme.spacing(0, 0, 0, 3),
  },
  addModuleButton: {
    margin: theme.spacing(2)
  },
  likedButton: {
    color: colors.red[600]
  },
  shareButton: {
    marginLeft: theme.spacing(1)
  },
  details: {
    padding: theme.spacing(2, 3)
  }
}));

function ModuleCard({ module, className, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        avatar={(
          <Avatar
            alt="Author"
            src={module.author.avatar}
          >
            {getInitials(`${module.author.firstName} ${module.author.lastName}`)}
          </Avatar>
        )}
        className={classes.header}
        disableTypography
        subheader={(
          <Typography variant="body2">
            by
            {' '}
            <Link
              color="textPrimary"
              component={RouterLink}
              to="/profile/1/timeline"
              variant="h6"
            >
              {`${module.author.firstName} ${module.author.lastName}`}
            </Link>
            {' '}
            | Updated:
            {' '}
            {moment().fromNow()}
          </Typography>
        )}
        title={(
          // <Link
          //   color="textPrimary"
          //   component={RouterLink}
          //   to={`/modules/${module.id}/overview`}
          //   variant="h5"
          // >
          <Typography variant="h5">
            {module.name}
          </Typography>
          // </Link>
        )}
      />
      <CardContent className={classes.content}>
        <div className={classes.description}>
          <Typography
            color="textSecondary"
            variant="subtitle2"
          >
            {removeMarkdown(module.description)}
          </Typography>
        </div>
        <div className={classes.courses}>
          {module.courses.map((course) => (
            <Typography>
              {course.name}
            </Typography>
          ))}
        </div>
        <Button
          className={classes.addModuleButton}
          color="secondary"
        >
          Add Module to Pathway
        </Button>
      </CardContent>
    </Card>
  );
}

ModuleCard.propTypes = {
  className: PropTypes.string,
  module: PropTypes.object.isRequired
};

export default ModuleCard;
