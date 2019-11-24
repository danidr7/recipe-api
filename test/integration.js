var chai = require('chai')
  , expect = chai.expect
  , chaiHttp = require('chai-http');
chai.use(chaiHttp);

var app = require('../app');

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