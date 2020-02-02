import React from 'react';
import {getVideoImage} from './vimeo';
import Radium from 'radium';
import {desktop, mobile} from './breakpoints';

const ShowcaseItem = Radium(({videos, name, panel, proportion}) => ([
    {
        height: '100%',
        width: proportion,
        ':hover': {
            width: '80%',
        },
        [mobile]: {
            display: 'none'
        },
    },
    {
        height: proportion,
        width: '100%',
        ':hover': {
            height: '80%',
        },
        [desktop]: {
            display: 'none'
        },
    }
].map((styles, i) => (
    <div key={`showcase-item-${i}`} onClick={() => window.fullpage_api.moveTo(panel)} style={{
        lineHeight: '100%',
        transform: 'skewY(-5deg)',
        textAlign: 'center',
        color: 'white',
        transition: 'width 1s ease, height 1s ease',
        fontSize: '18px',
        backgroundImage: `url('${getVideoImage(videos[0])}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        ...styles
    }}>
        <h2 style={{height: '100%', lineHeight: '100%'}}>{name}</h2>
    </div>))));

const Porfolio = Radium(({showcases}) => {
    const gridSize = Math.ceil(Math.sqrt(Object.keys(showcases).length));
    console.log(`repeat(1fr, ${gridSize}fr)`);
    return (<div style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        background: 'black',
        [desktop]: {
            flexDirection: 'row',
        }
    }}>
        {Object.keys(showcases).map((name, i) => <ShowcaseItem
            proportion={`${Math.ceil(100 / Object.keys(showcases).length)}%`}
            panel={i+3}
            key={`sc-thumb-${name}`}
            name={name}
            videos={showcases[name]}
        />)}
    </div>);
});

Porfolio.propTypes = {
    showcases: Object
};

export default Porfolio;