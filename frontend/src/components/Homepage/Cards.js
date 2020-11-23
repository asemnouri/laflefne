import React from 'react';
import Carditem from './Carditem';
import './A-Style.css'

class Cards extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hello: "hello"
        }
    }
    componentDidMount() {
        document.documentElement.scrollTop = 0;
    }

    render() {
        return (
            <div className='cards'>
                <h1>Check Out Our Trips</h1>
                <div className='cards__container'>
                    <div className="cards__wrapper">
                        <ul className="cards__items">
                        {/* to display the 1st three trip */}
                            {this.props.testtrips.slice(0, 3).map((trip) =>
                                <Carditem
                                    src={trip.image[0][0]}
                                    label={trip.name}
                                    text={trip.explore}
                                    path='/trip'
                                    trip={trip}
                                    userid={this.props.userid}
                                />)}
                        </ul>
                        <ul className="cards__items">
                        {/* to display the last two trips */}
                            {this.props.testtrips.slice(3, 5).map((trip) =>
                                <Carditem
                                    // src={trip.image[0][0]}
                                    label={trip.name}
                                    text={trip.explore}
                                    path='/trip'
                                    userid={this.props.userid}
                                    trip={trip}
                                    paymentCheck={this.props.paymentCheck}
                                />)}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cards
