import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {fetchShowcases} from './vimeo';
import ReactFullpage from '@fullpage/react-fullpage';
import Home from './home';
import CategoryPage from './category-page';
import Header from './header';
import Porfolio from './porfolio';
import {StyleRoot} from 'radium';

const Fullpage = props => <div className="section" style={{overflow:'hidden'}}{...props} />

const Root = () => {
    const [showcases, setShowcases] = useState(null);

    useEffect(() => {
        if (!showcases) {
            fetchShowcases().then(setShowcases);
        }
    }, [showcases]);
    if (!showcases) {
        return <div>loading</div>;
    }

    return (
        <StyleRoot>
            <Header />
            <ReactFullpage
            //fullpage options
                licenseKey = {'B01FF17C-F8E046DC-8CD10AFD-63E5D317'}
                scrollingSpeed = {1000} /* Options here */

                render={() => {
                    return (
                        <ReactFullpage.Wrapper>
                            <Fullpage id="home">
                                <Home className="section" />
                            </Fullpage>
                            <Fullpage>
                                <Porfolio showcases={showcases}/>
                            </Fullpage>
                            {
                                Object.keys(showcases).map((showcaseName => (
                                    <Fullpage key={`slide-${showcaseName}`}>
                                        <CategoryPage categoryName={showcaseName} videos={showcases[showcaseName]}/>
                                    </Fullpage>
                                )))
                            }
                        </ReactFullpage.Wrapper>
                    );
                }}
            />
        </StyleRoot>);
};


ReactDOM.render(
    React.createElement(Root, {}, null),
    document.getElementById('vimeo-portfolio-target')
);

