/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Link } from 'react-router-dom';
import "./card.css"
class CardItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    //to control the css of the cards   
    render() {
        return (
                    <Link  to={{
                        pathname: this.props.path, 
                        state: {
                            trip: this.props.trip
                        },
                    }}>
                        <div class="card 1">
                            <div class="card_image"> <img src={this.props.src} /> </div>
                            <div class="card_title title-white">
                                <p>{this.props.text}</p>
                            </div>
                        </div>
                    </Link>
            )
    };
}

export default CardItem;