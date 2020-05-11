import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

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

  return (
    <Fragment>
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
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, { login })(Login);
