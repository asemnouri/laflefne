import React from 'react';
import Carditem from './Carditem';
import './A-Style.css'
import "./card.css"
class Cards extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        
        }
    }
    componentDidMount() {
        document.documentElement.scrollTop = 0;
    }

    render() {
        
        return (
            <div className='cards'>
                <h1>New Featured Trips</h1>
                <div className='cards__container'>
                        <ul className="cards-list">
                        {/* Display the three newest featured trip in the homepage */}
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
                </div>
            </div>
        )
    }
}

export default Cards
