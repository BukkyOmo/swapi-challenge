import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import Comment from '../mocks/comment';
import { getAmovieMock } from '../mocks/movies'

chai.use(chaiHttp);
const { comment1, comment2, comment4 } = Comment;

describe('TEST COMMENT ENDPOINT', () => {
  it('it should create a valid comment', done => {
        getAmovieMock()
        chai.request(app)
        .post('/movies/5/comments')
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
        .post('/movies/4/comments')
        .send(comment2)
        .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.status).to.be.a('string');
        expect(response.body.status).to.be.equal('failure');
        expect(response.body.error.comment[0]).to.be.equal('The comment field is required.');
        done();
      });
  })

it('it should throw error if movie with given episode_id does not exist', done => {
        getAmovieMock()
        chai.request(app)
        .post('/movies/15/comments')
        .send(comment4)
        .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.status).to.be.a('string');
        expect(response.body.status).to.be.equal('Failure');
        expect(response.body.error).to.be.equal('Movie does not exist');
        done();
      });
  })
it('it should get comments under a movie successfully', done => {
        getAmovieMock()
        chai.request(app)
        .get('/movies/5/comments')
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
        .get('/movies/10/comments')
        .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.status).to.be.a('string');
        expect(response.body.status).to.be.equal('Failure');
        expect(response.body.error).to.be.equal('Movie does not exist');
        done();
      });
  })
it('it should throw an error if episode id is not an integer', done => {
        getAmovieMock()
        chai.request(app)
        .get('/movies/h/comments')
        .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.status).to.be.a('string');
        expect(response.body.status).to.be.equal('failure');
        expect(response.body.error.id[0]).to.be.equal('The id must be an integer.');
        done();
      });
  })
});
