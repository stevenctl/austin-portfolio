import React, {useState} from 'react';
import Radium from 'radium';
import {getVideoImage} from './vimeo';
import {desktop, mobile} from './breakpoints';


function prettyTimestamp(seconds) {
    const minutes = Math.floor(seconds / 60);
    const additionalSeconds = Math.floor(seconds % 60);
    return `${minutes}:${additionalSeconds < 10 ? '0' : ''}${additionalSeconds}`;
}

const VideoThumb = Radium(({video, onClick}) => <div onClick={onClick} style={{
    minWidth: '100vw',
    ':hover': {
        backgroundColor: '#333D',
    },
    [desktop]: {
        minWidth: 0,
        maxWidth: '100%'
    },
    borderTop: '1px solid #666'
}}>
    <div style={{width: '100%', textAlign: 'left', display: 'flex'}}>
        <img
            style={{
                width: '168px',
                height: '94px',
                [mobile]: {
                    width: '40vw',
                    height: 'calc((9/16) * 40vw)'
                }
            }}
            src={getVideoImage(video)}
        />
        <div style={{paddingTop: '4px', marginLeft: '8px',}}>
            <h3 style={{margin: 0}}>{video.name}</h3>
            <h4  style={{margin: 0}}>{prettyTimestamp(video.duration)}</h4>
        </div>
    </div>
</div>);


const NavItem = Radium(({up = false, down = false}) => <div onClick={() => {
    if (up) {
        window.fullpage_api.moveSectionUp();
    } else if (down) {
        window.fullpage_api.moveSectionDown();
    }
}} style={{
    paddingTop: '12px',
    paddingBottom: '12px',
    minWidth: '100vw',
    ':hover': {
        backgroundColor: '#333D',
    },
    [desktop]: {
        display: 'none'
    },
    borderTop: '1px solid #666'
}}>
    <div style={{width: '100%', textAlign: 'center', display: 'flex'}}>
        <i style={{marginLeft: 'auto', marginRight: 'auto'}} className={`fas fa-chevron-${up ? 'up' : 'down'}`}/>
    </div>
</div>);


const gradients ={
    'Purler Wrestling Academy': 'rgb(132,0,0)',
    'Lindenwood': 'rgb(179,137,60)',
    'More': 'rgb(0,102,179)',
};

function getGradientColor(categoryName) {
    return gradients[categoryName];
}

const CategoryPage = Radium(({categoryName, videos}) => {
    const [selected, setSelected] = useState(0);
    const [autoplay, setAutoplay] = useState(false);

    return <div style={{
        paddingTop: '120px',
        [mobile]: {
            paddingTop: '0'
        },
        width: '100vw', height: '100vh',
        backgroundImage: `linear-gradient(120deg, rgba(16,16,16,1) 67%, ${getGradientColor(categoryName)} 100%)`,
        backgroundSize: 'cover',
        backgroundBlendMode: 'saturation',
        textAlign: 'center',
    }}>
        <div style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
            [mobile]: {
                flexDirection: 'column',
            }
        }}>
            <iframe
                allow="autoplay; fullscreen"
                allowFullScreen
                frameBorder="none"
                src={videos[selected].src + `?autoplay=${autoplay ? 1 : 0}`}
                style={{
                    border: 'none',
                    width: 'calc(100vw - 300px)',
                    height: 'calc((9/16) * (100vw - 300px))',
                    maxHeight: '576px',
                    maxWidth: '1024px',
                    [mobile]: {
                        width: '100vw',
                        height: 'calc((9/16) * 100vw)',
                    }
                }}
            />
            <VideoList videos={videos} categoryName={categoryName} setAutoplay={setAutoplay} setSelected={setSelected} />
        </div>
    </div>;
});

// eslint-disable-next-line react/prop-types
const VideoList = Radium(({videos, categoryName, setAutoplay, setSelected}) =>  (
    <div
        className="normalscroll"
        style={{
            backgroundColor: '#333A',
            display: 'flex',
            flexDirection: 'column',
            width: '100vw',
            overflow: 'scroll',
            height: `calc(${window.innerHeight}px - (9/16) * 100vw)`,
            [desktop]: {
                width: '300px',
                height: 'fit-content',
                maxHeight: 'calc(100vh - 120px)',
            }
        }}>
        <NavItem up/>
        {videos.map((video, i) =>
            <VideoThumb
                key={`video-${categoryName}-${video.name}`}
                onClick={() => {
                    setAutoplay(true);
                    setSelected(i);
                }} video={video}
            />
        )}
        <NavItem down/>
    </div>
));

export default CategoryPage;