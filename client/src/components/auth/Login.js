import React, { Fragment, useState } from "react";
import { connect, useSelector } from "react-redux";
import { login } from "../../actions/auth";
import { Link, Redirect } from "react-router-dom";
import { PropTypes } from "prop-types";

import "./Login.css";

const Login = ({ login }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Fragment>
      <div className='loginForm'>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='form-group'>
            <input
              type='email'
              placeholder='Email Address'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <input type='submit' value='Login' />
        </form>
        <p>
          Don't have an account? <Link to='/register'>Sign up.</Link>
        </p>
      </div>
      <div>{isAuthenticated && <Redirect to='/'></Redirect>}</div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(Login);
