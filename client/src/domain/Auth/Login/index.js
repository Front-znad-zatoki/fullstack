import './style.scss';
import React, { useState, useContext } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { ThemeContext } from '../../../context/Theme';
import AppTheme from '../../../context/Theme/themeColors';
import { AuthContext } from '../../../context/Auth';
import Message from '../../../components/Message';
import { login } from '../../../actions/Auth';
import movies from '../../../mock/moviesMock';

function Login() {
  const { userContext, dispatchUserContext } = useContext(AuthContext);
  const { isAuthenticated } = userContext;
  const [alertMsg, setAlertMsg] = useState(null);
  const theme = useContext(ThemeContext)[0];
  const currentTheme = AppTheme[theme];
  const initialValue = {
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState(initialValue);
  const history = useHistory();
  const { email, password } = formData;
  const { poster } = movies[1];
  const onChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const isLoggedIn = await login({ email, password }, dispatchUserContext);
    if (isLoggedIn) history.push('/');
    else {
      setFormData(initialValue);
      setAlertMsg('Could not login user. Try again');
      setTimeout(() => {
        setAlertMsg(null);
      }, 2000);
    }
  };

  return !isAuthenticated ? (
    <div
      className="auth app-container"
      style={{
        backgroundColor: `${currentTheme.backgroundColor}`,
        color: `${currentTheme.textColor}`,
      }}
    >
      <div className="movie__view__container">
        <img
          className="movie__view__container__image"
          src={poster}
          alt="Movie poster"
        />
      </div>
      <div className="auth__form-container">
        <h2>Login</h2>
        {alertMsg ? <Message message={alertMsg} /> : null}
        <form className="auth__form" onSubmit={onSubmit}>
          <label htmlFor="loginEmail" className="auth__form-group">
            <input
              className="auth__input"
              type="email"
              id="loginEmail"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
              required
            />
          </label>
          <label htmlFor="loginPassword" className="auth__form-group">
            <input
              className="auth__input"
              id="loginPassword"
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
              minLength="5"
            />
          </label>
          <button type="submit" className="button--submit auth__form-group">
            Login
          </button>
        </form>
        <p className="auth__redirect">
          Do not have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  ) : (
    <Redirect to="/" />
  );
}

export default Login;
