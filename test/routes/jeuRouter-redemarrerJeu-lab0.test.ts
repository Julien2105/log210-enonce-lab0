// Vous devez insérer les nouveaux tests ici
import supertest from 'supertest';
import 'jest-extended';
import app from '../../src/app';

const request = supertest(app);

describe('GET /api/v1/jeu/redemarrerJeu', () => {

  beforeAll(async () => {
    // Précondition : des joueurs existent
    await request.post('/api/v1/jeu/demarrerJeu').send({ nom: 'Alice' });
    await request.post('/api/v1/jeu/demarrerJeu').send({ nom: 'Bob' });
  });

  it('devrait redémarrer le jeu avec succès', async () => {
    const response = await request.get('/api/v1/jeu/redemarrerJeu');

    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
    expect(response.body.message).toBe('Success');
  });

  it('devrait supprimer tous les joueurs après le redémarrage', async () => {
    // Redémarrer le jeu
    await request.get('/api/v1/jeu/redemarrerJeu');

    // Vérifier que les joueurs ont été supprimés
    // On peut le faire en essayant de jouer avec un joueur qui devrait ne plus exister
    const response = await request.get('/api/v1/jeu/jouer/Alice');

    // Le joueur n'existe plus, donc on devrait avoir une erreur
    expect(response.status).toBe(404);
    expect(response.type).toBe("application/json");
  });

});