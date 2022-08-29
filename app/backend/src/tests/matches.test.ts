import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import Matches from '../database/models/matches';
import { ICreateMatchResponse } from '../interfaces/IMatches';

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

  // describe('Create', () => {
  //   beforeEach(() => {
  //     sinon.stub(Matches, 'create').resolves(matchesMock as Matches);
  //   })

  //   afterEach(() => {
  //     sinon.restore();
  //   })

  //   it('should return status 201', async  () => {
  //     const response = await chai.request(app)
  //       .post('/matches')
  //       .send(matchCreateMock);
      
  //     expect(response.status).to.equal(201);
  //   })

  //   it('should return matches', async  () => {
  //     const response = await chai.request(app)
  //       .post('/matches')
  //       .send(matchCreateMock);
      
  //     expect(response.body).to.be.deep.equal(matchesMock as Matches);
  //   })
  // });
});
