import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeUser from '../database/models/SequelizeUser';
import {
  adminUserMock, userIvalid, adminUserWithHashedPassword, emptyUserCredentials,
  INVALID_DATA, missingUserDataError
} from './mocks/users.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Users Test', () => {
  beforeEach(() => {
    sinon.restore(); // Limpa as configurações anteriores do Sinon
  });

  it('deve permitir o login com credenciais válidas', async function () {
    // Arrange
    sinon.stub(SequelizeUser, 'findOne').resolves(adminUserWithHashedPassword as SequelizeUser);
    // Act
    const response = await chai.request(app).post('/login').send(adminUserMock);
    // Assert
    expect(response).to.have.status(200);
    expect(response.body).to.have.key('token');
  });

  it('não deve permitir o login com e-mail incorreto', async function () {
    // Arrange
    sinon.stub(SequelizeUser, 'findOne').resolves(null);
    // Act
    const response = await chai.request(app).post('/login').send(userIvalid);
    // Assert
    expect(response).to.have.status(401);
    expect(response.body.message).to.equal(INVALID_DATA.data.message);
  });

  it('deve lançar erro se os dados de login estiverem vazios', async function () {
    // Act
    const response = await chai.request(app).post('/login').send(emptyUserCredentials);
    // Assert
    expect(response).to.have.status(400);
    expect(response.body.message).to.equal(missingUserDataError.data.message);
  });

  it('deve retornar o papel (role) do usuário após um login bem-sucedido', async function () {
    // Arrange
    sinon.stub(SequelizeUser, 'findOne').resolves(adminUserWithHashedPassword as SequelizeUser);
    // Act
    const response = await chai.request(app).get('/login/role').set('Authorization', `Bearer ${adminUserMock.token}`);
    // Assert
    expect(response).to.have.status(200);
    expect(response.body).to.have.key('role');
  });

  it('deve retornar erro ao tentar acessar dados de usuário sem fornecer token', async function () {
    // Act
    const response = await chai.request(app).get('/login/role');
    // Assert
    expect(response).to.have.status(401);
    expect(response.body).not.to.have.key('role');
  });

  it('deve retornar erro ao tentar acessar dados de usuário com token mal formatado', async function () {
    // Act
    const response = await chai.request(app).get('/login/role').set('Authorization', 'Bearer ');
    // Assert
    expect(response).to.have.status(401);
    expect(response.body.message).to.be.eq('Token must be a valid token');
  });
});