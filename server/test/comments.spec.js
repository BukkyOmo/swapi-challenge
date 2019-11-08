import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import Comment from '../mocks/comment';

chai.use(chaiHttp);
const { comment1, comment2, comment3, comment4 } = Comment;

describe('TEST COMMENT ENDPOINT', () => {
  it('it should create a valid comment', done => {
    chai.request(app)
      .post('/api/v1/comments')
      .send(comment1)
      .end((error, response) => {
        expect(response).to.have.status(201);
        expect(response.body.status).to.be.a('string');
        expect(response.body.data).to.be.an('array');
        done();
      });
  })
  it('it should throw error if comment is not provided', done => {
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
  it('it should throw error if comment is not provided', done => {
        chai.request(app)
          .post('/api/v1/comments')
          .send(comment3)
          .end((error, response) => {
            expect(response).to.have.status(500);
            expect(response.body.status).to.be.a('string');
            expect(response.body.status).to.be.equal('failure');
            expect(response.body.error).to.be.equal('Unable to save comment in database, please try again');
            done();
          });
      })
  it('it should get a comment saved in db', done => {
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
  it('it should get a comment saved in db', done => {
    chai.request(app)
      .get('/api/v1/comments/4')
      .end((error, response) => {
        expect(response).to.have.status(404);
        expect(response.body.status).to.be.a('string');
        expect(response.body.status).to.be.equal('Failure');
        expect(response.body.error).to.be.equal('There are no comments for this movie yet');
        done();
      });
  })
  it('it should get a comment saved in db', done => {
    chai.request(app)
      .get('/api/v1/comments/g')
      .end((error, response) => {
        expect(response).to.have.status(400);
        expect(response.body.status).to.be.a('string');
        expect(response.body.status).to.be.equal('failure');
        expect(response.body.error.id[0]).to.be.equal('The id must be an integer.');
        done();
      });
  })
});