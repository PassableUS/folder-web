import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { 
  Card,
  CardContent,
  CardActions,
  Button
} from '@material-ui/core';
import Markdown from 'src/components/Markdown';
import GoalsSetup from 'src/components/GoalsSetup';
import GoalsList from 'src/components/GoalsList';

const useStyles = makeStyles(() => ({
  root: {}
}));

function Description({ description, id, className, ...rest }) {
  const classes = useStyles();
  const [ showGoalsModal, setGoalsModal ] = useState(false);
  
  const takePathway = () => {
    setGoalsModal(true);
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Markdown source={description} />
        <Card>
          <CardContent>
            <GoalsList mode="pathway" pathwayData={{id}}></GoalsList>
          </CardContent>
          <CardActions>
            <Button 
            onClick={takePathway}
            color="primary"
            size="small">
              Take pathway
            </Button>
            <GoalsSetup mode="pathway" show={showGoalsModal} activateBybutton={true} pathwayData={{id}} ></GoalsSetup>
          </CardActions>
        </Card>
      </CardContent>
    </Card>
  );
}

Description.propTypes = {
  description: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Description;
