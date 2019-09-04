const get = (url) => {
  return fetch(url)
    .then(response => response.json());
}

const post = (url, params) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }).then(response => response.json());
}

convertToRubySyntax = ( object ) => {
  const rubyObject = {};
  Object.keys(object).forEach(key => {
    const rubyKey = key.replace(/([A-Z]|(\d+))/g, "_$1").toLowerCase();
    rubyObject[rubyKey] = object[key];
  });

  return rubyObject;
}

module.exports = {
  get,
  post,
  convertToRubySyntax
}
