import React from 'react';
import {getVideoImage} from './vimeo';
import Radium from 'radium';

const ShowcaseItem = Radium(({videos, name, panel, width}) => (<div onClick={() => window.fullpage_api.moveTo(panel)} style={{
    transform: 'skewX(-5deg)',
    height: '100%',
    width: width,
    textAlign: 'center',
    color: 'white',
    transition: 'width 1s ease',
    fontSize: '18px',
    backgroundImage: `url('${getVideoImage(videos[0])}')`,
    backgroundSize: 'cover',
    ':hover': {
        width: '80%',
    }
}}>
    <h2>{name}</h2>
</div>));

const Porfolio = ({showcases}) => {
    const gridSize = Math.ceil(Math.sqrt(Object.keys(showcases).length));
    console.log(`repeat(1fr, ${gridSize}fr)`);
    return (<div style={{
        display: 'flex',
        height: '100%',
        background: '#333'
    }}>
        {Object.keys(showcases).map((name, i) => <ShowcaseItem width={`${100 / Object.keys(showcases).length}%`} panel={i+2} key={`sc-thumb-${name}`} name={name} videos={showcases[name]} />)}
    </div>);
};

Porfolio.propTypes = {
    showcases: Object
};

export default Porfolio;