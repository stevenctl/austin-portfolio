/*eslint quotes:0*/
import React from "react";

const dockedStyle = {
    transition: 'background-color 1s ease',
    display: 'block',
    position: 'fixed',
    zIndex: 10,
    width: '100%',
    top: 0,
    left: 0
};


const Header = () => {
    return (
        <div style={{...dockedStyle}}>
            <a href="#" onClick={() => window.fullpage_api.moveTo(1)}>
                <img src={'https://austin-portfolio-react.s3.us-east-2.amazonaws.com/logo-white.png'} style={{height: '120px'}}/>
            </a>
        </div>
    );
};

export default Header;