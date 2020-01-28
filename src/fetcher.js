import axios from 'axios';
import base64 from 'base-64';

const USER_ID = 107760914;
const CLIENT_ID = 'e9c3481c1c7965b635f854deeb6e41729821f61a';
const CLIENT_SECRET = 'gxbXWuEg4nS3NuPtFMmGYZHw5sYGVPj5r1cCjhn2H/uAAaTCGSZFdFU37DNMVFAQDgm9aFHoNKehlaHbWYjoR0VN9wh+h7xIdHF8CN/wljbKYatlMbwQhWAhSuy0eJiT';


const TTL = 1000 * 60 * 90; // 90 mins

export function getVideos() {
    return new Promise((resolve, reject) => {

        const localVidsRaw = localStorage.getItem('videos');
        const localVids = localVidsRaw && JSON.parse(localVidsRaw);
        const localTs = localStorage.getItem('ts');
        if (localVids && new Date().getTime() - localTs < TTL) {
            resolve(localVids);
            return;
        }

        axios.post(
            'https://api.vimeo.com/oauth/authorize/client',
            {
                grant_type: 'client_credentials',
                scope: 'public'
            },
            {
                headers: {
                    'Authorization': `basic ${base64.encode(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.vimeo.*+json;version=3.4',
                },
            }
        ).then((authRes) => {
            const access = authRes.data.access_token;
            axios.get(`https://api.vimeo.com/users/${USER_ID}/videos?per_page=100`,
                {
                    headers: {
                        'Authorization': `Bearer ${access}`,
                        'Content-Type': 'application/json'
                    },
                },
            ).then(videoRes => {
                const videos = videoRes.data.data.map(v => {
                    return {
                        name: v.name,
                        image: v.pictures.sizes[Math.floor(v.pictures.sizes.length / 2)].link,
                        url: v.uri.replace('videos/', 'video/'),
                        tags: v.tags.map(t => t.name)
                    };
                });

                localStorage.setItem('videos', JSON.stringify(videos));
                localStorage.setItem('ts', new Date().getTime());

                resolve(videos);
            }).catch(e => reject(e));
        }).catch(e => reject(e));
    });

}