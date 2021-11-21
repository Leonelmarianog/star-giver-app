import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Home, Members, Profile, SignIn, SignUp } from '../../pages';
import GlobalLayout from '../../layouts/GlobalLayout';
import LayoutWithNavbar from '../../layouts/LayoutWithNavbar';
import useAuthContext from '../../contexts/auth/useAuthContext';
import LoadingOverlay from '../common/LoadingOverlay';

const Routes = () => {
  const { refreshUser, isRefreshing, isAuthenticated } = useAuthContext();

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  if (isRefreshing) {
    return <LoadingOverlay appear={true} />;
  }

  return (
    <GlobalLayout>
      <Router>
        <Switch>
          <Route exact path='/sign-in'>
            {!isAuthenticated ? <SignIn /> : <Redirect to='/' />}
          </Route>
          <Route path='/sign-up'>{!isAuthenticated ? <SignUp /> : <Redirect to='/' />}</Route>
          <Route exact path='/'>
            {isAuthenticated ? (
              <LayoutWithNavbar>
                <Home />
              </LayoutWithNavbar>
            ) : (
              <Redirect to='/sign-in' />
            )}
          </Route>
          <Route path='/members/:id'>
            {isAuthenticated ? (
              <LayoutWithNavbar>
                <Profile />
              </LayoutWithNavbar>
            ) : (
              <Redirect to='/sign-in' />
            )}
          </Route>
          <Route path='/members'>
            {isAuthenticated ? (
              <LayoutWithNavbar>
                <Members />
              </LayoutWithNavbar>
            ) : (
              <Redirect to='/sign-in' />
            )}
          </Route>
        </Switch>
      </Router>
    </GlobalLayout>
  );
};

export default Routes;
