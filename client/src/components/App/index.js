import './style.scss';
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from '../../domain/Landing';
import SignUp from '../../domain/Auth/SignUp';
import Login from '../../domain/Auth/Login';
import MovieList from '../../domain/MovieList';
import { ThemeContext } from '../../context/Theme';
import Navbar from '../Navbar/index';
import MoviesContextProvider from '../../context/Movies';
import AuthContextProvider from '../../context/Auth';
import ReservationProvider from '../../context/Reservation';
import UserDashboard from '../../domain/User';
import PreBooking from '../../domain/Prebooking';
import MovieView from '../../domain/MovieView';
import ReservationView from '../../domain/ReservationView';
import AdminPanel from '../../domain/AdminPanel';
import ReservationSummary from '../../domain/ReservationSummary';
import ReservationConfirmation from '../../domain/ReservationConfirmation';
import CinemaContextProvider from '../../context/Cinema';
import Footer from '../Footer';
import ErrorBoundary from '../../services/Errors';
import NotFound from '../NotFound';

function App() {
  const themeHook = useState('light');
  return (
    <AuthContextProvider>
      <CinemaContextProvider>
        <ReservationProvider>
          <ThemeContext.Provider value={themeHook}>
            <MoviesContextProvider>
              <Router>
                <>
                  <Navbar />
                  <ErrorBoundary>
                    <div className="App">
                      <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/movies" component={MovieList} />
                        <Route exact path="/signup" component={SignUp} />
                        <Route exact path="/login" component={Login} />
                        <Route
                          exact
                          path="/movies/:movieSlug"
                          component={MovieView}
                        />
                        <Route
                          exact
                          path="/users/me"
                          component={UserDashboard}
                        />
                        <Route
                          exact
                          path="/prebooking/:screeningId"
                          component={PreBooking}
                        />
                        <Route
                          exact
                          path="/reservation/seats/:screeningId"
                          component={ReservationView}
                        />
                        <Route
                          exact
                          path="/reservation/summary/:reservationId"
                          component={ReservationSummary}
                        />
                        {/* <Route path='/reservation/payment/:reservationId' component={ ReservationPayment }/> */}
                        <Route
                          exact
                          path="/reservation/confirmation"
                          component={ReservationConfirmation}
                        />
                        <Route exact path="/admin" component={AdminPanel} />
                        <Route component={NotFound} />
                      </Switch>
                    </div>
                  </ErrorBoundary>
                  <Footer />
                </>
              </Router>
            </MoviesContextProvider>
          </ThemeContext.Provider>
        </ReservationProvider>
      </CinemaContextProvider>
    </AuthContextProvider>
  );
}

export default App;
