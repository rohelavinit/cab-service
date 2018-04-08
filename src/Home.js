import React from 'react'
import axios from 'axios'
import './Home.css'

export default class Home extends React.Component{
  constructor(){
    super()
    this.state = {action : "BOOKING_PAGE", assignedCar : {}, error: ""}
    this.fullFillRequest = this.fullFillRequest.bind(this)
    this.endTheTrip = this.endTheTrip.bind(this)
    this.goBackToBookingPage = this.goBackToBookingPage.bind(this)
  }

  fullFillRequest(event){
    var customerReq = {
                        locX: document.getElementById('locX').value, 
                        locY: document.getElementById('locY').value, 
                        carColor: document.getElementById('carColor').value
                      }
    if(customerReq.locX.trim() === '' || customerReq.locY.trim() === ''){
      this.setState({error: "Please Enter Your Location"})
    } 
    else{
      axios.post('cab-request', customerReq)
      .then((response) => {     
        if(response.data.availabilityStatus === "CAR ASSIGNED")
          this.setState({action : "END_THE_TRIP_PAGE", assignedCar: response.data.assignedCarDetails, error: ""})
        else
          this.setState({action : "NO_CAB_AVAILABLE_PAGE", error: ""})
      })
      .catch(error => {
        this.setState({error})
      })
    }
  }

  getFakeCurrentLocation(){
    return{
      locX: Math.ceil(100 * Math.random()),
      locY: Math.ceil(100 * Math.random())      
    }
  }

  endTheTrip(event){
    var currLocation = this.getFakeCurrentLocation()
    axios.post('end-trip',{
      locX: currLocation.locX,
      locY: currLocation.locY,
      carID: this.state.assignedCar.id
    })
    .then(res => {
        this.setState({action : "Trip_Ended_PAGE", error: ""})      
    })
    .catch(error => {
        this.setState({error})
    })
  }

  goBackToBookingPage(){
    this.setState({action : "BOOKING_PAGE", error: ""})      
  }

  render(){
    switch(this.state.action){
      case "BOOKING_PAGE" : 
        return(
          <div>
              <h1>CAB-SERVICE</h1>
              <h3>Privide Your Details</h3>
              <h4>{this.state.error}</h4>              
              <div className='form'>
                <input placeholder='Enter location X' type='number' id='locX'/><br/>
                <input placeholder='Enter location Y' type='number' id='locY'/><br/>
                <select id='carColor'>
                  <option value="ANYCOLOR">AnyColor</option>                
                  <option value="PINK">PINK</option>
                  <option value="BLACK">BLACK</option>
                  <option value="WHITE">WHITE</option>
                </select><br/> 
                <button onClick={this.fullFillRequest}>book</button>                 
              </div>      
          </div>
        )
      case "END_THE_TRIP_PAGE" : 
        return(
          <div>
              <h1>CAB-SERVICE</h1>
              <h3>!!!!Congrats CAB ASSIGNED !!!!</h3>
              <h4>{this.state.error}</h4>                            
              <div>{console.log(this.state.assignedCar)}</div>       
              <button onClick={this.endTheTrip}>END THIS TRIP</button>
          </div>
        )
        case "Trip_Ended_PAGE" : 
        return(
          <div>
              <h1>CAB-SERVICE</h1>
              <h3>!!!!Thank you for riding with us!!!!</h3>
              <h5>The Cab is available for others.</h5>
              <button onClick={this.goBackToBookingPage}>Go Back to Booking Page</button>              
          </div>
        )
        case "NO_CAB_AVAILABLE_PAGE" : 
        return(
          <div>
            <h1>CAB-SERVICE</h1>
            <h4>!!!!SORRY NO CAB AVAILABLE!!!!</h4>            
          </div>
        )
    }
  }
}
