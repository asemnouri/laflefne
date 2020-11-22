import React from 'react';
import './A-Style.css';
import { Link } from 'react-router-dom';
import $ from 'jquery'
//responsive
const STYLES = ['btn--primary', 'btn--outline', 'btn--test'];
//responsive
const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({
    children,
    type,
    buttonStyle,
    buttonSize
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)
        ? buttonStyle
        : STYLES[0];

    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <Link to='/' className='btn-mobile'>
            <button
                className={`btn ${checkButtonStyle} ${checkButtonSize}`}
                //log out on click 
                //destroy the token 
                onClick={() => {
                    $.ajax({
                        method: 'POST',
                        url: '/logout',
                        success: (res) => {
                            window.location.href = "/"
                            localStorage.removeItem("user-id")
                        }, 
                        error: (err) => {
                            console.log(err)
                        }
                    })
                }}
                type={type}
            >
                {children}
            </button>
        </Link>
    );
};