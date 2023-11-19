import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import SequelizeMatch from '../database/models/SequelizeMatch';
import { adminUserMock } from './mocks/users.mock';
import { allMatches, matchesInProgress, newMatch } from './mocks/matches.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Matches Test', () => {
  beforeEach(() => {
    sinon.restore();
  });

  it('deve retornar todos os jogos', async function () {
    // Arrange
    sinon.stub(SequelizeMatch, 'findAll').resolves(allMatches as unknown as SequelizeMatch[]);
    // Act
    const response = await chai.request(app).get('/matches');
    // Assert
    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal(allMatches);
  });

  it('deve retornar todos os jogos em andamento', async function () {
    // Arrange
    sinon.stub(SequelizeMatch, 'findAll').resolves(matchesInProgress as unknown as SequelizeMatch[]);
    // Act
    const response = await chai.request(app).get('/matches?inProgress=true');
    // Assert
    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal(matchesInProgress);
  });

  it('deve permitir finalizar um jogo pelo ID', async function () {
    sinon.stub(SequelizeMatch, 'update').returns;
    // Act
    const response = await chai.request(app).patch('/matches/41/finish').set('Authorization', `Bearer ${adminUserMock.token}`);
    // Assert
    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal({ message: "Finished" });
  });

  it('deve permitir modificar o placar da partida', async function () {
    // Arrange
    sinon.stub(SequelizeMatch, 'update').returns;
    // Act
    const response = await chai.request(app).patch('/matches/41').set('Authorization', `Bearer ${adminUserMock.token}`).send({ homeTeamGoals: 2, awayTeamGoals: 0 });
    // Assert
    expect(response).to.have.status(200);
    expect(response.body).to.deep.equal({ message: "Goooooool" });
  });

  it('deve permitir criar um novo jogo', async function () {
    // Arrange
    sinon.stub(SequelizeMatch, 'create').resolves({
      "id": 49,
      "homeTeamId": 16,
      "awayTeamId": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
      "inProgress": true
    } as unknown as SequelizeMatch);
    // Act
    const response = await chai.request(app).post('/matches').set('Authorization', `Bearer ${adminUserMock.token}`).send(newMatch);
    // Assert
    expect(response).to.have.status(201);
    expect(response.body).to.deep.equal({
      "id": 49,
      "homeTeamId": 16,
      "awayTeamId": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2,
      "inProgress": true
    });
  });
});
