const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../app');

it('should response 200 code', function(done) {
  chai.request(app)
      .get('/recipes/?i=chayote')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
});

it('should accept 3 parameters', function(done) {
  chai.request(app)
      .get('/recipes/?i=chayote,eggplant,carrot')
      .end(function(err, res) {
        expect(res).to.have.status(200);
        done();
      });
});

it('should return 400 when receive 0 parameters', function(done) {
  chai.request(app)
      .get('/recipes/')
      .end(function(err, res) {
        expect(res).to.have.status(400);
        done();
      });
});

it('should return 400 when receive more than 3 parameters', function(done) {
  chai.request(app)
      .get('/recipes/?i=chayote,eggplant,carrot,egg')
      .end(function(err, res) {
        expect(res).to.have.status(400);
        done();
      });
});

it('should return sorted keywords', function(done) {
  chai.request(app)
      .get('/recipes/?i=chayote,eggplant,carrot')
      .end(function(err, res) {
        expect(res.body.keywords[0]).to.equal('carrot');
        expect(res.body.keywords[1]).to.equal('chayote');
        expect(res.body.keywords[2]).to.equal('eggplant');
        done();
      });
});

it('should return recipes with a gif', function(done) {
  chai.request(app)
      .get('/recipes/?i=milk,banana')
      .end(function(err, res) {
  	res.body.recipes.forEach((item) => {
          expect(item).to.not.be.empty;
  	});
        done();
      });
});
