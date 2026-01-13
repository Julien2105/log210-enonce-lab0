// Vous devez insérer les nouveaux tests ici
import { assert } from 'console';
import 'jest-extended';
/*
describe('redemarrerJeu.test.ts', () => {
  it("devrait implémenter test", async () => {
    throw new Error("Ce test n'a pas été défini")
  });
});*/

describe('GET /api/v1/jeu/redemarrerJeu', () => {

  beforeAll(async () => {
    // Précondition : des joueurs existent
    await request(app)
      .post('/api/v1/jeu/ajouterJoueur')
      .send({ nom: 'Alice' });

    await request(app)
      .post('/api/v1/jeu/ajouterJoueur')
      .send({ nom: 'Bob' });
  });

  it('devrait redémarrer le jeu avec succès', async () => {
    const response = await request(app)
      .get('/api/v1/jeu/redemarrerJeu');

    expect(response.status).toBe(200);
    expect(response.type).toMatch(/json/);
  });

  it('devrait supprimer tous les joueurs après le redémarrage', async () => {
    await request(app)
      .get('/api/v1/jeu/redemarrerJeu');

    const response = await request(app)
      .get('/api/v1/jeu/joueurs');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
  });

});