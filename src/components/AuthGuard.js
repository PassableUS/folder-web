import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

// Example of user roles: ['GUEST', 'USER', 'ADMIN'];

function AuthGuard({ roles, children }) {
  const session = useSelector(state => state.session);
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log(`LOGGED IN: ${session.loggedIn}`);
  console.log('USER: ', session.user);
  console.log('PAGE ROLES: ', roles);

  useEffect(() => {
    if (
      !session.loggedIn ||
      !session.user ||
      !localStorage.getItem('userProfile')
    ) {
      alert('You are not logged in, you will now be redirected');
      history.push('/auth/login');
      return;
    }

    if (!roles.includes(session.user.role)) {
      history.push('/errors/error-401');
    }

    setIsLoggedIn(true);
  }, [history, roles, session.loggedIn, session.user]);

  return isLoggedIn ? <>{children}</> : null;
}

// const AuthGuard = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     fakeAuth.isAuthenticated === true
//       ? <Component {...props} />
//       : <Redirect to='/login' />
//   )} />
// )

AuthGuard.propTypes = {
  children: PropTypes.node,
  roles: PropTypes.array.isRequired
};

export default AuthGuard;
