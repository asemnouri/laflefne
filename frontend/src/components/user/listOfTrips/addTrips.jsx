import React from "react";
import '../Profile.css';
import './trip.css';
// import Icon from '@material-ui/core/Icon';
// import SaveIcon from '@material-ui/icons/Save';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
// import Carditem from './UserCarditem';
import $ from 'jquery'
import { Link } from "react-router-dom"
import BarButton from "./BarButton";
class AddTrips extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      image: '',
      tripType: '',
      name: '',
      price: '',
      date: '',
      deadLine: '',
      tripGuide: '',
      maximumNumPerTrip: '', //num
      discription: "",
    }
  }
  handleSubmit = async event => {
    event.preventDefault();
    console.log('/****************************INSIDE HANDLE SUBMIT')
    console.log(this.state)
    fetch('/addTrip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: this.state }),
    })
      .then(res => {
        console.log('************************')
        console.log(res)
      })
      .catch(err => console.log(err))

    this.setState({
      image: '',
      tripType: '',
      name: '',
      price: '',
      date: '',
      deadLine: '',
      tripGuide: '',
      maximumNumPerTrip: '', //num
      discription: "",
    })
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

  handleChange = (event) => {

    this.setState({ [event.target.name]: [event.target.value] });
  };


  render() {

    const { image, tripGuide, name, tripType, price, date, deadLine, maximumNumPerTrip, discription } = this.state
    return (
      <div className="imgdiv">
        <div className="row" id="row">
          <div id="profile" className="col-sm-4 right" >
            <br></br>
            <br></br>
            <br></br>
           
            <div className='picContainer'>
              <img className="img1"
                src={this.state.profileimg || 'https://i.imgur.com/ejGOOnV.jpg'}
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
            <div>
              <BarButton />
            </div>
              <div className="cards__wrapper">
                <FormControl fullWidth className='classes.margin' variant="outlined" style={{ width: '600px', paddingBottom: '20px' }}>
                  <InputLabel htmlFor="outlined-adornment-amount">Images</InputLabel>
                  <OutlinedInput
                    placeholder="img1URL - img2URL - 3 - 4 - etc"
                    id="outlined-images"
                    value={image}
                    onChange={this.handleChange}
                    name='image'
                    // startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    labelWidth={60}
                  />
                </FormControl>


                <FormControl fullWidth className='classes.margin' variant="outlined" style={{ width: '600px', paddingBottom: '20px' }}>
                  <InputLabel htmlFor="outlined-adornment-amount">Discription</InputLabel>
                  <OutlinedInput
                    placeholder="discription 0 - discription 1 - etc"
                    id="outlined-discription"
                    value={discription}
                    name='discription'
                    onChange={this.handleChange}
                    // startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    labelWidth={82}
                  />
                </FormControl>

                <br></br>

                <TextField
                  label="Trip Name"
                  style={{ width: '260px' }}
                  id="outlined-margin-normal"
                  defaultValue="Default Value"
                  // className={name}
                  name="name"
                  onChange={this.handleChange}
                  value={name}
                  // helperText="Some important text"
                  margin="normal"
                  variant="outlined"
                />

                <TextField
                  label="Guide Person"
                  style={{ marginLeft: "5vw", width: '260px' }}
                  id="outlined-margin-normal"
                  defaultValue="Default Value"
                  // className={tripGuide}
                  name="tripGuide"
                  onChange={this.handleChange}
                  value={tripGuide}
                  //helperText="Some important text"
                  margin="normal"
                  variant="outlined"
                />

                <br></br>

                <TextField
                  label="Type"
                  style={{ width: '260px' }}
                  id="outlined-margin-normal"
                  defaultValue="Default Value"
                  // className={tripType}
                  name="tripType"
                  value={tripType}
                  onChange={this.handleChange}
                  //helperText="Some important text"
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  style={{ marginLeft: "5vw", width: '260px' }}
                  label="Price"
                  id="outlined-margin-normal"
                  defaultValue="Default Value"
                  onChange={this.handleChange}
                  // className={price}
                  // helperText="Some important text"
                  margin="normal"
                  name="price"
                  value={price}
                  variant="outlined"
                />

                <br></br>

                <form className='container' noValidate>
                  <TextField
                    id="date"
                    label="date"
                    type="date"
                    value={date}
                    name='date'
                    defaultValue={Date()}
                    onChange={this.handleChange}
                    className='textField'
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </form>
                <br></br>
                <form className='container' noValidate>
                  <TextField
                    id="date"
                    label="deadLine"
                    type="date"
                    name="deadLine"
                    value={deadLine}
                    defaultValue={Date()}
                    onChange={this.handleChange}
                    className='textField'
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />

                </form>
                <form className='container'>

                  <input type="number" class="textField"
                    id="people" name="maximumNumPerTrip" onChange={this.handleChange} value={maximumNumPerTrip} min="0" placeholder="# of people" />

                  <Button
                    style={{ marginTop: '10px' }}
                    className="textField pad"
                    variant="outlined"
                    color="primary"
                    onClick={this.handleSubmit}
                    type="submit"
                    size="small">
                    Save
               </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div >
    )
  }
}

export default AddTrips;
