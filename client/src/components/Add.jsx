import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Add = () => {
  
    const history = useHistory();
    
    const token = localStorage.getItem('token')
  
    const [destination, setDestination] = useState('')
    const [img, setImg] = useState('')
    const [from_date, setFrom_date] = useState('')
    const [to_date, setTo_date] = useState('')
    const [price, setPrice] = useState(0)

    const add = async (destination, img, from_date, to_date, price) => {
        try {
          const res = await fetch("http://localhost:80/api/vacations",{
            method:"post",
            body: JSON.stringify({destination, img, from_date, to_date, price}),
            headers:{"content-type": "application/json", "authorization" : token}
          })
          if (res.status === 201) {
            alert('Vacation Added')
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
        <div className= 'add'>
            <h3 className= 'pageTitle'> Add New Vacation </h3>
            <input type="text" placeholder="Destination" onChange={e => setDestination(e.target.value || "unknown value")}/>
            <input type="text" placeholder="img URL" onChange={e => setImg(e.target.value || "unknown value")}/>
            <input type="text" placeholder="from_date" onChange={e => setFrom_date(e.target.value || "unknown value")}/>
            <input type="text" placeholder="to_date" onChange={e => setTo_date(e.target.value || "unknown value")}/>
            <input type="text" placeholder="price" onChange={e => setPrice(e.target.value || "unknown value")}/>
            <button className= 'addSmallBtn' onClick={ () =>
                add(destination, img, from_date, to_date, price)
            }> Add vacation </button>
         </div>
    )
}

export default Add;

