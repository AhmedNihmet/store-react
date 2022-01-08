import React from 'react';

import Login from './login/Login';
import Dashboard from './dashboard/Dashboard'

export default function AuthGuard() {
  const storedData = localStorage.getItem('store-user');

  return (
    <>
      {storedData ? <Dashboard /> : <Login />}
    </>
  )
}
