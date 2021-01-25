import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../actions/auth";

const Logout = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logout());
  }, []);

  return <div>{!isAuthenticated && <Redirect to='/'></Redirect>}</div>;
};

export default Logout;
