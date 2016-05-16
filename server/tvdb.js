import request from 'request';
/*
 login when server start, save token and time,
 check token time before making each request.

 if expired, login again
 */

const API_KEY = '65B9367FC41A0AD0';
const API_URL = 'https://api.thetvdb.com';

let tvdbRequest = (function () {
  let token;
  const options = { url: `${API_URL}/login`, json: { apikey: API_KEY } };

  let getToken = new Promise((resolve, reject) => {
    if (!token || Date.now() - token.time > 144000) {
      request.post(options, (err, res, body) => {
        console.log('getting token from server');
        if (err) return reject(err);
        token = Object.assign({}, body, { time: Date.now() });
        resolve(token);
      })
    } else {
      resolve(token);
    }
  });
  return async function () {
    console.log('checking token');
    token = await getToken;
    return request.defaults({
      headers: {
        'Authorization': `Bearer ${token.token}`,
        'Accept-Language': 'en'
      }
    });
  };
})();

async function requestToPromise(option) {
  let request = await tvdbRequest();
  return new Promise((resolve, reject) => {
    request(option, (err, res, body) => {
      if (err) return reject(err);
      resolve(body);
    })
  })
}

async function search(keyword) {
  const searchOption = {
    url: `${API_URL}/search/series`,
    qs: {name: keyword},
    json: true
  };
  return await requestToPromise(searchOption);
}

async function getDetail(id) {
  const searchOption = {
    url: `${API_URL}/series/${id}`,
    json: true
  };
  return await requestToPromise(searchOption);
}

export default { search, getDetail };