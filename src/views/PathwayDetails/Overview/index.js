import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Button
} from '@material-ui/core';
import GoalsSetup from 'src/components/GoalsSetup';
import GoalsList from 'src/components/GoalsList';
import Description from './Description';
// import Deliverables from './Deliverables';
// import Holder from './Holder';
// import Members from './Members';

const useStyles = makeStyles(theme => ({
  root: {},
  deliverables: {
    marginTop: theme.spacing(3)
  },
  members: {
    marginTop: theme.spacing(3)
  }
}));

function Overview({ pathway, className, ...rest }) {
  const classes = useStyles();
  const [showGoalsModal, setGoalsModal] = useState(false);
  const takePathway = () => {
    setGoalsModal(true);
  };

  return (
    <Grid
      {...rest}
      className={clsx(classes.root, className)}
      container
      spacing={3}
    >
      <Grid item lg={8} xl={9} xs={12}>
        <Description description={pathway.description} />
        {/* <Deliverables className={classes.deliverables} /> */}
      </Grid>
      <Grid item lg={4} xl={3} xs={12}>
        <Card>
          <CardContent>
            <GoalsList mode="pathway" pathwayData={{ id: pathway.id }} />
          </CardContent>
          <CardActions>
            <Button onClick={takePathway} color="primary" size="small">
              Take pathway
            </Button>
            <GoalsSetup
              mode="pathway"
              show={showGoalsModal}
              activateBybutton
              pathwayData={{ id: pathway.id }}
            />
          </CardActions>
        </Card>
        {/* <Holder project={project} />
        <Members
          className={classes.members}
          members={project.members}
        /> */}
      </Grid>
    </Grid>
  );
}

Overview.propTypes = {
  className: PropTypes.string,
  pathway: PropTypes.object.isRequired
};

export default Overview;
