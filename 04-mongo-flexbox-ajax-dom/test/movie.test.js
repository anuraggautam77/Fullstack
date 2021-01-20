const request = require('supertest')
const app = require('../app');
const should = require('chai').should();
let token;

describe('Movie App', () => {
    before((done) => {
        loginUser().then((response) => {
            token = response.body.token;
            done();
        })
    })

    it('should get all movies', () => {
        return request(app)
            .get('/movie')
            .set('authorization', token)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((error, response) => {
                //console.log(JSON.parse(response.body))
                should.not.exist(error);
            })
    })

    it('Should create a movie', () => {
        request(app)
            .post('/movie')
            .set('authorization', token)
            .send({
                "title": "The Darkest Minds",
                "poster": "/94RaS52zmsqaiAe1TG20pdbJCZr.jpg",
                "voteCount": 528,
                "voteAverage": 6.8,
                "releaseDate": "2018-08-02",
                "overview": "After a disease kills 98% of America's children, the surviving 2% develop superpowers and are placed in internment camps. A 16-year-old girl escapes her camp and joins a group of other teens on the run from the government.",
            })
            .expect(201)

    })
})

function loginUser() {
    return request(app)
        .post('/users/login')
        .send({
            "email": "raghu@gmail.com",
            "password": "jkjkjsdkjk"
        })
}
