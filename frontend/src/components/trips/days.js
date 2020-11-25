import React from 'react'
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

//Slide img proparity (react slide img)
const properties = {
    duration: 9000000000000,
    transitionDuration: 400,
    infinite: true,
    indicators: false,
    arrows: true
};
class Day extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div >
                <div className='d-flex flex-wrap justify-content-around' >
                    <div className='inlinediv' style={{ 'width': '55%', 'height': '200px' }}>
                        <div style={{ "borderRadius": "16px 0 16px 0", 'width': '99%', 'height': "35px", 'backgroundColor': " rgb(82, 10, 41)", 'color': 'white', 'paddingTop': '5px' }}>
                            <h5 style={{ 'marginLeft': '15px' }}>Day {this.props.dayno}</h5>
                        </div>
                        <p className='pfont' style={{ 'marginTop': '8px' }}> {this.props.dayinfo}
                        </p>
                    </div>
                    <div className='inlinediv' style={{ 'width': '44%' }}>
                        <div >
                            <Slide  {...properties}>
                                {console.log(this.props.imgs)}
                                {/* {(Array.isArray(this.props.imgs[0]))?
                            this.props.imgs=this.props.imgs[0]
                            :
                            this.props.imgs
                            } */}
                                {this.props.imgs.map((item, i) => { console.log("item", item); return <img className='tripimgs' src={item} key={i} alt='Date'></img> })}
                            </Slide>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Day