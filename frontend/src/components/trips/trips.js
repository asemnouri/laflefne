import React from "react";
import './trips.css';
// import { Link } from 'react-router-dom';
import Day from './days'
import ScrollDialog from "./chattbox/chattbox.jsx"
import StripeCheckoutButton from '../stripe/stripe-component'
class Trip extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            thetrip: {
                image: [],
                discription: {},
                _id: '',
            },
            booked: false,
            whobookit: 0,
            maxnoPerTrip: 0,
            chatBoxData: [],
            priceForStripe:0,
            tripId:"",
            idOfTourist:[]
        }
    }
    //to get the one trip data from db and display it
    componentDidMount = async () => {
        await this.setState({
            thetrip: this.props.location.state.trip,
            whobookit: this.props.location.state.trip.idOfTourist.length,
            maxnoPerTrip: this.props.location.state.trip.maximumNumPerTrip
        })
        document.documentElement.scrollTop = 0;
        console.log("naaaaaaaaaaaaame", this.state.thetrip.name)
        fetch('/getchatRoom', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: this.state.thetrip.name }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                this.setState({ chatBoxData: data.chatData, tripId:data._id,priceForStripe:data.price,idOfTourist:data.idOfTourist})//also get trip id and price 
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    render() {
        var today = new Date();
        let statedata = {}
        let pathname = '/trip'
        // if (this.props.location.state.userid && this.props.location.state.trip) {
        //     var ex = new Date(this.props.location.state.trip.deadLine)
        //     if (!this.props.location.state.trip.idOfTourist.includes(this.props.location.state.userid) && (this.state.maxnoPerTrip !== this.state.whobookit) && (ex.getTime() >= today.getTime())) {
        //         pathname = '/payment'
        //         statedata = {
        //             tripid: this.props.location.state.trip._id,
        //             userid: this.props.location.state.userid
        //         }
        //     }
        // }

        return (
            <div >
                {/* display the icons on the trip comp */}
                <div className="d-flex flex-wrap justify-content-around" style={{ 'textAlign': 'center', 'marginTop': '20px' }}>
                    <div>
                        <img className='imgs' src='https://www.flaticon.com/svg/static/icons/svg/2945/2945620.svg' alt='Trip Map'></img>
                        <p>{this.state.thetrip.name}</p>
                    </div>
                    <div>
                        <img className='imgs' src='https://www.flaticon.com/svg/static/icons/svg/3068/3068706.svg' alt='Night'></img>
                        <p>{this.state.thetrip.tripType}</p>
                    </div>
                    <div>
                        <img className='imgs' src='https://www.flaticon.com/svg/static/icons/svg/1071/1071526.svg' alt='People'></img>
                        <p>{this.state.thetrip.maximumNumPerTrip} person -- <small> available {this.state.maxnoPerTrip - this.state.whobookit} seat</small></p>

                    </div>
                    <div>
                        <img className='imgs' src='https://www.flaticon.com/svg/static/icons/svg/2635/2635433.svg' alt='Price'></img>
                        <p>{this.state.thetrip.price}</p>
                    </div>
                    <div>
                        <img className='imgs' src='https://www.flaticon.com/svg/static/icons/svg/3467/3467983.svg' alt='Date'></img>
                        <p>{new Date(this.state.thetrip.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                        <img className='imgs' src='https://www.flaticon.com/svg/static/icons/svg/3409/3409565.svg' alt='tripGuide'></img>
                        <p>{this.state.thetrip.tripGuide}</p>
                    </div>
                </div>
                <br></br>
                <div>
                    {Object.keys(this.state.thetrip.discription).map((value) => {
                        let props = {
                            key: value,
                            dayno: value,
                            dayinfo: this.state.thetrip.discription[value],
                            imgs: this.state.thetrip.image[parseInt(value) - 1] || this.state.thetrip.image[0]
                        }
                        console.log(props)
                        return (<div><Day {...props}></Day>
                            <br></br></div>)
                    }
                    )}
                </div>
                {/* user id from local storage */}
                {/* user id -- price -- trip id */}
                {/* put user id in trip */}
                {/* put trip id in the user */}
                {
                 this.state.idOfTourist.includes(localStorage.getItem("user-id"))?
                 <ScrollDialog chatBoxData={this.state.chatBoxData} name={this.state.thetrip.name} componentDidM={this.componentDidMount} />
                :
                <StripeCheckoutButton componentDidM={this.componentDidMount} price={this.state.priceForStripe} userid={localStorage.getItem("user-id")} tripId={this.state.tripId}/>
                }
                
               
                <br></br>
                <div className="bookx">
                    <small id="nobook"></small>
                </div>
            </div>
        )
    }

}

export default Trip;
