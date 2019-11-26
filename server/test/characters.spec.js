import nock from 'nock';

describe('TEST CHARACTERS ENDPOINT', () => {
it('should return a user', () => {
nock('https://swapi.co/api/')
  .get('/people')
  .reply(200, {
    "args": {},
    "headers": {
      "Accept":
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
      "Accept-Encoding": "gzip, deflate",
      "Accept-Language": "en-US,en;q=0.9",
      "Connection": "close",
      "Host": "httpbin.org",
      "Upgrade-Insecure-Requests": "1",
      "origin": "0.0.0.0",
      "url": "https://swapi.co/api/people"
    }
  })
})
});
