jest.mock('../data/services/get-token');
import { getAuthToken } from '../data/services/get-token';
import { getUserMeLoader } from '../data/services/get-user-me-loader';

describe('getUserMeLoader', () => {
  let userInfo;
  beforeEach(() => {});
  it('should return a user', () => {
    getAuthToken.mockResolvedValue('xyz');
    userInfo = {
      id: 1,
      username: 'test1',
      email: 'test1@test.com',
      provider: 'local',
      confirmed: true,
      blocked: false,
    };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve(userInfo),
      })
    );
    return getUserMeLoader().then((response) =>
      expect(response.data).toBe(userInfo)
    );
  });
  it('should not return a user', () => {
    getAuthToken.mockResolvedValue('null');
    global.fetch = jest.fn(() =>
      Promise.reject({
        json: () => Promise.resolve({ error: 'error' }),
      })
    );
    return getUserMeLoader().then((response) =>
      expect(response.data).toBeNull()
    );
  });
  it('should not throw error while fetching user', () => {
    getAuthToken.mockResolvedValue('xyz');
    global.fetch = jest.fn(() =>
      Promise.reject({
        json: () => Promise.resolve({ error: 'error' }),
      })
    );
    return getUserMeLoader().then((response) => {
      expect(response.error).not.toBeNull();
    });
  });
});
