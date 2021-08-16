import React from 'react'
import { FcLikePlaceholder } from "react-icons/fc";
import { BiHeartCircle } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux'

import moment from 'moment'

const Item = ({record, status}) => {

  const history = useHistory()

  const user = useSelector((state) => state.user)
  const token = localStorage.getItem('token')
  const from_date = moment(record.from_date).format("MMM Do YY")
  const to_date = moment(record.to_date).format("MMM Do YY")
  const full_date = `${from_date} - ${to_date}`

  const del = async () => {
    const id = record.id
    try {
      const res = await fetch("http://localhost:80/api/vacations",{
        method:"delete",
        body: JSON.stringify({id}),
        headers:{"content-type": "application/json", "authorization" : token}
      })
      if (res.status === 200) {
      alert("Vacation deleted")
      window.location.reload()
      }
      if (res.status === 401) {
        alert('You are offline or unauthorized. Please login again')
        history.push('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const setFollow = async () => {
    const u_id = user.id
    const v_id = record.id
    if (status === 'isFollowed') {
      try {
        const res = await fetch("http://localhost:80/api/follow",{
          method:"delete",
          body: JSON.stringify({u_id, v_id}),
          headers:{"content-type": "application/json", "authorization" : token}
        })
        if (res.status === 201) {
          alert("Removed from followed vacations")
          history.push('/')
          window.location.reload()
        }
        if (res.status === 401) {
          alert('You are offline or unauthorized. Please login again')
          history.push('/login')
        }
      } catch (error) {
        console.log(error)
        alert("Something's wrong! pleas try again")
      }
    } else if (status === 'isUnfollowed') {
      try {
        const res = await fetch("http://localhost:80/api/follow",{
          method:"post",
          body: JSON.stringify({u_id, v_id}),
          headers:{"content-type": "application/json", "authorization" : token}
        })
        if (res.status === 201) {
          alert("Added to followed vacations")
          history.push('/')
          window.location.reload()
        }
        if (res.status === 401) {
          alert('You are offline or unauthorized. Please login again')
          history.push('/login')
        }
      } catch (error) {
          console.log(error)
          alert("Something's wrong! pleas try again")
        }
    }
  }
    
  return (
      <div className= 'item'>
          <h3 className= 'itemDestination'> {record.destination} </h3>
          <p className= 'itemDate'> {full_date} </p>
          <img className= 'itemImg' src= {record.img} alt='destinationIMG' />
          <p className= 'itemFollowers'> Followed by {record.followers} users </p>
          <div className= 'itemFooter'>
            <p className= 'itemPrice'> $ {record.price} </p>
            {(user?.role === 'user')
              ? <button
                  className= 'followBtn'
                  onClick={()=>setFollow()}>
                    {(status === 'isFollowed')? <FcLikePlaceholder/> :  <BiHeartCircle/> }
                </button> 
              : <div className= 'itemBtns'>
                  <Link className= 'editBtn' to={`/edit/${record.id}`} > <FiEdit2/> </Link>
                  <button className= 'delBtn' onClick={()=>del()} > <AiOutlineDelete/> </button>
                </div>
            }
          </div>
      </div>
  )
}

export default Item;
