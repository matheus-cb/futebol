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
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Verifica se foi encontrado todos os times', async function () {
    // Arrange
    sinon
      .stub(SequelizeTeam, "findAll")
      .resolves(teams as any);
    // Act
    const chaiHttpResponse = await chai
      .request(app)
      .get('/teams');
    // Assert
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body).to.deep.equal(teams);
  });
});
