import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container, Grid } from '@material-ui/core';
import Page from 'src/components/Page';
import Header from './Header';
import Statistics from './Statistics';
import Pathways from './Pathways';
import Todos from './Todos';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  statistics: {
    marginTop: theme.spacing(3)
  },
  notifications: {
    marginTop: theme.spacing(6)
  },
  projects: {
    marginTop: theme.spacing(6)
  },
  todos: {
    marginTop: theme.spacing(6)
  },
  // item: {
  //   padding: theme.spacing(1)
  // }
}));

function Overview() {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Overview"
    >
      <Container maxWidth="lg">
        <Header />
        <Statistics className={classes.statistics} />
        {/* <Notifications className={classes.notifications} /> */}
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-start"
          spacing={2}
        >
        <Grid
          className={classes.item}
          item
          md={6}
          sm={6}
          xs={12}
        >
          <Pathways className={classes.projects} />
        </Grid>
        <Grid
          className={classes.item}
          item
          md={6}
          sm={6}
          xs={12}
        >
          <Todos className={classes.todos} />
        </Grid>

        </Grid>
      </Container>
    </Page>
  );
}

export default Overview;
