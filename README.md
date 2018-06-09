# Smoothiz server

## Configuration

## Development / Production URL
Define your development client/server, production client/server URL and your AWS S3 URL in `/config/globals.js`
```
API_SERVER: isProd()
    ? 'https://smoothiz-api-server.herokuapp.com'
    : 'http://localhost:3000',
CLIENT_SERVER: isProd()
    ? 'https://smoothiz.herokuapp.com'
    : 'http://localhost:8080',
AWS_BUCKET: isProd()
    ? 'https://smoothiz.s3.amazonaws.com'
    : 'https://smoothiz.s3.amazonaws.com/dev',
```

## Launch the server

**Development**
`npm run dev`

**Production**
`npm start`

# TODO
* Create selectors
* Normalize states
* Optimize states tree
* Search feature
* Filter feature
* Check for valid token after hash (social sign in)
* Edit user profile
* Save profile picture from social sign in