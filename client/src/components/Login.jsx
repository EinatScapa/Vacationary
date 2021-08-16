import React from 'react'
import jwt_decode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const loginFnc = async (e) => {
    e.preventDefault()
    const username = e.target[0].value
    const password = e.target[1].value
    try {
      const res = await fetch("http://localhost:80/api/users/login",{
        method:"post",
        body: JSON.stringify({username, password}),
        headers:{"content-type": "application/json"}
      })
      const data = await res.json()
      if (res.status === 200) {
        localStorage.setItem ('token', data.token)
        const decodedToken = jwt_decode(data.token)
        dispatch({
          type: 'login',
          payload: decodedToken
        })
        alert('User Logged-in Succesfuly');
        history.push('/home')
        window.location.reload()
      } else if (res.status === 400) {
        alert('Missing some info')
      } else if (res.status === 401) {
        alert('User not found')
      }else if (res.status === 402) {
        alert('Wrong password')
      }
    } catch (error) {
      console.log(error)
      alert("Something's wrong! pleas try again")
    }
  }

  return (
    <div className= 'login'>
      <h2 className= 'loginTitle'>Login to your account</h2>
      <form onSubmit={loginFnc} >
        <label className= 'input'>
          Username:
          <input type="text" name="username" />
        </label>
        <label className= 'input'>
          Password:
          <input type="text" name="password" />
        </label>
        <input className= 'submit' type="submit" value="Login"/>
      </form>
      <h5>Don't have an acount yet?</h5>
      <Link className= 'linkRegister' to="/Register">Register Here!</Link>

    </div>
  )
}

export default Login;