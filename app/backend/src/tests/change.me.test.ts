import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/user'; 

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Create', () => { 
  beforeEach(() => {
    sinon.stub(JwtService, "sign").returns(createUserResponseMock.token)
    // Caso o metodo sign não fosse estático
    // Sinon.stub(JwtService.prototype, "sign").returns(createUserResponseMock.token)
    sinon.stub(User, "create").resolves(userMock as User)
    sinon.stub(passwordService, "encryptPassword").returns("any-hash");
  })

  afterEach(() => {
    sinon.restore();
  })

  it('should return status 201', async  () => {
    const response = await chai.request(app)
      .post('/users')
      .send(createUserBodyMock)
    
    expect(response.status).to.equal(201);
  })


// describe('Testa rota de login', () => {
//   /**
//    * Exemplo do uso de stubs com tipos
//    */

//   let chaiHttpResponse: Response;

//   before(async () => {
//     sinon
//       .stub(User, 'findAll')
//       .resolves({
//         ...<Seu mock>
//       } as IUser);
//   });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });
});
