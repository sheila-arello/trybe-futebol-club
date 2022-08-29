import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

import Teams from '../database/models/teams';

chai.use(chaiHttp);
const { expect } = chai;

const teamsMock = {
  id: 1,
  teamName: 'Palmeiras'
};

describe('Teams', () => {
  describe('List', () => {
    beforeEach(() => {
      sinon.stub(Teams, 'findAll').resolves([teamsMock as Teams]);
    })

    afterEach(() => {
      sinon.restore();
    })

    it('should return status 200', async  () => {
      const response = await chai.request(app)
        .get('/teams');
      
      expect(response.status).to.equal(200);
    })

    it('should return matches', async  () => {
      const response = await chai.request(app)
        .get('/teams');
      
      expect(response.body).to.be.deep.equal([teamsMock as Teams]);
    })
  });

  describe('GetById', () => {
    beforeEach(() => {
      sinon.stub(Teams, 'findByPk').resolves(teamsMock as Teams);
    })

    afterEach(() => {
      sinon.restore();
    })

    it('should return status 200', async  () => {
      const response = await chai.request(app)
        .get('/teams/1');
      
      expect(response.status).to.equal(200);
    })

    it('should return matches', async  () => {
      const response = await chai.request(app)
        .get('/teams/1');
      
      expect(response.body).to.be.deep.equal(teamsMock as Teams);
    })
  });
});
