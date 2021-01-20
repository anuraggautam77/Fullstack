const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

const { expect } = chai;

chai.use(chaiHttp);
let authtoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NDM1NzE5NzEsImF1ZCI6ImthbmJhbmFwaS5oZXJva3VhcHAuY29tIiwiaXNzIjoia2FuYmFuYXBpLmhlcm9rdWFwcC5jb20iLCJzdWIiOiJhZG1pbjEyMSJ9.vU-idgpvhbb9FgE8S3WqBDqKcq_tlfQ3xV8vfZQZv4o';

describe('API List and card  route', () => {
  beforeEach(async () => {
    const bodyData = {
      username: 'admin121',
      password: 'admin121',
    };
    chai
      .request(app)
      .post('/user/login')
      .send(bodyData)
      .end((err, res) => {
        authtoken = res.body.token;
      });
  });


  it('Add A List (should be return a 201 response)', async () => {
    const payload = {
      bid: 'asdsadsa',
      Title: 'tidle',
    };

    chai
      .request(app)
      .post('/api/boardlist/newlist')
      .set('Authorization', `Bearer ${authtoken}`)
      .send(payload)
      .end((err, response) => {
        response.should.have.status(201);
        done();
      });
  });


  it('Add A Card (should be return a 201 response)', async () => {
    const payload = {
      Listid: 'index',
      Title: 'title',
      Description: 'desc',
      Boardid: 'this.BoardId',
    };

    chai
      .request(app)
      .post('/api/boardlist/newcard')
      .set('Authorization', `Bearer ${authtoken}`)
      .send(payload)
      .end((err, response) => {
        response.should.have.status(201);
        done();
      });
  });


  it('UPDATE A Card (should be return a 200 response)', async () => {
    const param = { Title: 'data.Title', Description: 'data.Description' };
    chai
      .request(app)
      .put('/api/boardlist/2321342342')
      .set('Authorization', `Bearer ${authtoken}`)
      .send(param)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });


  it('Delete A Card (should be return a 200 response)', async () => {
    chai
      .request(app)
      .delete('/api/boardlist/2321342342/86862323')
      .set('Authorization', `Bearer ${authtoken}`)
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });
});
