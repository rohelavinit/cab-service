import React from 'react'
import './Home.css'

export default class Car extends React.Component{  
  render(){
      var car = this.props.car
      return(
          <span key={car.id} className='margin-car border'>
             <span className='padding-car'>{car.bodyColor}</span> 
             <span>{'(' + car.location.X + ',' + car.location.Y + ')'}</span> 
             <span className={ car.isAvailable === "Y" ? 'car-avail' : 'car-not-avail'}></span> 
          </span>
      )
  }
}