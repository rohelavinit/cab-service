import React from 'react'
import './Home.css'
import Car from './Car'

export default class CarList extends React.Component{  
  render(){
      return(
          <div>
              {
                  this.props.carData.map((car, index)=> <Car key={index} car={car}/>)
              }
          </div>
      )
  }
}