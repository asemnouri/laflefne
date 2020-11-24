/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { Link } from 'react-router-dom';

class CardItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    //to control the css of the cards   
    render() {
        return (
            <>
                <li className='cards__item' style={{ "backgroundColor": 'white' }}>
                    <Link className='cards__item__link' to={{
                        pathname: this.props.path,
                        state: {
                            trip: this.props.trip,
                            userid: this.props.userid._id
                        },
                    }}>
                        <figure className='cards__item__pic-wrap' data-category={this.props.label}>
                            <img
                                className='cards__item__img'
                                alt='Travel Image'
                                src={this.props.src}
                            />
                        </figure>
                        <div className='cards__item__info'>
                            <h5 className='cards__item__text'>{this.props.text}</h5>
                        </div>
                    </Link>
                </li>
            </>)
    };
}

export default CardItem;