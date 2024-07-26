import { registerUserService } from '../data/services/auth-service';

describe('registerUserService', () => {
  it('should register a user', () => {
    const registeredData = {
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
        json: () => Promise.resolve(registeredData),
      })
    );
    return registerUserService({
      username: 'test4',
      password: 'secretword',
      email: 'test4@test.com',
    }).then((response) => expect(response).toBe(registeredData));
  });
  it('should not register a user', () => {
    global.fetch = jest.fn(() =>
      Promise.reject({
        json: () => Promise.resolve({ error: 'error' }),
      })
    );
    return registerUserService({
      username: 'test4',
      password: 'secretword',
      email: 'test4@test.com',
    }).then((response) => expect(response).not.toBeNull());
  });
});
