import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';
import User from '../mocks/user';

chai.use(chaiHttp);
const { user1, user2, user3, user4, user5, user6, user7, user8, user9, user10, user11 } = User;

describe('TEST USER SIGNUP ENDPOINT', () => {
  it('it should sign up a user with valid information', done => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user1)
      .end((error, response) => {
				expect(response).to.have.status(201);
				expect(response.body.status).to.be.a('string');
				expect(response.body.data).to.be.an('array');
				expect(response.body.data[0]).to.have.property('token').to.be.a('string');
				expect(response.body.data[0]).to.have.property('user').to.be.an('object');
				expect(response.body.data[0].user).to.have.property('email').to.be.a('string');
        done();
      });
  });

  it('it should return error if first name is not supplied', done => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user2)
      .end((error, response) => {
				expect(response).to.have.status(400);
        expect(response.body.status).to.be.a('string').and.to.be.equal('failure');
        expect(response.body.error.firstName[0]).to.be.a('string').and.to.be.equal('The firstName field is required.');
				done();
      });
  });

  it('it should return error if lastname is not supplied', done => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user3)
      .end((error, response) => {
				expect(response).to.have.status(400);
        expect(response.body.status).to.be.a('string').and.to.be.equal('failure');
        expect(response.body.error.lastName[0]).to.be.a('string').and.to.be.equal('The lastName field is required.');
				done();
      });
  });

  it('it should return error if email is not supplied', done => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user4)
      .end((error, response) => {
				expect(response).to.have.status(400);
        expect(response.body.status).to.be.a('string').and.to.be.equal('failure');
        expect(response.body.error.email[0]).to.be.a('string').and.to.be.equal('The email field is required.');
				done();
      });
  });

  it('it should return error if password is not supplied', done => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user5)
      .end((error, response) => {
				expect(response).to.have.status(400);
        expect(response.body.status).to.be.a('string').and.to.be.equal('failure');
        expect(response.body.error.password[0]).to.be.a('string').and.to.be.equal('The password field is required.');
				done();
      });
  });

  it('it should return error if length of first name is less than 3', done => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user6)
      .end((error, response) => {
				expect(response).to.have.status(400);
        expect(response.body.status).to.be.a('string').and.to.be.equal('failure');
        expect(response.body.error.firstName[0]).to.be.a('string').and.to.be.equal('The firstName format is invalid.');
				done();
      });
  });

  it('it should return error if length of last name is less than 3', done => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user7)
      .end((error, response) => {
				expect(response).to.have.status(400);
        expect(response.body.status).to.be.a('string').and.to.be.equal('failure');
        expect(response.body.error.lastName[0]).to.be.a('string').and.to.be.equal('The lastName format is invalid.');
				done();
      });
  });

  it('it should return error if length of password is less than 7', done => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user8)
      .end((error, response) => {
				expect(response).to.have.status(400);
        expect(response.body.status).to.be.a('string').and.to.be.equal('failure');
        expect(response.body.error.password[0]).to.be.a('string').and.to.be.equal('The password must be at least 7 characters.');
				done();
      });
  });

  it('it should return error if email is invalid', done => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user9)
      .end((error, response) => {
				expect(response).to.have.status(400);
        expect(response.body.status).to.be.a('string').and.to.be.equal('failure');
        expect(response.body.error.email[0]).to.be.a('string').and.to.be.equal('The email format is invalid.');
				done();
      });
  });

  it('it should return error if first name is not a string', done => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user10)
      .end((error, response) => {
				expect(response).to.have.status(400);
        expect(response.body.status).to.be.a('string').and.to.be.equal('failure');
        expect(response.body.error.firstName[0]).to.be.a('string').and.to.be.equal('The firstName format is invalid.');
				done();
      });
  });

  it('it should return error if last name is not a string', done => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(user11)
      .end((error, response) => {
				expect(response).to.have.status(400);
        expect(response.body.status).to.be.a('string').and.to.be.equal('failure');
        expect(response.body.error.lastName[0]).to.be.a('string').and.to.be.equal('The lastName format is invalid.');
				done();
      });
  });
});
