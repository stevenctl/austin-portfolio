/*eslint quotes:0*/
import React from "react";
import Radium from 'radium';
import {mobile} from './breakpoints';

const dockedStyle = {
    transition: 'background-color 1s ease',
    display: 'block',
    position: 'fixed',
    zIndex: 10,
    width: '100%',
    top: 0,
    left: 0,
};


const Header = Radium(({homeSlide}) => {
    return (
        <div style={{...dockedStyle}}>
            <a href="#" onClick={() => window.fullpage_api.moveTo(homeSlide)}>
                <img src={'https://austin-portfolio-react.s3.us-east-2.amazonaws.com/logo-white.png'} style={{
                    marginLeft: '8px',
                    height: '100px',
                    [mobile]: {height: '48px'}
                }}/>
            </a>
        </div>
    );
});

export default Header;