import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import nock from 'nock';
import Comment from '../mocks/comment';
import getAmovieMock from '../mocks/movies'

chai.use(chaiHttp);
const { comment1, comment2, comment3, comment4 } = Comment;

describe('TEST COMMENT ENDPOINT', () => {
  it('it should create a valid comment', done => {
        getAmovieMock()
            chai.request(app)
              .post('/api/v1/comments')
              .send(comment1)
         .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.status).to.be.a('string');
        expect(response.body.data).to.be.an('object');
        done();
      });
  })
 it('it should throw error if comment is not provided', done => {
    getAmovieMock()
        chai.request(app)
          .post('/api/v1/comments')
          .send(comment2)
        .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.status).to.be.a('string');
        expect(response.body.status).to.be.equal('failure');
        expect(response.body.error.comment[0]).to.be.equal('The comment field is required.');
        done();
      });
  })
it('it should throw error if episode_id is not provided', done => {
    getAmovieMock()
        chai.request(app)
          .post('/api/v1/comments')
          .send(comment3)
     .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.status).to.be.a('string');
        expect(response.body.status).to.be.equal('failure');
        expect(response.body.error.episode_id[0]).to.be.equal('The episode id field is required.');
        done();
      });
  })
it('it should throw error if movie with given episode_id does not exist', done => {
    getAmovieMock()
        chai.request(app)
          .post('/api/v1/comments')
          .send(comment4)
     .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.status).to.be.a('string');
        expect(response.body.status).to.be.equal('Failure');
        expect(response.body.error).to.be.equal('The movie you try to comment on does not exist');
        done();
      });
  })
it('it should get comments under a movie successfully', done => {
    getAmovieMock()
        chai.request(app)
          .get('/api/v1/comments/1')
        .end((error, response) => {
        expect(response).to.have.status(200);
        expect(response.body.status).to.be.a('string');
        expect(response.body.status).to.be.equal('Success');
        expect(response.body.message).to.be.equal('Comment retrieved succcessfully');
        done();
      });
  })
it('it should throw an error if episode id does not exist in database', done => {
    getAmovieMock()
        chai.request(app)
          .get('/api/v1/comments/10')
        .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.status).to.be.a('string');
        expect(response.body.status).to.be.equal('Failure');
        expect(response.body.error).to.be.equal('There are no comments for this movie yet');
        done();
      });
  })
it('it should throw an error if episode id is not an integer', done => {
    getAmovieMock()
        chai.request(app)
          .get('/api/v1/comments/h')
        .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.status).to.be.a('string');
        expect(response.body.status).to.be.equal('failure');
        expect(response.body.error.id[0]).to.be.equal('The id must be an integer.');
        done();
      });
  })
});

