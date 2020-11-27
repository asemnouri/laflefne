import React from 'react';
import Carditem from './Carditem';
import './A-Style.css'
import "./card.css"

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
                        <div className="cards-list">
                            {/* to display the 1st three trip */}
                            {this.props.testtrips.map((trip) =>
                                <Carditem
                                    src={trip.image[0][0]}
                                    label={trip.name}
                                    text={trip.explore}
                                    path='/trip'
                                    trip={trip}
                                    userid={this.props.userid}
                                />)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Cards
