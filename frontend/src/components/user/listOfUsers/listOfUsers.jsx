import React from "react";
import '../Profile.css';
// import Carditem from './UserCarditem';
import $ from 'jquery'
import { Link } from "react-router-dom"
class ListOfUsers extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      usename: '',
      useremail: '',
      mytrips: '',
      //defulat img for user
      profileimg: 'https://i.imgur.com/ejGOOnV.jpg'
    }
  }

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
  }
  
  render() {
   
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
            <br></br>
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
              <Link to="/user">
                  <button>
                    user books
                 </button>
                </Link>
                <Link to="/user/users">
                  <button>
                    users
                 </button>
                </Link>
                <Link to="/user/addtrip">
                  <button>
                    add a new trip
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="col left" id="column">
            <div className='cards__container' id="cards__container1">
              <div className="cards__wrapper">
                {/* <br></br> */}
                {/* <br></br> */}
                {/* <div className="textContainer">
                  <h4 className="text">Booked Trips</h4>
                </div> */}
                <br></br>
                ameeeeeeeeeeeeed
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ListOfUsers;
