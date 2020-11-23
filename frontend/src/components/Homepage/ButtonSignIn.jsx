import React from 'react';
import './A-Style.css';
import { Link } from 'react-router-dom';
//responsive
const STYLES = ['btn--primary', 'btn--outline', 'btn--test'];
//responsive
const SIZES = ['btn--medium', 'btn--large'];
//redirect the user to the sign up page
export const ButtonSignIn = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)
        ? buttonStyle
        : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <Link to='/sign-in' className='btn-mobile'>
            <button
                className={`btn ${checkButtonStyle} ${checkButtonSize}`}
                onClick={onClick}
                type={type}
            >
                {children}
            </button>
        </Link>
    );
};