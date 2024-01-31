import { InstagramGraphAPI } from './graph-api';

describe('InstagramGraphAPI', () => {
  it('should create an instance with valid parameters', () => {
    const api = new InstagramGraphAPI({ accessToken: 'testToken' });
    expect(api).toBeInstanceOf(InstagramGraphAPI);
  });
});
