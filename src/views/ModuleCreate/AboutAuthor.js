import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Radio,
  colors
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  option: {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'flex-start',
    padding: theme.spacing(2),
    maxWidth: '100%',
    '& + &': {
      marginTop: theme.spacing(2)
    }
  },
  selectedOption: {
    backgroundColor: colors.grey[50]
  },
  optionRadio: {
    margin: -10
  },
  optionDetails: {
    marginLeft: theme.spacing(2)
  }
}));

const options = [
  {
    value: 'educator',
    title: 'I\'m an educator',
    description: 'I\'m an experienced educator in the field surrounding this pathway.'
  },
  {
    value: 'companyRepresentative',
    title: 'I’m a company representative',
    description:
      'I\'m a representative of a company wishing to make a pathway to train/onboard employees.'
  },
  {
    value: 'professional',
    title: 'I’m a professional',
    description:
      'I\'m a professional in the field surrounding this pathway.'
  }
];

function AboutAuthor({ register, className, ...rest }) {
  const classes = useStyles();
  const [selected, setSelected] = useState(options[0].value);

  const handleChange = (event, option) => {
    setSelected(option.value);
  };

  return (
    <Card
      register={''} // Register causes an issue when being passed to the card, so we replace it with an empty object. 
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="What are you?" />
      <CardContent>
        {options.map((option) => (
          <div
            className={clsx(classes.option, {
              [classes.selectedOption]: selected === option.value
            })}
            key={option.value}
          >
            <Radio
              checked={selected === option.value}
              className={classes.optionRadio}
              color="primary"
              onClick={(event) => handleChange(event, option)}
              inputRef={register}
              name="occupation"
              value={option.value}
              required
            />
            <div className={classes.optionDetails}>
              <Typography
                gutterBottom
                variant="h5"
              >
                {option.title}
              </Typography>
              <Typography variant="body1">{option.description}</Typography>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

AboutAuthor.propTypes = {
  className: PropTypes.string
};

export default AboutAuthor;
