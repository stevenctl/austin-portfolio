const { Router } = require('express');
const axios = require('axios');
const base64 = require('base-64');

// shut up... ik..
const USER_ID = 107760914;
const CLIENT_ID = 'e9c3481c1c7965b635f854deeb6e41729821f61a';
const CLIENT_SECRET = 'gxbXWuEg4nS3NuPtFMmGYZHw5sYGVPj5r1cCjhn2H/uAAaTCGSZFdFU37DNMVFAQDgm9aFHoNKehlaHbWYjoR0VN9wh+h7xIdHF8CN/wljbKYatlMbwQhWAhSuy0eJiT';

const router = Router();

const MINUTE = 1000 * 60;
const cache = {
  token: {
    ttl: 30 * MINUTE,
  },
  showcases: {
    ttl: 10 * MINUTE,
  },
  set(key, value) {
    this[key].value = value;
    this[key].ts = new Date().getTime();
  },
  get(key, allowExpired = false) {
    const item = this[key];
    if (
      !item || !item.ts
        || (!allowExpired && new Date().getTime() - item.ts > (item.ttl || MINUTE))
    ) {
      return null;
    }

    return item.value;
  }
}; // stores values of shape {value: any, ts: Number}

function conf() {
  return {
    headers: {
      Authorization: `Bearer ${cache.token.value}`,
      'Content-Type': 'application/json'
    },
  };
}

function authenticate() {
  return new Promise((resolve, reject) => {
    const cachedToken = cache.get('token');
    if (cachedToken) {
      resolve(cachedToken);
      return;
    }
    console.log('INFO', 'Getting a new access token...');
    axios.post(
      'https://api.vimeo.com/oauth/authorize/client',
      {
        grant_type: 'client_credentials',
        scope: 'public'
      },
      {
        headers: {
          Authorization: `basic ${base64.encode(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
          'Content-Type': 'application/json',
          Accept: 'application/vnd.vimeo.*+json;version=3.4',
        },
      }
    ).then((res) => {
      const accessToken = res.data.access_token;
      cache.set('token', accessToken);
      resolve(accessToken);
    }).catch((e) => reject(e));
  });
}

const embedPrefix = 'https://player.vimeo.com/video/';

const showcasePriority = (showcase) => {
  const match = /^\[(\d+)\]/.exec(showcase.description);
  if (!match) {
    return -1;
  }
  console.log(`${showcase.name} ${match[1]}`);
  return match[1];
}

const mapVideo = (video) => ({
  name: video.name,
  src: `${embedPrefix}${video.uri.split('/')[2]}`,
  duration: video.duration,
  pictures: video.pictures.sizes.map((pic) => pic.link)
});


router.get('/api/showcases', (req, res, next) => {
  const cachedResponse = cache.get('showcases');
  if (cachedResponse) {
    res.json(cachedResponse);
    return;
  }


  function handleError(e) {
    const expiredCachedResponse = cache.get('showcases', true);
    if (!expiredCachedResponse) {
      next(e);
      return;
    }
    res.json(expiredCachedResponse);
  }

  authenticate().then((_) => {
    axios.get(`https://api.vimeo.com/users/${USER_ID}/albums`, conf()).then((showcasesRes) => {
      const showcases = showcasesRes.data.data;
      const requests = showcases.sort((a, b) => showcasePriority(b) - showcasePriority(a)).map((sc) => axios.get(`https://api.vimeo.com${sc.uri}/videos?sort=manual`, conf()));
      Promise.all(requests).then((results) => {
        const payload = {};
        results.forEach((vidRes, i) => {
          payload[showcases[i].name] = vidRes.data.data.map(mapVideo);
        });
        cache.set('showcases', payload);
        res.json(payload);
      }).catch(handleError);
    }).catch(handleError);
  }).catch(handleError);
});


module.exports = router;
