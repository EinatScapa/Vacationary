import React from 'react'
import { useHistory } from 'react-router-dom'

const Register = () => {

  const history = useHistory()
  
  const registerFnc = async (e) => {
    const Fname = e.target[0].value
    const Lname = e.target[1].value
    const username = e.target[2].value
    const password = e.target[3].value
    e.preventDefault()
    try {
      const res = await fetch("http://localhost:80/api/users/register",{
        method:"post",
        body: JSON.stringify({Fname, Lname, username, password}),
        headers:{"content-type": "application/json"}
      });
      if (res.status === 201) {
        alert('User Registered Succesfuly')
        history.push('/login')
      } else if (res.status === 400) {
        alert('Missing some info')
      } else if (res.status === 401) {
        alert('Username already exists')
      }
    } catch (error) {
      console.log(error)
      alert("Something's wrong! pleas try again")
    }
  }

  return (
    <div className= 'register'>
      <h2 className= 'registerTitle'>Create new acount</h2>
      <form onSubmit={registerFnc} >
        <label className= 'input'>
          First Name:
          <input type="text" name="Fname" />
        </label>
        <label className= 'input'>
          Last Name:
          <input type="text" name="Lname" />
        </label>
        <label className= 'input'>
          Choose Username:
          <input type="text" name="username" />
        </label>
        <label className= 'input'>
          Choose Password:
          <input type="text" name="password" />
        </label>
        <input className= 'submit' type="submit" value="Create"/>
      </form>
    </div>
  )
}

export default Register;