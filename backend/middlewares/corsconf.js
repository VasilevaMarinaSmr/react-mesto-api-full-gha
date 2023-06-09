const allowedCors = [
  'http://miimesto.nomoredomains.rocks',
  'https://miimesto.nomoredomains.rocks',
  'http://api.miimesto.nomoredomains.rocks',
  'https://api.miimesto.nomoredomains.rocks',
  'http://localhost:3000',
];

const corsConfig = (req, res, next) => {
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  const { origin } = req.headers;
  const { method } = req;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);

    return res.end();
  }

  return next();
};

module.exports = corsConfig;
