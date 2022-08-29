import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import User from '../database/models/user';

chai.use(chaiHttp);
const { expect } = chai;

describe('Users', () => {
  describe('Login', () => {
    // beforeEach(() => {
    //   sinon.stub(JwtService, "sign").returns(createUserResponseMock.token)
    //   // Caso o metodo sign não fosse estático
    //   // Sinon.stub(JwtService.prototype, "sign").returns(createUserResponseMock.token)
    //   sinon.stub(User, "create").resolves(userMock as User)
    //   sinon.stub(passwordService, "encryptPassword").returns("any-hash");
    // })

    // afterEach(() => {
    //   sinon.restore();
    // })

    it('should return status 201', async  () => {
      // const response = await chai.request(app)
      //   .post('/users')
      //   .send(createUserBodyMock)
      
      // expect(response.status).to.equal(201);
    })
  });
});


