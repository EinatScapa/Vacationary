import React from 'react'
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'


const Header = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector((state) => state.user)
  const username = (user)?(user.Fname):("Guest")

  const logoutFnc = () => {
    dispatch({
      type: 'logout',
    })
    localStorage.clear()
    alert('User Logged-out Succesfuly')
    history.push('/home')
  }

  return (
    <div className= 'header'>

      <div className= 'logo'>
        <h3>VACATIONARY</h3>
      </div>
      
      <div className= 'nav'>
        <p> Contact </p>
        <Link to="/"> Home </Link>
        <p> About </p>
      </div>
      
      <div className= 'info'>
        <p className= 'hello'>Hello {username}</p>
        {(user)?
          <button className= 'logoutBtn' onClick= {() => logoutFnc()}> Log-Out </button> :
          <Link to="/login"> Log-In </Link>
        }
      </div>
    </div>
  )
}

export default Header;