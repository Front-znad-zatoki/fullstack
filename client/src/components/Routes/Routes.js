import '../App/style.scss';
import React, { Fragment, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loader from '../Loader';

const Landing = lazy(() => import('../../domain/Landing'));

const SignUp = lazy(() => import('../../domain/Auth/SignUp'));

const Login = lazy(() => import('../../domain/Auth/Login'));

const MovieList = lazy(() => import('../../domain/MovieList'));

const Navbar = lazy(() => import('../Navbar/index'));

function Routes() {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <Fragment>
          <Navbar />
          <div className="App">
            <Route exact path="/" component={Landing} />
            <Switch>
              {/* http://localhost:3000/movies */}
              <Route exact path="/movies" component={MovieList} />
              {/* http://localhost:3000/signup */}
              <Route exact path="/signup" component={SignUp} />
              {/* http://localhost:3000/login */}
              <Route exact path="/login" component={Login} />
              {/* http://localhost:3000/logout */}
              {/* <Route exact path='/login' component={ Logout }/> */}
              {/* http://localhost:3000/users/me */}
              {/* <Route exact path='/users/me' component={ UserProfile }/> */}
              {/* http://localhost:3000/reservation/pre/:screeningId */}
              {/* <Route path='/reservation/pre/:screeningId' component={ ReservationPreview }/> */}
              {/* http://localhost:3000/reservation/chooseSeats/:screeningId */}
              {/* <Route path='/reservation/chooseSeats/:screeningId' component={ ReservationDetails }/> */}
              {/* http://localhost:3000/reservation/details/:reservationId */}
              {/* <Route path='/reservation/details/:reservationId' component={ ReservationConfirmation }/> */}
              {/* http://localhost:3000/reservation/payment/:reservationId */}
              {/* <Route path='/reservation/payment/:reservationId' component={ ReservationPayment }/> */}
              {/* http://localhost:3000/reservation/confirm/:reservationId */}
              {/* <Route path='/reservation/confirm/:reservationId' component={ ReservationConfirmation }/> */}

              {/* <PrivateRoute exact path='/admin' component={ Admin }/> */}
              {/* http://localhost:3000/admin */}
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Suspense>
  );
}

export default Routes;
