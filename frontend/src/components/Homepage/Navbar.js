import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './A-Style.css';
import { Button } from './Button';
import { ButtonSignIn } from "./ButtonSignIn"
function Navbar() {
    //responsive nav bar functionality
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        } else {
            setButton(true);
        }
    };
    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener('resize', showButton);

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                        <h3>LAFLEFNE</h3>
                    </Link>
                    <div className='menu-icon' onClick={handleClick}>
                        <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
                    </div>
                    <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>Home</Link>
                        </li>
                        <li className='nav-item'>
                            <Link
                                to='/trips/'
                                className='nav-links'
                                onClick={closeMobileMenu}>Trips</Link>
                        </li>
                        <li>
                            <Link
                                to='/sign-up'
                                className='nav-links-mobile'
                                onClick={closeMobileMenu}>Sign Up</Link>
                        </li>
                        <li>
                            <Link
                                to='/sign-in'
                                className='nav-links-mobile'
                                onClick={closeMobileMenu}>Sign In</Link>
                        </li>
                    </ul>
                    {button && <Button buttonStyle='btn--outline' >SIGN UP</Button>}
                    {button && <Link to="/sign-in"><ButtonSignIn buttonStyle='btn--outline'>SIGN IN</ButtonSignIn></Link>}
                </div>
            </nav>
        </>
    )
}

export default Navbar