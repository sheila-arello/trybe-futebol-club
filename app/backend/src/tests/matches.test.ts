import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import Matches from '../database/models/matches';
import { ICreateMatchResponse } from '../interfaces/IMatches';
import verifyToken from '../middlewares/verifyToken';

chai.use(chaiHttp);
const { expect } = chai;

const matchesMock: ICreateMatchResponse = {
  id: 1,
  homeTeam: 1,
  homeTeamGoals: 3,
  awayTeam: 2,
  awayTeamGoals: 0,
  inProgress: false
};

const matchCreateMock = {
  homeTeam: 1,
  homeTeamGoals: 3,
  awayTeam: 2,
  awayTeamGoals: 0,
  inProgress: false
};


describe('Matches', () => {
  describe('List', () => {
    beforeEach(() => {
      sinon.stub(Matches, 'findAll').resolves([matchesMock as Matches]);
    })

    afterEach(() => {
      sinon.restore();
    })

    it('should return status 200', async  () => {
      const response = await chai.request(app)
        .get('/matches');
      
      expect(response.status).to.equal(200);
    })

    it('should return matches', async  () => {
      const response = await chai.request(app)
        .get('/matches');
      
      expect(response.body).to.be.deep.equal([matchesMock as Matches]);
    })
  });

  describe('Create', () => {
    beforeEach(() => {
      // sinon.stub(verifyToken).returns();
      sinon.stub(Matches, 'create').resolves(matchesMock as Matches);
    })

    afterEach(() => {
      sinon.restore();
    })

    it('should return status 201', async  () => {
      const response = await chai.request(app)
        .post('/matches')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE2NjEyNzkyNDZ9.9Z-xq0Ac--n5AmwmLm1uX55e36Mu_jgiMkm5KTXYGy4') // pegar o token valido
        .send(matchCreateMock);
      
      expect(response.status).to.equal(201);
    })

    it('should return matches', async  () => {
      const response = await chai.request(app)
        .post('/matches')
        .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE2NjEyNzkyNDZ9.9Z-xq0Ac--n5AmwmLm1uX55e36Mu_jgiMkm5KTXYGy4') // pegar o token valido
        .send(matchCreateMock);
      
      expect(response.body).to.be.deep.equal(matchesMock);
    })
  });

  // describe('Edit', () => {
  //   beforeEach(() => {
  //     // sinon.stub(verifyToken).returns();
  //     sinon.stub(Matches, 'update').resolves(matchesMock as Matches);
  //   })

  //   afterEach(() => {
  //     sinon.restore();
  //   })

  //   it('should return status 201', async  () => {
  //     const response = await chai.request(app)
  //       .patch('/matches/finish')
  //       .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE2NjEyNzkyNDZ9.9Z-xq0Ac--n5AmwmLm1uX55e36Mu_jgiMkm5KTXYGy4') // pegar o token valido
  //       .send(matchCreateMock);
      
  //     expect(response.status).to.equal(201);
  //   })

  //   it('should return matches', async  () => {
  //     const response = await chai.request(app)
  //       .post('/matches')
  //       .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJAdXNlci5jb20iLCJpZCI6Miwicm9sZSI6InVzZXIiLCJpYXQiOjE2NjEyNzkyNDZ9.9Z-xq0Ac--n5AmwmLm1uX55e36Mu_jgiMkm5KTXYGy4') // pegar o token valido
  //       .send(matchCreateMock);
      
  //     expect(response.body).to.be.deep.equal(matchesMock);
  //   })
  // });

});

