'use strict'

process.env.MONGO_URI = 'mongodb://localhost/task_test';
require('../../server.js');
var mongoose = require('mongoose');
var chai = require('chai');
var chaihttp = require('chai-http');
chai.use(chaihttp);

var expect = chai.expect

describe('task api end points', function() {
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
    done();
    });
  });

  it('should respond to a post request', function(done) {
    chai.request('localhost:3000/api/v1')
      .post('/tasks')
      .send({taskBody: 'do your homework'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res.body).to.have.property('_id');
        expect(res.body.taskBody).to.eql('do your homework');
        done();
      });
  });

  describe('already has data in database', function() {
    var id;
    beforeEach(function(done) {
      chai.request('localhost:3000/api/v1')
        .post('/tasks')
        .send({taskBody: 'test task'})
        .end(function(err, res) {
          id = res.body._id;
          done();
        });
    });

    it('should have an index', function(done) {
      chai.request('localhost:3000/api/v1')
        .get('/tasks')
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(Array.isArray(res.body)).to.be.true;
          expect(res.body[0]).to.have.property('taskBody');
          done();
        });
    });

    it('should be able to update a task', function(done) {
      chai.request('localhost:3000/api/v1')
        .put('/tasks/' + id)
        .send({taskBody: 'new task'})
        .end(function(err, res) {
          console.log(id);
          expect(err).to.eql(null);
          expect(res.body.taskBody).to.eql('new task');
          done();
        });
    });

    it('should be able to delete a task', function(done) {
      chai.request('localhost:3000/api/v1')
        .delete('/tasks/' + id)
        .end(function(err, res) {
          expect(err).to.eql(null);
          expect(res.body._id).to.not.exist;
          done();
        });
    });
  });
});