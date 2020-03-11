import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Container, Card, CardContent, Grid } from '@material-ui/core';
import FilesDropzone from 'src/components/FilesDropzone';
import Page from 'src/components/Page';
import NoteCard from './NoteCard';
import Header from './Header';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  header: {
    marginBottom: theme.spacing(3)
  },
  files: {
    marginTop: theme.spacing(3)
  }
}));

const Whiteboard = ({ className, ...rest }) => {
  const classes = useStyles();
  const [notes, setNotes] = useState([]);

  // Fetch notes
  useEffect(() => {
    const mockNotes = [
      {
        title: 'Test',
        type: 'text',
        timestamp: 90000,
        content: 'test'
      }
    ];

    setNotes(mockNotes);
  }, []);

  return (
    <Page
      {...rest}
      title="Whiteboard"
      className={clsx(classes.root, className)}
    >
      <Container maxWidth="lg">
        <Header className={classes.header} />
        <Grid className={classes.files} container spacing={3}>
          {notes.map(note => (
            <Grid item key={note.id} lg={4} md={4} sm={6} xs={12}>
              <NoteCard note={note} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Page>
  );
};

Whiteboard.propTypes = {
  className: PropTypes.string
};

export default Whiteboard;
