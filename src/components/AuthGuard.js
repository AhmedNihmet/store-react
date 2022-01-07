import React from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from "react-redux";

import { increment, decrement, login } from '../redux/actions'

export default function AuthGuard() {

  const counter = useSelector(state => state.counter);
  const isLogged = useSelector(state => state.isLogged);
  const dispatch = useDispatch();

  return (
    <div>
      <div className="App">
        <h3>counter state is = {counter}</h3>
        <button onClick={() => dispatch(increment(5))}>+</button>
        <button onClick={() => dispatch(decrement(5))}>-</button>

        <h3>user is {isLogged ? 'Logged in' : 'Logged out'}</h3>
        <Button onClick={() => dispatch(login())}>hello</Button>
      </div>
    </div>
  )
}
