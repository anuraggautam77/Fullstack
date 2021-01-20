const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const { expect } = chai;

chai.use(chaiHttp);
const authtoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDM1NzE5NzEsImF1ZCI6ImthbmJhbmFwaS5oZXJva3VhcHAuY29tIiwiaXNzIjoia2FuYmFuYXBpLmhlcm9rdWFwcC5jb20iLCJzdWIiOiJhZG1pbjEyMSJ9.vU-idgpvhbb9FgE8S3WqBDqKcq_tlfQ3xV8vfZQZv4o';

describe('API for Regsiter user , Create , Update,Delete board route', () => {
  beforeEach(async () => {
    const bodyData = {
      username: 'admin',
      password: 'admin',
    };
    chai
      .request(app)
      .post('/user/login')
      .send(bodyData)
      .end((err, res) => {
        authtoken = res.body.token;
      });
  });

  it('New User Regitered (should be return a 404 response)', async () => {
    const bodyData = {
      username: 'anuragg111',
      password: 'gautamm111',
      name: 'abc111',
    };
    chai
      .request(app)
      .post('/user/register')
      .send(bodyData)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.should.have.property('message');
        done();
      });
  });


  it('Add A Board (should be return a 201 response)', async () => {
    const boardData = {
      Title: 'testTitle', Description: 'testDecsriptopn',
    };

    chai
      .request(app)
      .post('/api/board')
      .set('Authorization', `Bearer ${authtoken}`)
      .send(boardData)
      .end((err, response) => {
        response.should.have.status(201);
        done();
      });
  });


  it('Edit  A Board (should be return a 200 response)', async () => {
    const boardData = {
      Title: 'testTitle', Description: 'testDecsriptopn',
    };

    chai
      .request(app)
      .put('/api/board/12121212121')
      .set('Authorization', `Bearer ${authtoken}`)
      .send(boardData)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });


  it('Delete A Board (should be return a 200 response)', async () => {
    chai
      .request(app)
      .delete('/api/board/12121212121')
      .set('Authorization', `Bearer ${authtoken}`)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });


  it(' Get all board (should be return a 200 response)', async () => {
    chai
      .request(app)
      .get('/api/board')
      .set('Authorization', `Bearer ${authtoken}`)
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a('object');
        response.body.should.have.property('list');
        response.body.should.have.property('success');
        response.body.list.to.be.a('array');
        done();
      });
  });
});
