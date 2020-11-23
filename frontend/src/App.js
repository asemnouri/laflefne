import React from 'react';
import Navbar from './components/Homepage/Navbar';
import Footer from './components/Homepage/Footer';
import Home from './components/Homepage/Home'
import $ from 'jquery'

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Trips from './components/Homepage/Cards'
import Login from './components/user/login'
import Trip from './components/trips/trips'
import Signup from './components/user/signup'
import Payment from './components/payment/payment'
import MyTrip from './components/trips/mytrips'
import Profile from './components/user/Profile';
import Navbar2 from './components/Homepage/Navbar-login';
import ListOfUsers from "./components/user/listOfUsers/listOfUsers.jsx"
import AddTrips from "./components/user/listOfTrips/addTrips.jsx"
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      islogin: true,
      isuser: false,
      tokenin: "",
      testtrips: [],
      userid: ""
    }
    this.changeLogInStatus = this.changeLogInStatus.bind(this)
    this.getTrips = this.getTrips.bind(this)
    // this.changeUserStatus = this.changeUserStatus.bind(this)
  }
  //user want to sign up or sign in (State change)
  changeLogInStatus() {
    this.setState({
      islogin: !this.state.islogin,
    })
  }
  //user is login or not (State change)
  changeUserStatus = () => {
    this.setState({
      isuser: !this.state.isuser,

    })
  }
  //to get all the trips
  getTrips = () => {
    var alltrips = []
    $.ajax({
      type: "GET",
      url: "/gettrips",
      success: (res) => {
        for (var i in res) {
          alltrips.push(res[i])
        }
        this.setState({
          testtrips: alltrips
        })
      },
      error: function (err) {
        console.error(err)
      }
    })
  }

  //the component are loaded in the page or not 
  //display the trips and get user info if he is logged in 
  componentDidMount() {
    this.setState({
      tokenin: document.cookie
    })
    //to got to the top of the page
    document.documentElement.scrollTop = 0;
    this.getTrips()
    if (document.cookie !== `authToken=`) {
      $.get('/checkuser', (res) => {
        console.log(res._id)
        $.ajax({
          method: 'POST',
          url: '/getuserinfo',
          data: { id: res._id },
          success: (resin) => {
            console.log(resin._id)

            this.setState({
              userid: resin
            })
            // localStorage.setItem("user-id",resin._id)  
          },
          error: (err) => {
            console.log(err)
          }
        })
      })
    }
  }


  render() {
    const { islogin } = this.state
    let comp
    let nav
    //to check if the user want to sign up will be directed to sign up form 
    if (islogin) {
      comp = <Route
        path='/sign-up'
        render={(props) => <Signup toggleLogin={this.changeLogInStatus} />}
      />
    }
    else {
      //to check if the user want to login will be directed to login form 
      comp = <Route
        path='/sign-in'
        render={(props) => <Login toggleuser={this.changeUserStatus} toggleLogin={this.changeLogInStatus} />}
      />
    }
    // if there is token - display navbar2 (login in navbar)
    // console.log(document.cookie)
    if (this.state.tokenin !== `authToken=` && this.state.tokenin !== '') {
      nav = <Navbar2></Navbar2>
    }
    else {
      //display original navbar 
      nav = <Navbar></Navbar>
    }
    return (
      <>
        <Router>
          {nav}
          <Switch>
            {comp}
            <Route
              path="/"
              exact render={(props) => <Home userid={this.state.userid} testtrips={this.state.testtrips} trip={this.state.thetrip} />}
            />
            <Route
              path="/trips"
              render={(props) => <Trips userid={this.state.userid} testtrips={this.state.testtrips} trip={this.state.thetrip} />}
            />
            <Route path="/sign-up" exact component={Signup} />
            <Route path="/sign-in" exact component={Login} />
            <Route path="/user" exact render={(props) => <Profile userid={this.state.userid} />}
            />
            <Route path="/trip" exact component={Trip} />
            <Route path="/mytrip" exact component={MyTrip} />
            <Route path="/payment" exact component={Payment} />

            <Route path="/user/users" exact render={() => <ListOfUsers userid={this.state.userid} />} />
            <Route path="/user/addtrip" exact render={() => <AddTrips userid={this.state.userid} />} />
          </Switch>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
