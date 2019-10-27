import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);

describe('TEST HOME PAGE ROUTE', () => {
  it('it should return Swapi homepage', done => {
    chai.request(app)
      .get('/')
      .end((error, response) => {
        expect(response.body.message).to.be.equal(
          'Hello Swapi, Welcome home!',
        );
        done();
      });
  });

  it('it should return error on hitting a wrong route', done => {
    chai.request(app)
      .get('/test')
      .end((error, response) => {
        expect(response.body.error).to.be.equal(
          'The route you are trying to access does not exist',
        );
        done();
      });
  });
});
