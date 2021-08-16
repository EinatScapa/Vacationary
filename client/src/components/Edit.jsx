import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'

const Edit = () => {

  const history = useHistory()
  const token = localStorage.getItem('token')
  
  const {id} = useParams()
  const vacations = useSelector((state) => state.vacations)
  const vacation = vacations.find((v) => v.id == id)
  const currentDestination = vacation.destination
  const currentImg = vacation.img
  const currentFrom_date = vacation.from_date
  const currentTo_date = vacation.to_date
  const currentPrice = vacation.price
  
  const [destination, setDestination] = useState(currentDestination)
  const [img, setImg] = useState(currentImg)
  const [from_date, setFrom_date] = useState(currentFrom_date)
  const [to_date, setTo_date] = useState(currentTo_date)
  const [price, setPrice] = useState(currentPrice)
  
  const edit = async () => {
    try {
      const res = await fetch("http://localhost:80/api/vacations",{
        method:"put",
        body: JSON.stringify({id, destination, img, from_date, to_date, price}),
        headers:{"content-type": "application/json", "authorization" : token}
      })
      if (res.status === 201) {
        alert('Changes Saved')
        history.push('/home')
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
  
  return (
    <div className= 'edit'>
      <h3 className= 'pageTitle'> edit Vacation </h3>
            <input type="text" defaultValue = {`${currentDestination}`} onChange={e => setDestination(e.target.value)}/>
            <input type="text" defaultValue= {`${currentImg}`} URL onChange={e => setImg(e.target.value)}/>
            <input type="text" defaultValue= {`${currentFrom_date}`} onChange={e => setFrom_date(e.target.value)}/>
            <input type="text" defaultValue= {`${currentTo_date}`} onChange={e => setTo_date(e.target.value)}/>
            <input type="text" defaultValue= {`${currentPrice}`} onChange={e => setPrice(e.target.value)}/>
            <button className= 'addSmallBtn' onClick={ () =>
                edit()
            }> Save </button>
            <button className= 'addSmallBtn' onClick={ () =>
                history.push('/home')
            }> Discard changes </button>
    </div>
  )
}

export default Edit;
