import React from "react";
import '../Profile.css';
// import Carditem from './UserCarditem';
import $ from 'jquery'
import { Link } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
class ListOfUsers extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      usename: '',
      useremail: '',
      mytrips: '',
      arrayofuser: [],
      _id: '',
      //defulat img for user
      profileimg: 'https://i.imgur.com/ejGOOnV.jpg'
    }
  }

  //display the user info and user trips

  handelremove = (id) => {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id:id })
    };
    fetch('/removeuser', requestOptions)
      .then(response => response.json())
      .then((data) => {
        console.log(data)
        this.componentDidMount()
      })

  }
  handelgetdata = () => {
    fetch('/alldata')
      .then(response => response.json()).then((data) => {
        console.log('whyit', data)
        this.setState({ arrayofuser: data })
      })

  }


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
    this.handelgetdata()
  }

  render() {
    console.log('aa', this.state.arrayofuser)
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
            {/* <div className='cards__container' id="cards__container1">
              <div className="cards__wrapper">
                <br></br>
              </div>
            <div> zxvxvxcv </div>
            </div>   */}

            <div style={{ display: "flex", marginTop: "5rem", justifyContent: "center", height: "50vh", }}>
              {/* <div style={{ flex: ".20" }}></div> */}
              <div style={{ backgroundColor: "#ffffff70", flex: ".20", textAlign: "center" }}>
                <div style={{ borderBottom: ".5px solid", marginTop: "2px" }}>
                  UserName
                     </div>
                {this.state.arrayofuser.map((user) => {
                  console.log('zz', user)
                  return <div style={{ marginTop: "1rem" }}><p>{user.userName} </p>
                  </div>
                })}
              </div>
              <div style={{ flex: ".20", backgroundColor: "#ffffff70", borderLeft: ".5px solid", textAlign: "center" }}>
                <div style={{ borderBottom: ".5px solid", marginTop: "2px" }}>
                  Email
              </div>
                {this.state.arrayofuser.map((user) => {
                  return <div style={{ marginTop: "1rem" }}><p>{user.userMail}</p></div>

                })}
              </div>
              <div style={{ flex: ".20", backgroundColor: "#ffffff70", borderLeft: ".5px solid", textAlign: "center" }}>
                <div style={{ borderBottom: ".5px solid", marginTop: "2px" }}>
                  Makeadmin
                </div>
                {
                  this.state.arrayofuser.map((user) => {
                    return <div><Button variant="outlined" style={{ marginTop: ".4rem" }} >AddAdmin</Button> </div>
                  })
                }
              </div>
              <div style={{ flex: ".20", backgroundColor: "#ffffff70", borderLeft: ".5px solid", textAlign: "center" }}>
                <div style={{ borderBottom: ".5px solid", marginTop: "2px" }}>
                  remove User
              </div>
                {
                  this.state.arrayofuser.map((user) => {
                    return <div><Button variant="outlined" style={{ marginTop: ".4rem" }} onClick={() => this.handelremove(user._id)}>removeUser</Button> </div>
                  })
                }

              </div>

            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default ListOfUsers;

