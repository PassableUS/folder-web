import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid } from '@material-ui/core';
import FilesDropzone from 'src/components/FilesDropzone';
import NoteCard from './NoteCard';

const useStyles = makeStyles(theme => ({
  root: {},
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
    <div {...rest} className={clsx(classes.root, className)}>
      <Card>
        <CardContent>
          <FilesDropzone />
        </CardContent>
      </Card>
      <Grid className={classes.files} container spacing={3}>
        {notes.map(note => (
          <Grid item key={note.id} lg={4} md={4} sm={6} xs={12}>
            <NoteCard note={note} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

Whiteboard.propTypes = {
  className: PropTypes.string
};

export default Whiteboard;
