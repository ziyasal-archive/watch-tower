Watch-Tower
================================

> Coding4fun node.js application to monitor aws, heroku and trigger a simple REST-API call, send an email or perform similar notification actions

[![Build Status](https://travis-ci.org/ziyasal/watch-tower.svg)](https://travis-ci.org/ziyasal/watch-tower) [![Coverage Status](https://coveralls.io/repos/ziyasal/watch-tower/badge.svg?branch=master&service=github)](https://coveralls.io/github/ziyasal/watch-tower?branch=master)

Tested with node.js `v5.1.0 Stable`.
mocha `2.3.4`

## Usage

**Install Dependencies**

```sh
npm install
```

### Commands

**Start Sample App**
```sh
npm start
```

**Start Sample App and sample API using `pm2` Production process manager for Node.js**
```sh
npm run pm2-start
```

```sh
npm run pm2-start-api
```

**Test**
```sh
npm test
```

**Coverage**
```sh
npm run test-cov
```

**JSHint Lib**
```sh
npm run jshint-lib
```

**JSHint Tests**
```sh
npm run jshint-tests
```

###Build the Docker image and container

**Build**

Navigate to `/docker` path and run;

```sh
docker build -t  watch-tower-test/monitor .
```

**Run**

```sh
docker run -d -v $(pwd)/app:/app watch-tower-test/monitor
```

###Used 3.Party Testing Modules

[**mocha**](https://github.com/mochajs/mocha)  
`Simple, flexible, fun javascript test framework for node.js & the browser.`  
[**should**](https://github.com/shouldjs/should.js)  
`BDD style assertions for node.js.`  
[**sinon**](https://github.com/sinonjs/sinon)   
`Standalone test spies, stubs and mocks for JavaScript.`  
[**jshint**](https://github.com/jshint/jshint)  
`JSHint is a tool that helps to detect errors and potential problems in your JavaScript code.`  
[**istanbul**](https://github.com/gotwarlost/istanbul)  
`JS code coverage tool that computes statement, line, function and branch coverage with 
module loader hooks to transparently add coverage when running tests.`

[**proxyquire**](https://github.com/thlorenz/proxyquire)
 _**This package was used for just the system packages.**_  
`Proxies node.js require in order to allow overriding dependencies during testing.`
  
