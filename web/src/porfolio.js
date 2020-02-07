import React from 'react';
import {getVideoImage} from './vimeo';
import Radium from 'radium';
import {desktop, mobile} from './breakpoints';

const awsroot = 'https://austin-portfolio-react.s3.us-east-2.amazonaws.com/';

const showcaseImageOverrides = {
    'Purler Wrestling Academy': awsroot + 'pwa.png',
    'Lindenwood': awsroot + 'lu.png',
    'More': awsroot + 'challenger.png',
};

function getShowcaseImage(name, video) {
    if (name in showcaseImageOverrides) {
        return showcaseImageOverrides[name];
    }

    return getVideoImage(video);
}

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
        [desktop]: {
            transform: 'skewX(-5deg)',
        },
        textAlign: 'center',
        color: 'white',
        transition: 'width 1s ease, height 1s ease',
        fontSize: '18px',
        position: 'relative',
        overflow: 'hidden',
        transformOrigin: 'top left',
        paddingLeft: '20px',
        paddingRight: '20px',
        ...styles
    }}>
        <div style={{
            zIndex: -1,
            position: 'absolute',
            backgroundImage: `url('${getShowcaseImage(name, videos[0])}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            [mobile]: {
                backgroundPosition: 'top',
                top: i === 0 ? 0 : '-30%',
                height: '160%',
                width: '100%',
                left: 0,
                transform: 'skewY(5deg)',
            },
            top: 0,
            height: '100%',
            left: '-30%',
            width: '160%',
            transform: 'skewX(5deg)',
            transformOrigin: 'top left',
        }}/>
        <h2 style={{
            position: 'relative',
            top: '50%',
            transform: 'translateY(-50%) skewX(5deg)',
            [mobile]: {
                transform: 'translateY(-50%) skewY(5deg)'
            }
        }}>
            {name}
        </h2>
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