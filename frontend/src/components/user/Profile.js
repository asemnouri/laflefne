import React from "react";
import './Profile.css';
import Carditem from './UserCarditem';
import $ from 'jquery'
import { Link } from "react-router-dom"
import addTrips from "./listOfTrips/addTrips";
import Card from "./userBooks/Card";
import MediaControlCard from "./userBooks/Card";
// import BarButton from "./listOfTrips/BarButton"

class Profile extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      usename: '',
      useremail: '',
      mytrips: '',
      //defulat img for user
      profileimg: 'https://i.imgur.com/ejGOOnV.jpg',
      tripArray: []
    }
  }
//asem
  //display the user info and user trips
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    console.log(this.props.userid)
    if (this.props.userid.userimage) {
      this.setState({
        profileimg: this.props.userid.userimage
      })
    }
    var array = []
    if (this.props.userid.trips) {
      var mytrips = this.props.userid.trips
      for (var i in mytrips) {
        $.ajax({
          type: "POST",
          url: "/getmytrips",
          data: { id: mytrips[i] },
          success: (res) => {
            array.push(res)
            this.setState({
              mytrips: array
            })
          },
          error: (err) => {
            console.log(err)
          }
        })

      }
    }
    //fetch data of users trips  here
    //send the user id from local storage as userid
    //retrive all trip ids and send the trip to  the front end 
    fetch('/getusertrips', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userid: localStorage.getItem("user-id") }),
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data.trips)
      this.setState({tripArray:data.trips})
    })
    .catch(err=>console.log(err))
  }

  render() {
    let cards
    if (this.state.mytrips) {
      cards = <div> <ul className="cards__items">
        {/* Display the user trip the first three */}
        {this.state.mytrips.slice(0, 3).map((trip) =>
          <Carditem
            src={trip.image[0][0]}
            label={trip.name}
            text={trip.explore}
            path='/mytrip'
            trip={trip}
          />)}</ul>
        <ul className="cards__items">
          {this.state.mytrips.slice(3, 5).map((trip) =>
            <Carditem
              src={trip.image[0][0]}
              label={trip.name}
              text={trip.explore}
              path='/mytrip'
              trip={trip}
            />)}</ul>
      </div>

    }
    else {
      cards = <div>No Booked Trips Yet</div>
    }
    return (
      <div className="imgdiv">
        <div className="row" id="row">
          <div id="profile" className="col-sm-4 right" >
            <br></br>
            <br></br>
            <br></br>
            <div className='picContainer'>
              <img className="img1"
                src={this.state.profileimg}
                alt="userPic"
              />
            </div>
            <br></br>
            
            <div className='textContainer' >
              <div>
                <h4 className="text">Name</h4>
                <h6 className="text1">{this.props.userid.userName}</h6>
              </div>
              <div>
                <h4 className="text">Email</h4>
                <h6 className="text1">{this.props.userid.userMail}</h6>
              </div>
              <div>
                <h4 className="text">Phone Number</h4>
                <h6 className="text1">{this.props.userid.userNum}</h6>
              </div>
              <div>
              <br></br>
                {this.props.userid.admin ?
                  <div>
                    <Link to="/user">
                      <button style={{backgroundColor:" #555555", border:"2px solid black", margin:"7px", paddingLeft:"3px",padding:"3px",borderRadius:"15px"}}>
                        user books
                      </button>
                    </Link>
                    <Link to="/user/users">
                      <button style={{backgroundColor:" #555555", border:"2px solid black", margin:"7px", paddingLeft:"3px",padding:"3px",borderRadius:"15px"}}>
                        users
                        </button>
                    </Link>
                    <Link to="/user/addtrip">
                      <button style={{backgroundColor:" #555555", border:"2px solid black", margin:"7px", paddingLeft:"3px",padding:"3px",borderRadius:"15px"}}>
                        add a new trip
                      </button>
                    </Link>
                    <Link to="/user/invitations">
                      <button style={{backgroundColor:" #555555", border:"2px solid black", margin:"7px", paddingLeft:"3px",padding:"3px",borderRadius:"15px"}}>
                        Invitations
                      </button>
                    </Link>
                  </div>

                  :
                  <div>
                    <Link to="/user">
                      <button style={{backgroundColor:" #555555", border:"2px solid black", margin:"7px", paddingLeft:"3px",padding:"3px",borderRadius:"15px"}}>
                        user books
                      </button>
                    </Link>
                    <Link to="/user/invitations">
                      <button style={{backgroundColor:" #555555", border:"2px solid black", margin:"7px", paddingLeft:"3px",padding:"3px",borderRadius:"15px"}}>
                        Invitations
                  </button>
                    </Link>
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="col left" id="column">
            <div className='cards__container' id="cards__container1">
            {/* <div>
              <BarButton />
            </div> */}
              <div className="cards__wrapper">
                <br></br>
                <br></br>
              

                <div>
                {
                  this.state.tripArray.map((trip,i)=>{
                    return <MediaControlCard trip={trip} key={i} />
                  })
                  
                }
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
