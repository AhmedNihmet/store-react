import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

import Login from './login/Login';
import Dashboard from './dashboard/Dashboard'

export default function AuthGuard() {
  const isLogged = useSelector(state => state.isLogged);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(isLogged)

  useEffect(() => {
    console.log(isLogged)
    setIsUserLoggedIn(isLogged)
  }, [isLogged])

  return (
    <>
      {isUserLoggedIn ? <Dashboard /> : <Login />}
    </>
  )
}
