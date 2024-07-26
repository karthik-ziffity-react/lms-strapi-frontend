import { loginUserService } from '../data/services/auth-service';

describe('loginUserService', () => {
  it('should signin a user', () => {
    const loggedInData = {
      jwt: 'xyz',
      user: {
        id: 2,
        username: 'test4',
        email: 'test4@test.com',
        provider: 'local',
        confirmed: true,
        blocked: false,
      },
    };
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(loggedInData),
      })
    );
    return loginUserService({
      password: 'secretword',
      identifier: 'test4@test.com',
    }).then((response) => expect(response).toBe(loggedInData));
  });
  it('should not signin a user', () => {
    global.fetch = jest.fn(() =>
      Promise.reject({
        json: () => Promise.resolve({ error: 'error' }),
      })
    );
    return loginUserService({
      password: 'secretword',
      identifier: 'test4@test.com',
    }).catch(async (error) => {
      expect(await error.json()).toEqual({ error: 'error' });
    });
  });
});
