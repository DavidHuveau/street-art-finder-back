const opencage = require('opencage-api-client');

const convertAdressToGpsCoordonates = (languageCode, queryString) => {
  return new Promise((resolve, reject) => {
    opencage
    .geocode({ q: queryString, language: languageCode })
    .then(data => {
      if (data.status.code == 200) {
        if (data.results.length > 0) {
          const place = data.results[0];
          resolve(place.geometry);
        }
        else {
          reject(new Error(`no result with q: ${queryString}, language: ${languageCode}`));
        }
      } else if (data.status.code == 402) {
        reject(new Error('hit free-trial daily limit'));
      } else {
        reject(new Error('error' + data.status.message));
      }
    })
    .catch(error => {
      reject(new Error('error' + error.message));
    });
  });
}

module.exports = convertAdressToGpsCoordonates;
