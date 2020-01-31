import React, {useState} from 'react';
import Radium from 'radium';
import {getVideoImage} from './vimeo';
import {desktop} from './breakpoints';


const VideoThumb = Radium(({video, onClick}) => <div onClick={onClick} style={{
    width: '80vw',
    display: 'inline-block',
    [desktop]: {
        width: '420px'
    },
}}>
    <div style={{display: 'relative', width: '100%', height: '100%'}}>
        <img style={{width: '100%',':hover': {filter: 'grayscale(100%)'}}} src={getVideoImage(video)} />
        <h3 style={{width: '100%', position: 'absolute', bottom: '0', left: '50%', margin: 'none',  transform: 'translate(-50%, -50%)'}}>{video.name}</h3>
    </div>
</div>);


const CategoryPage = Radium(({categoryName, videos}) => {
    const [selected, setSelected] = useState(0);

    return <div style={{
        width: '100vw', height: '100vh',
        backgroundImage: `linear-gradient(black, black), url('${getVideoImage(videos[selected])}')`,
        backgroundSize: 'cover',
        backgroundBlendMode: 'saturation',
        textAlign: 'center',
    }}>
        <h1 style={{ height: '80px'}}>{categoryName}</h1>
        <iframe
            frameBorder="none"
            src={videos[selected].src}
            style={{
                border: 'none',
                width: '100vw',
                height: 'calc((9/16) * 100vw)',
                [desktop]: {
                    height: '576px',
                    width: '1024px',
                }
            }}
        />
        <div style={{
            overflowX: 'scroll',
            maxWidth: '100vw',
            whiteSpace: 'nowrap'
        }}>
            {videos.map((video, i) => <VideoThumb
                key={`video-${categoryName}-${video.name}`}
                onClick={() => setSelected(i)} video={video}
            />)}
        </div>
    </div>;
});

export default CategoryPage;