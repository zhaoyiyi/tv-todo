import request from 'request';
import moment from 'moment';
/*
 login when server start, save token and time,
 check token time before making each request.

 if expired, login again
 */

const API_KEY = '65B9367FC41A0AD0';
const API_URL = 'https://api.thetvdb.com';

let token = {
  token: '',
  time: 0
};

const getToken = () => {
  const options = { url: `${API_URL}/login`, json: { apikey: API_KEY } };
  return new Promise((resolve, reject) => {
    request.post(options, (err, res, body) => {
      console.log('getting token from server');
      if (err) return reject(err);
      token = Object.assign({}, body, { time: Date.now() });
      resolve();
    })
  })
};

const tvdbRequest = async function () {
  // one hour
  if (!token.token || (Date.now() - token.time) > 3600000) {
    await getToken();
  }
  return request.defaults({
    headers: {
      'Authorization': `Bearer ${token.token}`,
      'Accept-Language': 'en'
    },
    json: true
  });
};

async function requestToPromise(option) {
  let request = await tvdbRequest();
  return new Promise((resolve, reject) => {
    request(option, (err, res, body) => {
      if (err) return reject(err);
      resolve(body);
    })
  })
}

async function episodeList(id, season = 1, page) {
  const result = await requestToPromise({
    url: `${API_URL}/series/${id}/episodes/query`,
    qs: { airedSeason: season.toString(), page: page }
  });
  const firstEpisode = result.data.reduce((acc, curr) => {
    // first aired should less than today's date
    // it should be valid date
    // return undefined if doesn't meet requirements

    if ( !acc.firstAired ) return curr;
    if ( moment(acc.firstAired).diff(moment()) < 0 ) return acc;

    return curr;
  }, { firstAired: '' });

  if ( !firstEpisode.firstAired ) return await episodeList(id, season - 1, page);
  const lastPage = result.links.last;
  return page === lastPage ?  result : await episodeList(id, season, lastPage);
}

async function newestSeason(id) {
  let seasonList = await requestToPromise({ url: `${API_URL}/series/${id}/episodes/summary` });
  return seasonList.data.airedSeasons.reduce((acc, curr) => {
    return acc > +curr ? acc : +curr;
  }, 0);
}

async function newestEpisode(id) {
  let season = await newestSeason(id);
  let epList = await episodeList(id, season);

  return epList.data.reduce((latest, next) => {
    // make sure episode has aired date.
    if (!latest.firstAired) return next;

    let latestDiff = moment().diff(latest.firstAired, 'days');
    let nextDiff = moment().diff(next.firstAired, 'days');

    // find latest episode
    if (nextDiff < latestDiff && nextDiff > 0) {
      return next;
    }

    // find next episode
    if (nextDiff <= 0) {
      if (!latest.nextEpisode) latest.nextEpisode = next;

      let nextEpDiff = moment().diff(latest.nextEpisode.firstAired, 'days');
      latest.nextEpisode = nextDiff > nextEpDiff ? next : latest.nextEpisode;
    }

    return latest;
  });
}

function search(keyword) {
  return requestToPromise({
    url: `${API_URL}/search/series`,
    qs: { name: keyword }
  });
}

function getDetail(id) {
  return requestToPromise({ url: `${API_URL}/series/${id}` });
}

export default { getToken, search, getDetail, newestEpisode };
