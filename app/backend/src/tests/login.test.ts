import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import User from '../database/models/user';
import Jwt from '../utils/Jwt';
import { CreateUserResponse, IUser } from '../interfaces/IUser';
import encryptedPassword from '../utils/encrypt';

chai.use(chaiHttp);
const { expect } = chai;
const createUserResponseMock: CreateUserResponse = {
  id: 1,
  email: 'user@user.com',
  role: 'user',
  token: 'any-token'
}

const createUserBodyMock  = {
  email: 'user@user.com',
  password: 'any-hash',
}

const userMock: IUser = {
  id: 1,
  username: 'any-name',
  email: 'user@user.com',
  password: 'any-hash',
  role: 'user',
}

describe('Users', () => {
  describe('Login', () => {
    beforeEach(() => {
      sinon.stub(Jwt, "generateToken").returns(createUserResponseMock.token);
      // Caso o metodo sign não fosse estático
      // Sinon.stub(JwtService.prototype, "sign").returns(createUserResponseMock.token)
      sinon.stub(User, "findOne").resolves(userMock as User);
      sinon.stub(encryptedPassword, "compare").returns(true);
    })

    afterEach(() => {
      sinon.restore();
    })

    it('should return status 200', async  () => {
      const response = await chai.request(app)
        .post('/login')
        .send(createUserBodyMock)
      
      expect(response.status).to.equal(200);
    })

    it('should return token', async  () => {
      const response = await chai.request(app)
        .post('/login')
        .send(createUserBodyMock)
      
        expect(response.body).to.be.deep.equal({ token: createUserResponseMock.token });
    })
  });
});


