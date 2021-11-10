import './App.css'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
  } from "react-router-dom";
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Add from './components/Add'
import Edit from './components/Edit'
import Chart from './components/Chart'
import Header from './components/Header'
import jwt_decode from 'jwt-decode'

export default function App() {

  const dispatch = useDispatch()
  const token = localStorage.getItem('token')
  const user = (token)?(jwt_decode(token)):null
  
  const getAll = async () => {
    try {
      const res = await fetch("http://localhost:80/api/vacations")
      const data = await res.json()
      dispatch({
        type: 'getVacations',
        payload: data
      })
    } catch (error) {
      console.log(error)
    }
  }
  
  const getFollowed = async () => {
    const id = user.id
    try {
      const res = await fetch("http://localhost:80/api/vacations/followed",{
        method:"post",
        body: JSON.stringify({id}),
        headers:{"content-type": "application/json", "authorization" : token}
      })
      if (res.status === 200) {
        const data = await res.json()
        const followedIdArray = []
        for (let index = 0; index < data.length; index++) {
          const obj = data[index].v_id
          followedIdArray.push(obj)
        }
        dispatch({
          type: 'getFollowedVacations',
          payload: followedIdArray
        })
      }
      if (res.status === 401) {
        alert('You are offline or unauthorized. Please login again')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    (async () => {
      try {
        await dispatch({
          type: 'login',
          payload: user
        })
        await getAll()
        user?.role === 'user' && getFollowed() 
      } catch (error) {
        alert('something went wrong')
      }
    })()
  }, [])


  return (
    <div className= 'app'>
      <Router>
        <Header />

        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/add" component={Add} />
          <Route exact path="/edit/:id" component={Edit} />
          <Route exact path="/chart" component={Chart} />
          <Redirect exact from="/" to="/home" />
        </Switch>

      </Router>
    </div>
  );
}
  