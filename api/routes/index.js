const { Router } = require('express');
const axios = require('axios');
const base64 = require('base-64');


const USER_ID = 107760914;
const CLIENT_ID = 'e9c3481c1c7965b635f854deeb6e41729821f61a';
const CLIENT_SECRET = 'gxbXWuEg4nS3NuPtFMmGYZHw5sYGVPj5r1cCjhn2H/uAAaTCGSZFdFU37DNMVFAQDgm9aFHoNKehlaHbWYjoR0VN9wh+h7xIdHF8CN/wljbKYatlMbwQhWAhSuy0eJiT';

const router = Router();

const cache = { token: null }; // stores values of shape {value: any, ts: Number}
const TTL = 1000 * 60 * 30; // 30 mins

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
    if (cache.token && new Date().getTime() - cache.token.ts < TTL) {
      resolve(cache.token.value);
      return;
    }

    console.log('INFO', 'Getting a new access token...')
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
      cache.token = { ts: new Date().getTime(), value: res.data.access_token };
      resolve(cache.token.value);
    }).catch((e) => reject(e));
  });
}

const embedPrefix = 'https://player.vimeo.com/video/';

const mapVideo = (video) => ({
  name: video.name,
  src: `${embedPrefix}${video.uri.split('/')[2]}`,
  duration: video.duration,
  pictures: video.pictures.sizes.map((pic) => pic.link)
});

function handleError(e, next) {
  console.error(e);
  next(e);
}

router.get('/api/showcases', (req, res, next) => {
  authenticate().then((_) => {
    axios.get(`https://api.vimeo.com/users/${USER_ID}/albums`, conf()).then((showcasesRes) => {
      const showcases = showcasesRes.data.data;
      const requests = showcases.map((sc) => axios.get(`https://api.vimeo.com${sc.uri}/videos?sort=manual`, conf()));
      Promise.all(requests).then((results) => {
        const payload = {};
        results.forEach((vidRes, i) => {
          payload[showcases[i].name] = vidRes.data.data.map(mapVideo);
        });
        res.json(payload);
      }).catch((e) => handleError(e, next));
    }).catch((e) => handleError(e, next));
  }).catch((e) => handleError(e, next));
});


module.exports = router;
