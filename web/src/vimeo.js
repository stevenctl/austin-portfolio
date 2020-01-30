import axios from 'axios';

const CACHE_KEY = 'cache:showcases';
const TTL = 1000 * 60 * 90; // 90 mins

function cacheVids(showcases) {
    localStorage.setItem(CACHE_KEY, JSON.stringify({
        value: showcases,
        ts:  new Date().getTime()
    }));
    return showcases;
}

function checkCache(ignoreTTL = false) {
    const cachedRaw = localStorage.getItem(CACHE_KEY);
    const cached = cachedRaw && JSON.parse(cachedRaw);

    // check if expired
    if (!(cached && (ignoreTTL || new Date().getTime() - cached.ts < TTL))) {
        return null;
    }

    return cached.value;
}


export function getVideoImage(video, thumb=false) {
    if (!video) return;
    const idx = thumb ? Math.floor(video.pictures.length / 2) : video.pictures.length - 1;
    return video.pictures[idx];
}

export function fetchShowcases() {
    return new Promise((resolve, reject) => {
        const cached = checkCache();
        if (cached) {
            resolve(cached);
            return;
        }

        axios.get('http://localhost:3030/api/showcases')
            .then(res => resolve(cacheVids(res.data)))
            .catch(e => {
                console.error(e);
                const oldCached = checkCache(true);
                if (!oldCached) {
                    reject(e);
                    return;
                }
                resolve(oldCached);
            });
    });
}