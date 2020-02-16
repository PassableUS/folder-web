import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  TextField
} from '@material-ui/core';
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
  flexGrow: {
    flexGrow: 1
  }
}));

const initialValues = {
  name: ''
};

const AboutModule = ({ register, errors, className, ...rest }) => {
  const classes = useStyles();
  const [values, setValues] = useState({ ...initialValues });

  const handleFieldChange = (event, field, value) => {
    event.persist();
    setValues((prevValues) => ({
      ...prevValues,
      [field]: value
    }));
  };

  return (
    <Card
      {...rest}
      register={''} // Register causes an issue when being passed to the card, so we replace it with an empty object.
      className={clsx(classes.root, className)}
    >
      <CardHeader title="About this module" />
      <CardContent>
        <form>
          <div className={classes.formGroup}>
            {/* Error message if form element is not filled */}
            {errors.moduleName &&
              <Alert
                variant="error"
                className={classes.formAlert}
                message="This field is required."
              />}
            <TextField
              fullWidth
              label="Module Name"
              name="moduleName"
              onChange={(event) => handleFieldChange(event, 'name', event.target.value)}
              value={values.name}
              inputRef={register({
                required: true
              })}
              variant="outlined"
              required
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

AboutModule.propTypes = {
  className: PropTypes.string
};

export default AboutModule;
