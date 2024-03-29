import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Divider,
  Link,
  Avatar
} from '@material-ui/core';
import LockIcon from '@material-ui/icons/Lock';
import Page from 'src/components/Page';
import gradients from 'src/utils/gradients';
import { login } from 'src/actions/sessionActions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Lottie from 'react-lottie';
import ProviderButtons from './ProviderButtons';
import LoginForm from './LoginForm';
import * as organizationAnimation from './organizationAnimation.json';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(6, 2)
  },
  card: {
    width: theme.breakpoints.values.md,
    maxWidth: '100%',
    overflow: 'visible',
    display: 'flex',
    position: 'relative',
    '& > *': {
      flexGrow: 1,
      flexBasis: '50%',
      width: '50%'
    }
  },
  content: {
    padding: theme.spacing(8, 4, 3, 4)
  },
  media: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    padding: theme.spacing(3),
    color: theme.palette.common.white,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  icon: {
    backgroundImage: gradients.green,
    color: theme.palette.common.white,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    position: 'absolute',
    top: -32,
    left: theme.spacing(3),
    height: 64,
    width: 64,
    fontSize: 32
  },
  loginForm: {
    marginTop: theme.spacing(3)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  person: {
    marginTop: theme.spacing(2),
    display: 'flex'
  },
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const session = useSelector(state => state.session);
  // Grabs token from the URL parameters if there is one and authenticates
  useEffect(() => {
    const params = new URL(document.location).searchParams;
    const token = params.get('token');
    if (token) {
      dispatch(login(token));
    }

    // Replaces parameters in URL to prevent token leakage
    window.history.replaceState(null, null, window.location.pathname);
  }, [dispatch]);

  // Redirects user to overview if signed in
  if (session.loggedIn) {
    history.push('/overview');
  }

  const lottieOptions = {
    loop: true,
    autoplay: true,
    animationData: organizationAnimation.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <Page className={classes.root} title="Login">
      <Card className={classes.card}>
        <CardContent className={classes.content}>
          <LockIcon className={classes.icon} />
          <Typography gutterBottom variant="h3">
            Sign in
          </Typography>
          <Typography variant="subtitle2">Sign in to Folder</Typography>
          <LoginForm className={classes.loginForm} />
          <Divider className={classes.divider} />
          <ProviderButtons />
          <Divider className={classes.divider} />
          <Link
            align="center"
            color="secondary"
            component={RouterLink}
            to="/auth/register"
            underline="always"
            variant="subtitle2"
          >
            Don&apos;t have an account?
          </Link>
        </CardContent>
        <CardMedia className={classes.media} title="Cover">
          <Lottie options={lottieOptions} height="100%" width="100%" />
        </CardMedia>
      </Card>
    </Page>
  );
}

export default Login;
