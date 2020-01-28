import React, {useState} from 'react';
import Radium from 'radium';


const VideoThumb = Radium(({video, onClick}) => <div onClick={onClick} style={{width: '420px'}}>
    <img style={{width: '100%', ':hover': {filter: 'grayscale(100%)'}}} src={video.image} />
</div>);

const CategoryPage = ({name, videos}) => {

    const [selected, setSelected] = useState(0);

    return <div style={{
        width: '100%',
        height: '100%',
        backgroundImage: `linear-gradient(black, black), url('${videos[selected].image}')`,
        backgroundBlendMode: 'saturation'
    }}>
        <div style={{position: 'absolute', top: 0, width: '100%', height: '80px', lineHeight: '80px', textAlign: 'center'}}>
            <h1 style={{ height: '80px'}}>{name}</h1>
        </div>
        <div style={{
            zIndex: 2,
            position: 'absolute',
            bottom: 0,
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <iframe
                frameBorder="none"
                src={`https://player.vimeo.com${videos[selected].url}`}
                style={{
                    border: 'none',
                    position: 'relative',
                    width: '50vw',
                    height: 'calc((9 / 16) * 50vw)',
                    marginLeft: 'auto', marginRight: 'auto'
                }}
            />
            <div style={{
                display: 'flex',
                overflowX: 'scroll',
            }}>
                {videos.map((video, i) => <VideoThumb onClick={() => setSelected(i)} video={video}/>)}
            </div>
        </div>
    </div>;
};

export default CategoryPage;