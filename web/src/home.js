import React from 'react';
import Slide from './slide';


const TagButton = ({...rest}) => (<button
    style={{
        padding: '16px',
        border: 'none',
        marginBottom: '4px',
        color: 'white',
        background: 'goldenrod',
        fontSize: '20px'
    }}
    {...rest}
/>);

const HomeContent = () => (<div style={{padding: '120px'}}>
    <div style={{display: 'flex', flexDirection: 'column', width: '320px', float: 'left', fontSize: '24pt'}}>
        <Slide enterDelay={1500} left>
            <h1>Capture what <span style={{color: 'goldenrod'}}>moves</span> you.</h1>
        </Slide>

    </div>
    <div style={{display: 'flex', flexDirection: 'column', width: '240px', float: 'right'}}>
        <TagButton onClick={() => window.fullpage_api.moveTo(3)}>
            Portfolio
        </TagButton>
        <TagButton onClick={() => window.fullpage_api.moveTo(2)}>
            Contact
        </TagButton>
    </div>

    <video autoPlay style={{
        zIndex: -1,
        position: 'absolute',
        height: '100vh',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)'
    }} src={'https://austin-portfolio-react.s3.us-east-2.amazonaws.com/hero.webm'} />
</div>);


export default HomeContent;