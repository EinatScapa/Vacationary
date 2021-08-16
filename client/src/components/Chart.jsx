import React from 'react'
import { useSelector } from 'react-redux'
import { Bar } from 'react-chartjs-2'

export default function Chart() {

  const vacations = useSelector((state) => state.vacations)
  const labels = vacations.filter(item => {return item.followers > 0}).map(item => {return item.id})
  const followers = vacations.filter(item => {return item.followers > 0}).map(item => {return item.followers})

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'num of followers',
        data: followers,
        backgroundColor: 
          'rgba(207, 105, 99, 0.2)',
        borderColor: 
          'rgba(207, 105, 99, 1)',
        borderWidth: 0.5,
      },
    ],
  }

  const options = {}
  
  return (
    <div className= 'bar'>
      <h1 className='pageTitle'>Followers Status</h1>
      <h4>Number of users following</h4>
      <Bar data={data} options={options} />
    </div>
  )
}