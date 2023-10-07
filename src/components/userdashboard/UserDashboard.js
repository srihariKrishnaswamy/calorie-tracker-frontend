import React from 'react'
import AddEntry from '../addentry/AddEntry'

const UserDashboard = (props) => {
  return (
    <div>
      <AddEntry signOut={props.signOut}/>
    </div>
  )
}

export default UserDashboard