const isProd = () => process.env.NODE_ENV === 'production';

export default {
  API_SERVER: isProd()
    ? 'https://smoothiz-api-server.herokuapp.com'
    : 'http://localhost:3000',
  CLIENT_SERVER: isProd()
    ? 'https://smoothiz.herokuapp.com'
    : 'http://localhost:8080',
  AWS_BUCKET: isProd()
    ? 'https://smoothiz.s3.amazonaws.com'
    : 'https://smoothiz.s3.amazonaws.com/dev',
};
