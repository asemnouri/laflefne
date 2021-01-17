import React from "react";
import '../Profile.css';
import Carditem from '../userBooks/Card';
import $ from 'jquery'
import { Link } from "react-router-dom"
import MediaControlCard from "../userBooks/Card";

// import BarButton from "../listOfTrips/BarButton"

class Invitations extends React.Component {

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
        fetch('/user/invitation', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userid: localStorage.getItem("user-id") }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.invitations)
                this.setState({ tripArray: data.invitations })
            })
            .catch(err => console.log(err))
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
            <div className='cards__container' id="cards__container1" style={{overflowY:"scroll" , height :"45vw"}}>
            {/* <div>
              <BarButton />
            </div> */}
              <div className="cards__wrapper" style={{paddingTop:"0px"}}>
                <br></br>
                <br></br>
              

                <div>
                {
                  this.state.tripArray.map((trip,i)=>{
                    return <MediaControlCard trip={trip.tripId} from_email={trip.from_email} senderName={trip.senderName} key={i} />
                  })
                  
                }
                </div>



                                <div>
                                    {
                                        this.state.tripArray.map((trip, i) => {
                                            return <MediaControlCard trip={trip.tripId} from_email={trip.from_email} senderName={trip.senderName} key={i} />
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

export default Invitations;
