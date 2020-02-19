import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Button,
  Typography,
  Grid
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from 'src/components/Alert';

const useStyles = makeStyles((theme) => ({
  root: {},
  alert: {
    marginBottom: theme.spacing(3)
  },
  formAlert: {
    marginBottom: theme.spacing(2)
  },
  formGroup: {
    marginBottom: theme.spacing(3)
  },
  fieldGroup: {
    display: 'flex',
    alignItems: 'center'
  },
  fieldHint: {
    margin: theme.spacing(1, 0)
  },
  addButton: {
    marginTop: theme.spacing(1)
  },
  courses: {
    marginTop: theme.spacing(1)
  },
  course: {
    marginTop: theme.spacing(1),
    textAlign: 'center'
  },
  flexGrow: {
    flexGrow: 1
  },
  dateField: {
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  }
}));

const initialValues = {
  name: '',
  link: '',
  courses: [] // TODO ADD CALL TO THE SERVICE TO GET THE LIST OF COURSES THAT THIS MODULE ALREADY HAS AND SETSTATE TO IT
};

function ModuleCourses({
  register, errors, className, ...rest
}) {
  const classes = useStyles();
  const [values, setValues] = useState({ ...initialValues });

  const handleFieldChange = (event, field, value) => {
    event.persist();
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value
    }));
  };

  const handleCourseAdd = () => {
    setValues((prevValues) => {
      const newValues = { ...prevValues };

      if (newValues.link && newValues.name) {
        newValues.courses = [...newValues.courses];
        newValues.courses.push({
          name: newValues.name,
          link: newValues.link
        });

        newValues.name = '';
        newValues.link = '';
      } else {
        alert('Please specify all values');
      }

      return newValues;
    });
  };

  const handleCourseDelete = (name) => {
    setValues((prevValues) => {
      const newValues = { ...prevValues };

      newValues.courses = newValues.courses.filter((course) => course.name !== name);

      return newValues;
    });
  };

  return (
    <Card
      {...rest}
      register="" // Register causes an issue when being passed to the card, so we replace it with an empty object.
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Add courses" />
      <CardContent>
        <form>
          <Alert
            className={classes.alert}
            message="Awaiting API access for further course integration"
          />
          <div className={classes.formGroup}>
            {/* Error message if form element is not filled */}
            {errors.pathwayName
              && (
              <Alert
                variant="error"
                className={classes.formAlert}
                message="This field is required."
              />
              )}
            <TextField
              fullWidth
              label="Course Name"
              name="courseName"
              onChange={(event) => handleFieldChange(event, 'name', event.target.value)}
              value={values.name}
              variant="outlined"
              required
            />
          </div>
          <div className={classes.formGroup}>
            {/* Error message if form element is not filled */}
            {errors.courses
              && (
              <Alert
                variant="error"
                className={classes.formAlert}
                message="This field is required."
              />
              )}
            <div className={classes.fieldGroup}>
              <TextField
                className={classes.flexGrow}
                label="Course Link"
                onChange={(event) => handleFieldChange(event, 'link', event.target.value)}
                value={values.link}
                variant="outlined"
                required
              />
              <TextField // Hidden input so that we can send the form data from the array instead of the input element
                type="hidden"
                value={JSON.stringify(values.courses)}
                name="courses"
                inputRef={register({
                  required: true
                })}
              />

            </div>
            <Button
              className={classes.addButton}
              onClick={handleCourseAdd}
              size="medium"
            >
              <AddIcon className={classes.addIcon} />
              Add Course
            </Button>
            <Typography
              className={classes.fieldHint}
              variant="body2"
            >
              These courses will be displayed to the student as a group. Modules should be created with the intent that courses are taken concurrently.
            </Typography>
            <div className={classes.courses}>
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={2}
              >
                {values.courses.map((course) => (
                  <Grid item>
                    <Card className={classes.course} key={course.name}>
                      <CardHeader
                        title={course.name}
                      />
                      <CardContent>
                        <Typography>
                          {course.link}
                        </Typography>
                        <Button
                          className={classes.addButton}
                          onClick={() => handleCourseDelete(course.name)}
                          size="medium"
                          variant="outlined"
                        >
                          <DeleteIcon className={classes.deleteIcon} />
                          Delete
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

ModuleCourses.propTypes = {
  className: PropTypes.string
};

export default ModuleCourses;
