import Item from './Item'
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux'

const List = () => {

  const user = useSelector((state) => state.user)
  const vacations = useSelector((state) => state.vacations)
  const followedId = useSelector((state) => state.followedVacationsId)

  const followed = vacations.filter(v => {
    return followedId.some(f => {
      return f === v.id
    })
  })
  const unfollowed = vacations.filter((v) => {
    return followedId.indexOf(v.id) === -1 
  })
    
  if (user?.role === 'user') {
    return (
      <div className= 'main'>
        <span className= 'headline'> My Favorite Vacations </span> 
        <div className= 'list'>
          {followed.map(record => <Item key={record.id} record={record} status={'isFollowed'} />)}
        </div>
        <span className= 'headline'> Other Vacations </span>
        <div className= 'list'>
          {unfollowed.map(record => <Item key={record.id} record={record} status={'isUnfollowed'} />)}
        </div>
      </div>
    )
  } else if (user?.role === 'admin') {
    return (
      <div className= 'main'>
        <div className = 'adminBtns'>
          <Link className='chartBtn' to="/chart"> Watch Charts </Link>
          <Link className='addBtn' to="/add"> Add New Vacation </Link>
        </div>
        <div className= 'list'>
          {vacations.map(record => <Item key={record.id} record={record} />)}
        </div>
      </div>
    )
  } else {
    return (
      <div className= 'guest'>
        <h2> Hello guest! </h2>
        <h3> Please connect to see our vacations </h3>
      </div>
    )
  }
}

export default List;
