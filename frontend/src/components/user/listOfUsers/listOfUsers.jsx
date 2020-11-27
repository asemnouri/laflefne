import React from "react";
import '../Profile.css';
// import Carditem from './UserCarditem';
import $ from 'jquery'
import { Link } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// import BarButton from "../listOfTrips/BarButton"

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
      profileimg: 'https://i.imgur.com/ejGOOnV.jpg',
      master: ""
    }
  }

  //display the user info and user trips

  handelremove = (id) => {
    // Simple POST request with a JSON body using fetch
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: id })
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

  handleAdminClick = (id) => {
    console.log(">>>>");
    fetch('/makeadmin', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        this.componentDidMount()
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  componentDidMount() {

    fetch('/getuserinfo', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: localStorage.getItem("user-id") }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        this.setState({ master: data.master })
      })
      .catch((error) => {
        console.error('Error:', error);
      });




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
      <div className="imgdiv" >
        <div className="row" id="row" >
          <div id="profile" className="col-sm-4 right"  >
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
              <div >
              <br></br>
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
            </div>
          </div>

          <div className="col left" id="column" >
            {/* <div>
              <BarButton />
            </div> */}
            <div style={{ display: "flex", marginTop: "5rem", justifyContent: "center", height: "62vh",overflowY:"scroll"}}>

              <div style={{ backgroundColor: "#ffffff70", flex: ".20", textAlign: "center" }}>
                <div style={{ borderBottom: ".5px solid", marginTop: "2px" }}>
                  UserName
                     </div>
                {this.state.arrayofuser.map((user) => {
                  return <div style={{ marginTop: "1.2rem" }}><p>{user.userName} </p>
                  </div>
                })}
              </div>
              <div style={{ flex: ".20", backgroundColor: "#ffffff70", borderLeft: ".5px solid", textAlign: "center" }}>
                <div style={{ borderBottom: ".5px solid", marginTop: "2px" }}>
                  Email
              </div>
                {this.state.arrayofuser.map((user) => {
                  return <div style={{ marginTop: "1.2rem" }}><p>{user.userMail}</p></div>

                })}
              </div>
              <div style={{ flex: ".20", backgroundColor: "#ffffff70", borderLeft: ".5px solid", textAlign: "center" }}>
                <div style={{ borderBottom: ".5px solid", marginTop: "2px" }}>
                  Makeadmin
                </div>
                {
                  this.state.arrayofuser.map((user) => {
                    return (<div>
                      {
                        (user.master === true) ?
                          <Button disabled variant="outlined" style={{ marginTop: ".4rem", paddingLeft: "30px", paddingRight: "30px" }} >Master</Button>
                          : (user.admin === true) ?
                            <Button disabled variant="outlined" style={{ marginTop: ".4rem", paddingLeft: "33px", paddingRight: "33px" }} >Admin</Button>
                            : <Button onClick={() => this.handleAdminClick(user._id)} variant="outlined" style={{ marginTop: ".4rem" }} >MakeAdmin</Button>
                      }
                    </div>)

                  })
                }
              </div>
              <div style={{ flex: ".20", backgroundColor: "#ffffff70", borderLeft: ".5px solid", textAlign: "center" }}>
                <div style={{ borderBottom: ".5px solid", marginTop: "2px" }}>
                  remove User
              </div>
              {console.log("ssssssssssssssss",this.state.master)}
                {
                  
                  this.state.master ?
                    this.state.arrayofuser.map((user) => {
                      return (<div>{
                        (user._id === localStorage.getItem("user-id")) ?
                          <Button variant="outlined" style={{ marginTop: ".4rem" }} disabled onClick={() => this.handelremove(user._id)}>removeUser</Button>
                         : <Button variant="outlined" style={{ marginTop: ".4rem" }} onClick={() => this.handelremove(user._id)}>removeUser</Button>
                      }
                      </div>)
                    })

                    :
                    this.state.arrayofuser.map((user) => {
                      return (<div>{
                        (user.master || user._id === localStorage.getItem("user-id")) ?
                          <Button variant="outlined" style={{ marginTop: ".4rem" }} disabled onClick={() => this.handelremove(user._id)}>removeUser</Button>
                          : user.admin ?
                            <Button variant="outlined" style={{ marginTop: ".4rem" }} disabled>removeUser</Button>
                            : <Button variant="outlined" style={{ marginTop: ".4rem" }} onClick={() => this.handelremove(user._id)}>removeUser</Button>
                      }
                      </div>)
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

