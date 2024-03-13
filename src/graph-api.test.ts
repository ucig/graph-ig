import { createApiClient } from './fetch-api'
import { InstagramGraphAPI } from './graph-api'

jest.mock('./fetch-api', () => ({
  createApiClient: jest.fn().mockReturnValue({
    get: jest.fn().mockReturnValue({ json: jest.fn() }),
    post: jest.fn().mockReturnValue({ json: jest.fn() }),
    delete: jest.fn().mockReturnValue({ json: jest.fn() })
  })
}))

describe('InstagramGraphAPI', () => {
  let instagramApi: InstagramGraphAPI
  const config = {
    accessToken: 'test_access_token',
    baseUrl: 'https://graph.facebook.com/v16.0',
    debug: false
  }

  beforeEach(() => {
    jest.clearAllMocks()
    instagramApi = new InstagramGraphAPI(config)
  })

  describe('getCommentById', () => {
    it('should correctly fetch comment data by ID', async () => {
      const mockCommentResponse = { id: '123', text: 'This is a comment' }
      const commentId = 123456789
      const fields = ['id', 'text']

      ;(instagramApi as any).api.get.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockCommentResponse)
      })

      const result = await instagramApi.getCommentById({ commentId, fields })

      expect(createApiClient).toHaveBeenCalledWith(config)
      expect(instagramApi['api'].get).toHaveBeenCalledWith(
        `${commentId}?fields=${fields.join(',')}`
      )
      expect(result).toEqual(mockCommentResponse)
    })
  })

  describe('updateCommentVisibility', () => {
    it('should correctly update comment visibility', async () => {
      const mockResponse = { success: true }
      const commentId = 123456789
      const hide = true

      ;(instagramApi as any).api.post.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })

      const result = await instagramApi.updateCommentVisibility({
        commentId,
        hide
      })

      expect(instagramApi['api'].post).toHaveBeenCalledWith(
        `${commentId}?hide=${hide}`
      )
      expect(result).toEqual(true)
    })
  })

  describe('deleteComment', () => {
    it('should correctly delete a comment', async () => {
      const mockResponse = { success: true }
      const commentId = 123456789

      ;(instagramApi as any).api.delete.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })

      const result = await instagramApi.deleteComment({ commentId })

      expect(instagramApi['api'].delete).toHaveBeenCalledWith(`${commentId}`)
      expect(result).toEqual(true)
    })
  })

  describe('replyToComment', () => {
    it('should correctly reply to a comment', async () => {
      const mockResponse = { id: '987654321' }
      const commentId = 123456789
      const message = 'This is a reply'

      ;(instagramApi as any).api.post.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })

      const result = await instagramApi.replyToComment({ commentId, message })

      expect(instagramApi['api'].post).toHaveBeenCalledWith(
        `${commentId}/replies?message=${message}`
      )
      expect(result).toEqual('987654321')
    })
  })
  describe('getCommentReplies', () => {
    it('should correctly fetch replies to a comment', async () => {
      const mockResponse = {
        data: [{ id: 'reply_id', text: 'This is a reply' }]
      }
      const commentId = 123456789

      ;(instagramApi as any).api.get.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })

      const result = await instagramApi.getCommentReplies({ commentId })

      expect(instagramApi['api'].get).toHaveBeenCalledWith(
        `${commentId}/replies`
      )
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('getContainer', () => {
    it('should correctly fetch container data', async () => {
      const mockResponse = { id: 'container_id', name: 'Container Name' }
      const containerId = 987654321
      const fields = ['id', 'name']

      ;(instagramApi as any).api.get.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })

      const result = await instagramApi.getContainer({ containerId, fields })

      expect(instagramApi['api'].get).toHaveBeenCalledWith(
        `${containerId}?fields=${fields.join(',')}`
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('getHashtagId', () => {
    it('should correctly fetch a hashtag ID', async () => {
      const mockResponse = { data: [{ id: 123 }] }
      const userId = 12345
      const hashtagName = 'testHashtag'

      ;(instagramApi as any).api.get.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })

      const result = await instagramApi.getHashtagId({ userId, hashtagName })

      expect(instagramApi['api'].get).toHaveBeenCalledWith(
        `ig_hashtag_search?user_id=${userId}&q=${hashtagName}`
      )
      expect(result).toEqual(mockResponse.data[0].id)
    })
  })

  describe('getHashtag', () => {
    it('should correctly fetch hashtag information', async () => {
      const mockResponse = { id: 'hashtag_id', name: 'HashtagName' }
      const hashtagId = 123456
      const fields = ['id', 'name']

      ;(instagramApi as any).api.get.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })

      const result = await instagramApi.getHashtag({ hashtagId, fields })

      expect(instagramApi['api'].get).toHaveBeenCalledWith(
        `${hashtagId}?fields=${fields.join(',')}`
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('getHashtagRecentMedia', () => {
    it('should correctly fetch most recently published media tagged with a hashtag', async () => {
      const mockResponse = { data: [{ id: 'media_id', type: 'IMAGE' }] }
      const userId = 12345
      const hashtagId = 67890
      const fields = ['id', 'type']

      ;(instagramApi as any).api.get.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })

      const result = await instagramApi.getHashtagRecentMedia({
        userId,
        hashtagId,
        fields
      })

      expect(instagramApi['api'].get).toHaveBeenCalledWith(
        `${hashtagId}/recent_media?user_id=${userId}&fields=${fields.join(',')}`
      )
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('getTopHashtagMedia', () => {
    it('should correctly fetch top media tagged with a hashtag', async () => {
      const mockResponse = { data: [{ id: 'media_id', type: 'IMAGE' }] }
      const hashtagId = 67890
      const userId = 12345
      const fields = ['id', 'type']

      ;(instagramApi as any).api.get.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })

      const result = await instagramApi.getTopHashtagMedia({
        userId,
        hashtagId,
        fields
      })

      expect(instagramApi['api'].get).toHaveBeenCalledWith(
        `${hashtagId}/top_media?user_id=${userId}&fields=${fields.join(',')}`
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('getIgMedia', () => {
    it('should correctly fetch IG media information', async () => {
      const mockResponse = { id: 'media_id', type: 'IMAGE' }
      const mediaId = 123456
      const fields = ['id', 'type']

      ;(instagramApi as any).api.get.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })

      const result = await instagramApi.getIgMedia({ mediaId, fields })

      expect(instagramApi['api'].get).toHaveBeenCalledWith(
        `${mediaId}?fields=${fields.join(',')}`
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('updateComments', () => {
    it('should correctly update comment settings on an IG Media', async () => {
      const mockResponse = { success: true }
      const mediaId = 123456
      const commentEnabled = true

      ;(instagramApi as any).api.post.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })

      const result = await instagramApi.updateComments({
        mediaId,
        commentEnabled
      })

      expect(instagramApi['api'].post).toHaveBeenCalledWith(
        `${mediaId}?comment_enabled=${commentEnabled}`
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('createComment', () => {
    it('should correctly create a comment on an IG Media', async () => {
      const mockResponse = { id: 'comment_id' }
      const mediaId = 123456
      const message = 'This is a comment'

      ;(instagramApi as any).api.post.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })

      const result = await instagramApi.createComment({ mediaId, message })

      expect(instagramApi['api'].post).toHaveBeenCalledWith(
        `${mediaId}/comments?message=${encodeURIComponent(message)}`
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('getComments', () => {
    it('should correctly fetch comments on an IG Media', async () => {
      const mockResponse = {
        data: [{ id: 'comment_id', text: 'This is a comment' }]
      }
      const mediaId = 123456

      ;(instagramApi as any).api.get.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })

      const result = await instagramApi.getComments({ mediaId })

      expect(instagramApi['api'].get).toHaveBeenCalledWith(
        `${mediaId}/comments`
      )
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('getChildren', () => {
    it('should correctly fetch children of an album IG Media', async () => {
      const mockResponse = { data: [{ id: 'child_media_id', type: 'IMAGE' }] }
      const mediaId = 123456

      ;(instagramApi as any).api.get.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })

      const result = await instagramApi.getChildren({ mediaId })

      expect(instagramApi['api'].get).toHaveBeenCalledWith(
        `${mediaId}/children`
      )
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('getMediaInsights', () => {
    it('should correctly fetch insights for an IG Media', async () => {
      const mockResponse = {
        data: [{ name: 'impressions', values: [{ value: 100 }] }]
      }
      const mediaId = 123456
      const metric = ['impressions', 'reach']
      const breakdown = 'time'

      ;(instagramApi as any).api.get.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })

      const result = await instagramApi.getMediaInsights({
        mediaId,
        metric,
        breakdown
      })

      expect(instagramApi['api'].get).toHaveBeenCalledWith(
        `${mediaId}/insights?metric=${metric.join(',')}${
          breakdown ? '&breakdown=' + breakdown : ''
        }`
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('createProductTags', () => {
    it('should correctly create product tags on an IG Media', async () => {
      const mockResponse = { success: true }
      const mediaId = 123456
      const updatedTags = [{ merchant_id: 789, product_id: 456 }]

      ;(instagramApi as any).api.post.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })

      const result = await instagramApi.createProductTags({
        mediaId,
        updatedTags
      })

      expect(instagramApi['api'].post).toHaveBeenCalledWith(
        `${mediaId}/product_tags?updated_tags=${updatedTags}`
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('getProductTags', () => {
    it('should correctly fetch product tags from an IG Media', async () => {
      const mockResponse = { data: [{ merchant_id: 789, product_id: 456 }] }
      const mediaId = '123456'

      ;(instagramApi as any).api.get.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })

      const result = await instagramApi.getProductTags({ mediaId })

      expect(instagramApi['api'].get).toHaveBeenCalledWith(
        `${mediaId}/product_tags`
      )
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('deleteProductTags', () => {
    it('should correctly delete product tags from an IG Media', async () => {
      const mockResponse = { success: true }
      const mediaId = 123456
      const deletedTags = [{ merchant_id: 789, product_id: 456 }]

      ;(instagramApi as any).api.delete.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })

      const result = await instagramApi.deleteProductTags({
        mediaId,
        deletedTags
      })

      expect(instagramApi['api'].delete).toHaveBeenCalledWith(
        `${mediaId}/product_tags?deleted_tags=${JSON.stringify(deletedTags)}`
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('getIgUserData', () => {
    it('should correctly fetch data for an Instagram Business or Creator Account', async () => {
      const mockResponse = {
        biography: 'Example Bio',
        id: '123456',
        followers_count: 1000
      }
      const userId = '123456'
      const fields = ['biography', 'id', 'followers_count']

      ;(instagramApi as any).api.get.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })

      const result = await instagramApi.getIgUserData({ userId, fields })

      expect(instagramApi['api'].get).toHaveBeenCalledWith(
        `${userId}?fields=${fields.join(',')}`
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('getAvailableCatalogs', () => {
    it('should correctly fetch available catalogs for an IG User', async () => {
      const mockResponse = {
        data: [{ id: 'catalog_id', name: 'Catalog Name' }]
      }
      const userId = 123456
      const fields = ['id', 'name']

      ;(instagramApi as any).api.get.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })

      const result = await instagramApi.getAvailableCatalogs({ userId, fields })

      expect(instagramApi['api'].get).toHaveBeenCalledWith(
        `${userId}/available_catalogs?fields=${fields.join(',')}`
      )
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('getBusinessData', () => {
    it('should correctly fetch business data for a specified IG User', async () => {
      const mockResponse = {
        data: { followers_count: 1000, follows_count: 500 }
      }
      const username = 'business_user'
      const fields = ['followers_count', 'follows_count']

      ;(instagramApi as any).api.get.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })

      const result = await instagramApi.getBusinessData({ username, fields })

      expect(instagramApi['api'].get).toHaveBeenCalledWith(
        `{ig-user-id}?fields=business_discovery.username(${username}){${fields.join(
          ','
        )}}`
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('searchProducts', () => {
    it("should correctly search for products in a user's Instagram Shop product catalog", async () => {
      const mockResponse = {
        data: [{ id: 'product_id', name: 'Product Name' }]
      }
      const userId = 123456
      const catalogId = 78910
      const query = 'Product'

      ;(instagramApi as any).api.get.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })

      const result = await instagramApi.searchProducts({
        userId,
        catalogId,
        q: query
      })

      expect(instagramApi['api'].get).toHaveBeenCalledWith(
        `${userId}/catalog_product_search?catalog_id=${catalogId}&q=${query}`
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('getPublishingLimit', () => {
    it('should correctly fetch the publishing limit data', async () => {
      const mockResponse = { data: { quota_usage: 5 } }
      const userId = 123456
      const since = 1609459200 // Example Unix timestamp for January 1, 2021
      const fields = ['quota_usage']

      ;(instagramApi as any).api.get.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })

      const result = await instagramApi.getPublishingLimit({
        userId,
        since,
        fields
      })

      expect(instagramApi['api'].get).toHaveBeenCalledWith(
        `${userId}/content_publishing_limit?fields=${fields.join(
          ','
        )}&since=${since}`
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('getUserInsights', () => {
    it('should correctly fetch insights for an IG User', async () => {
      const mockResponse = {
        data: [{ name: 'reach', period: 'day', values: [{ value: 1000 }] }]
      }
      const userId = 123456
      const metrics = ['reach']
      const period = 'day'
      const since = 1609459200 // Example Unix timestamp for January 1, 2021
      const until = 1612137600 // Example Unix timestamp for February 1, 2021

      ;(instagramApi as any).api.get.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })

      const result = await instagramApi.getUserInsights({
        userId,
        metrics,
        period,
        since,
        until
      })

      expect(instagramApi['api'].get).toHaveBeenCalledWith(
        `${userId}/insights?metric=${metrics.join(
          ','
        )}&period=${period}&since=${since}&until=${until}`
      )
      expect(result).toEqual(mockResponse)
    })
  })

  describe('getLiveMedia', () => {
    it('should correctly fetch a collection of live video IG Media for an IG User', async () => {
      const mockResponse = { data: [{ id: 'live_media_id', type: 'LIVE' }] }
      const userId = 123456
      const fields = ['id', 'type']
      const since = 1609459200 // Example Unix timestamp for January 1, 2021
      const until = 1612137600 // Example Unix timestamp for February 1, 2021

      ;(instagramApi as any).api.get.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })

      const result = await instagramApi.getLiveMedia({
        userId,
        fields,
        since,
        until
      })

      expect(instagramApi['api'].get).toHaveBeenCalledWith(
        `${userId}/live_media?fields=${fields.join(
          ','
        )}&since=${since}&until=${until}`
      )
      expect(result).toEqual(mockResponse.data)
    })
  })

  describe('createMedia', () => {
    it('should correctly create media for an IG User', async () => {
      const mockResponse = { id: 'new_media_id' }
      const params = {
        userId: 123456,
        caption: 'Test Caption', 
        imageUrl: 'http://example.com/image.jpg'
      }
  
      ;(instagramApi as any).api.post.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })
  
      const result = await instagramApi.createMedia(params)
  
      expect(instagramApi['api'].post).toHaveBeenCalledWith(expect.stringContaining(`${params.userId}/media`))
      expect(result).toEqual(mockResponse)
    })
  })
  
  describe('getUserMedia', () => {
    it('should fetch a collection of IG Media for a user', async () => {
      const mockResponse = { data: [{ id: 'media_id', type: 'IMAGE' }] }
      const igUserId = 123456
  
      ;(instagramApi as any).api.get.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })
  
      const result = await instagramApi.getUserMedia({ igUserId })
  
      expect(instagramApi['api'].get).toHaveBeenCalledWith(`${igUserId}/media`)
      expect(result).toEqual(mockResponse)
    })
  })
  
  describe('publishContainer', () => {
    it('should publish an IG Container for a user', async () => {
      const mockResponse = { id: 'published_media_id' }
      const userId = 123456
      const creationId = 789012
  
      ;(instagramApi as any).api.post.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })
  
      const result = await instagramApi.publishContainer({ userId, creationId })
  
      expect(instagramApi['api'].post).toHaveBeenCalledWith(`${userId}/media_publish?creation_id=${creationId}`)
      expect(result).toEqual(mockResponse)
    })
  })
  
  describe('createMention', () => {
    it('should create a comment on an IG Media or IG Comment where a user is mentioned', async () => {
      const mockResponse = { id: 'new_comment_id' }
      const params = {
        mediaId: 123456,
        commentId: 789012,
        message: 'Test mention'
      }
  
      ;(instagramApi as any).api.post.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })
  
      const result = await instagramApi.createMention(params)
  
      expect(instagramApi['api'].post).toHaveBeenCalledWith(expect.stringContaining('mentions'))
      expect(result).toEqual(mockResponse)
    })
  })
  
  describe('getMentionedComment', () => {
    it('should fetch data on a comment where an IG User is mentioned', async () => {
      const mockResponse = { data: { comment_id: 'comment_id', text: 'Mentioned comment' } }
      const params = {
        userId: 123456,
        commentId: 789012,
        fields: ['text']
      }
  
      ;(instagramApi as any).api.get.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })
  
      const result = await instagramApi.getMentionedComment(params)
  
      expect(instagramApi['api'].get).toHaveBeenCalledWith(expect.stringContaining(`${params.userId}`))
      expect(result).toEqual(mockResponse)
    })
  })

  describe('getMentionedMedia', () => {
    it('should fetch data on an IG Media where a user is mentioned', async () => {
      const mockResponse = { data: { id: 'media_id', type: 'IMAGE' } }
      const params = {
        userId: 123456,
        mediaId: 789012,
        fields: ['id', 'type']
      }
  
      ;(instagramApi as any).api.get.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })
  
      const result = await instagramApi.getMentionedMedia(params)
  
      expect(instagramApi['api'].get).toHaveBeenCalledWith(expect.any(String))
      expect(result).toEqual(mockResponse)
    })
  })
  
  describe('appealRejectedProduct', () => {
    it('should appeal a rejected product', async () => {
      const mockResponse = { success: true }
      const params = {
        igUserId: '123456',
        appealReason: 'Reason for appeal',
        productId: '789012'
      }
  
      ;(instagramApi as any).api.post.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })
  
      const result = await instagramApi.appealRejectedProduct(params)
  
      expect(instagramApi['api'].post).toHaveBeenCalledWith(expect.any(String))
      expect(result).toEqual(mockResponse)
    })
  })
  
  describe('getProductAppealStatus', () => {
    it('should fetch the appeal status of a rejected product', async () => {
      const mockResponse = { data: { appealStatus: 'pending' } }
      const params = {
        userId: 123456,
        productId: 789012
      }
  
      ;(instagramApi as any).api.get.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })
  
      const result = await instagramApi.getProductAppealStatus(params)
  
      expect(instagramApi['api'].get).toHaveBeenCalledWith(expect.any(String))
      expect(result).toEqual(mockResponse)
    })
  })
  
  describe('getRecentlySearchedHashtags', () => {
    it('should fetch recently searched hashtags by a user', async () => {
      const mockResponse = { data: [{ id: 'hashtag_id' }] }
      const params = {
        userId: 123456,
        limit: 10
      }
  
      ;(instagramApi as any).api.get.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })
  
      const result = await instagramApi.getRecentlySearchedHashtags(params)
  
      expect(instagramApi['api'].get).toHaveBeenCalledWith(expect.any(String))
      expect(result).toEqual(mockResponse)
    })
  })
  
  describe('getStories', () => {
    it('should fetch story IG Media for a user', async () => {
      const mockResponse = { data: [{ id: 'story_media_id' }] }
      const params = {
        userId: 123456
      }
  
      ;(instagramApi as any).api.get.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })
  
      const result = await instagramApi.getStories(params)
  
      expect(instagramApi['api'].get).toHaveBeenCalledWith(expect.any(String))
      expect(result).toEqual(mockResponse)
    })
  })
  
  describe('getTaggedMedia', () => {
    it('should fetch IG Media where a user is tagged', async () => {
      const mockResponse = { data: [{ id: 'tagged_media_id', type: 'IMAGE' }] }
      const params = {
        userId: 123456,
        fields: ['id', 'type']
      }
  
      ;(instagramApi as any).api.get.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })
  
      const result = await instagramApi.getTaggedMedia(params)
  
      expect(instagramApi['api'].get).toHaveBeenCalledWith(expect.any(String))
      expect(result).toEqual(mockResponse.data)
    })
  })
  
  describe('getPageIGUser', () => {
    it('should fetch the Instagram Business Account connected to a Facebook Page', async () => {
      const mockResponse = { instagram_business_account: { id: 'ig_business_account_id' } }
      const params = {
        userId: 123456,
        fields: ['instagram_business_account']
      }
  
      ;(instagramApi as any).api.get.mockReturnValue({
        json: jest.fn().mockResolvedValue(mockResponse)
      })
  
      const result = await instagramApi.getPageIGUser(params)
  
      expect(instagramApi['api'].get).toHaveBeenCalledWith(expect.any(String))
      expect(result).toEqual(mockResponse)
    })
  })
  
  
})
