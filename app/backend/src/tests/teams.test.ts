import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import teams from './mocks/teams.mock';

// import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa rota /teams', function () {
  afterEach(sinon.restore);

  it('Verifica se foi encontrado todos os times', async function () {
    // Arrange
    sinon.stub(SequelizeTeam, 'findAll').resolves(teams as any);
    // Act
    const chaiHttpResponse = await chai
      .request(app)
      .get('/teams');
    console.log(chaiHttpResponse);
    // Assert
    expect(chaiHttpResponse.status).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body).to.deep.equal(teams);
  });

  it ('Verifica se foi encontrado o time com id 1', async function () {
    // Arrange
    const team = teams[0];
    sinon
      .stub(SequelizeTeam, "findByPk")
      .resolves(team as any);
    // Act
    const chaiHttpResponse = await chai
      .request(app)
      .get('/teams/1');
    // Assert
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.deep.equal(team);
  });
});
