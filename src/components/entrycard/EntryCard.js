import React from 'react'
import "./EntryCard.css"

const EntryCard = (props) => {
  return (
    <div className="card-border">
        <p className="desc-text">{props.food_name}, Calories: {props.num_calories}</p>
        <p className="desc-text">{props.description}</p>
    </div>
  )
}

export default EntryCard