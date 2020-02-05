import React from 'react';
import Slide from './slide';
import {mobile} from './breakpoints';
import Radium from 'radium';


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

const HomeContent = Radium(({portfolioSlide, contactSlide}) => (<div style={{padding: '120px'}}>
    <div style={{display: 'flex', flexDirection: 'column', width: '320px', float: 'left', fontSize: '24pt'}}>
        <Slide enterDelay={1500} left>
            <h1 style={{marginTop: 0}}>Capture what <span style={{color: 'goldenrod'}}>moves</span> you.</h1>
        </Slide>

    </div>
    <div style={{display: 'flex', flexDirection: 'column', width: '240px', float: 'right', [mobile]: {float: 'left'}}}>
        <TagButton onClick={() => window.fullpage_api.moveTo(portfolioSlide)}>
            Portfolio
        </TagButton>
        <TagButton onClick={() => window.fullpage_api.moveTo(contactSlide)}>
            Contact
        </TagButton>
    </div>
    <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
    }}>
        <iframe
            src="https://player.vimeo.com/video/389400146?background=1"
            allow="autoplay"
            style={{
                top:' 50%',
                left:' 50%',
                zIndex: -1,
                position: 'absolute',

                width: '100vw',
                height:' 56.25vw',
                minHeight: '100vh',
                minWidth: '177.77vh',
                transform: 'translate(-50%, -50%)',

            }}
        />
    </div>
</div>));


export default HomeContent;