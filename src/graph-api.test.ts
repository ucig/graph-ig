import { InstagramGraphAPI } from './graph-api';
import { createApiClient } from './fetch-api';

jest.mock('./fetch-api', () => ({
  createApiClient: jest.fn().mockReturnValue({
    get: jest.fn().mockReturnValue({ json: jest.fn() }),
  }),
}));

describe('InstagramGraphAPI', () => {
  let instagramApi: InstagramGraphAPI;
  const config = {
    accessToken: 'test_access_token',
    baseUrl: 'https://graph.facebook.com/v16.0',
    debug: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    instagramApi = new InstagramGraphAPI(config);
  });

  describe('getPublishingLimit', () => {
    it('should correctly fetch publishing limit data', async () => {
      const mockResponse = { quota_usage: 5 };
      const userId = 12345;
      const since = Date.now();
      const fields = ['quota_usage'];

      (instagramApi as any).api.get.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await instagramApi['getPublishingLimit']({ // Assuming getPublishingLimit is a public method
        userId,
        since,
        fields,
      });

      expect(createApiClient).toHaveBeenCalledWith(config);
      expect(instagramApi['api'].get).toHaveBeenCalledWith(
        `${userId}/content_publishing_limit?fields=${fields.join(',')}&since=${since}`,
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getCommentById', () => {
    it('should correctly fetch comment data by ID', async () => {
      const mockCommentResponse = { id: '123', text: 'This is a comment' };
      const commentId = 123456789;
      const fields = ['id', 'text'];

      (instagramApi as any).api.get.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockCommentResponse),
      });

      const result = await instagramApi.getCommentById({ commentId, fields });

      expect(createApiClient).toHaveBeenCalledWith(config);
      expect(instagramApi['api'].get).toHaveBeenCalledWith(
        `${commentId}?fields=${fields.join(',')}`,
      );
      expect(result).toEqual(mockCommentResponse);
    });
  });
});