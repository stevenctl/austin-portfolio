import React from 'react';
import Radium from 'radium';
import {mobile} from './breakpoints';

const gradient = 'rgb(90, 70, 30)';

const IconLink = ({icon, href}) => <a style={{margin: '16px', color: 'goldenrod', fontWeight: 900}} href={href}>
    <h1><span className={icon}/></h1>
</a>;
   
const Contact =Radium(() => (<div style={{
    height: '100%',
    width: '100%',
    backgroundImage: `linear-gradient(rgb(16, 16, 16) 70%, ${gradient} 100%)`,
    paddingTop: '120px',
    [mobile]: {
        paddingTop: '40px',
        flexDirection: 'column',
    },
    display: 'flex',
    justifyContent: 'center',
    justifyItems: 'center',
    alignItems: 'center',
    fontSize: '40px'
}}>
    <IconLink icon="far fa-envelope"  href="mailto:austinlandowvideo@gmail.com"/>
    <IconLink icon="fab fa-instagram" href="https://www.instagram.com/austin_landow35"/>
    <IconLink icon="fab fa-vimeo-v"   href="https://vimeo.com/user107760914"/>
</div>));

export default Contact;
