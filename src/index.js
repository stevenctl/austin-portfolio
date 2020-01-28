import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {getVideos} from './fetcher';
import ReactFullpage from '@fullpage/react-fullpage';
import HomeContent from './home';
import CategoryPage from './category-page';
import Header from './header';


const allowedTags = [
    'Lindenwood', 'Purler', 'Wedding', 'Travel'
];

const Root = () => {
    const [videos, setVideos] = useState(null);
    useEffect(() => {
        getVideos().then(setVideos);
    });

    const [tags, setTags] = useState(null);
    if (videos && !tags) {
        const temp = {};
        videos.forEach(v => v.tags.forEach(t => {
            if (!allowedTags.find((ft) => ft === t)) {
                console.log(`Filtered ${t}`);
                return;
            }
            if (!temp[t]) {
                temp[t] = [];
            }
            temp[t].push(v);
        }));
        setTags(temp);
    }


    if (!videos) {
        return <div>loading</div>;
    }

    return (
        <div>
            <Header />
            <ReactFullpage
            //fullpage options
                licenseKey = {'B01FF17C-F8E046DC-8CD10AFD-63E5D317'}
                scrollingSpeed = {1000} /* Options here */

                render={() => {
                    return (
                        <ReactFullpage.Wrapper>
                            <div id="home" className="section">
                                <HomeContent tags={tags} />
                            </div>
                            {
                                Object.keys(tags).map((tag => (
                                    <div key={`slide-${tag}`} className="section">
                                        <CategoryPage name={tag} videos={tags[tag]}/>
                                    </div>
                                )))
                            }
                        </ReactFullpage.Wrapper>
                    );
                }}
            />
        </div>);
};


ReactDOM.render(
    React.createElement(Root, {}, null),
    document.getElementById('vimeo-portfolio-target')
);

