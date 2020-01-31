import React from 'react';
import {getVideoImage} from './vimeo';
import Radium from 'radium';

const ShowcaseThumb = Radium(({videos, name, panel}) => (<div onClick={() => window.fullpage_api.moveTo(panel)} style={{
    textAlign: 'center',
    color: 'white',
    transition: 'font-size 0.5s ease, filter 0.5s ease',
    fontSize: '18px',
    filter: 'grayscale(80%)',
    ':hover': {
        fontSize: '20px',
        filter: 'none'
    }
}}>
    <img style={{height: '30vh'}} key={`sc-thumb-${name}`} src={getVideoImage(videos[0])} />
    <h3 style={{width: '100%', position: 'absolute', bottom: '0', left: '50%', margin: 'none',  transform: 'translate(-50%, -50%)'}}>{name}</h3>
</div>));

const Porfolio = ({showcases}) => {
    const gridSize = Math.ceil(Math.sqrt(Object.keys(showcases).length));
    console.log(`repeat(1fr, ${gridSize}fr)`);
    return (
        <div style={{position: 'relative'}}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                justifyItems: 'center',
                flexWrap: 'wrap',
            }}>
                {Object.keys(showcases).map((name, i) => <ShowcaseThumb panel={i+2} key={`sc-thumb-${name}`} name={name} videos={showcases[name]} />)}
            </div>
            <video autoPlay style={{
                zIndex: -1,
                position: 'absolute',
                width: '100vw',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
            }} src={'https://austin-portfolio-react.s3.us-east-2.amazonaws.com/Sunset_Swinging04_MP4_HDV_1080p25__TanuriX_Stock_Footage_NS.mp4'} />
        </div>);
};

Porfolio.propTypes = {
    showcases: Object
};

export default Porfolio;