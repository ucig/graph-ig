import * as types from './types'
import { createApiClient } from './fetch-api'

export class InstagramGraphAPI {
  private accessToken: string
  private baseUrl: string
  private api: ReturnType<typeof createApiClient>
  private debug: boolean

  constructor(config: types.Config) {
    const {
      accessToken = config.accessToken ||
        (process.env.USER_ACCESS_TOKEN as string),
      baseUrl = 'https://graph.facebook.com/v16.0',
      debug = false
    } = config

    if (!accessToken) {
      throw new Error(
        'Missing Access Token. An access token is required to make requests to Instagram Graph API. Please provide one as a parameter when creating a new instance of InstagramGraphAPI or set the INSTAGRAM_ACCESS_TOKEN environment variable. You can obtain an access token by following the instructions in the Instagram Graph API documentation: https://developers.facebook.com/docs/facebook-login/guides/access-tokens#usertokens'
      )
    }
    this.accessToken = accessToken
    this.baseUrl = baseUrl
    this.debug = debug
    this.api = createApiClient({
      accessToken: this.accessToken,
      baseUrl: this.baseUrl,
      debug: this.debug
    })
  }

  /**
   * Gets a comment from the Instagram API.
   *
   * @param {string} params.commentId - The Instagram comment ID.
   * @param {string[]} params.fields - The list of fields to include in the response.
   *
   * @returns {Promise<types.IGComment>} - The requested comment data.
   */
  public async getCommentById(params: {
    commentId: number
    fields?: string[]
  }): Promise<types.IGComment> {
    const { commentId, fields = [] } = params
    return this.api
      .get(`${commentId}?fields=${fields.join(',')}`)
      .json<types.IGComment>()
  }

  /**
   * Hides or unhides a comment on an IG Media.
   *
   * @param {string} params.commentId - The Instagram comment ID.
   * @param {boolean} params.hide - Set to true to hide the comment, or false to show the comment.
   *
   * @returns {Promise<boolean>} - The success status of the operation.
   */
  public async updateCommentVisibility(params: {
    commentId: number
    hide: boolean
  }): Promise<boolean> {
    const { commentId, hide } = params
    return this.api
      .post(`${commentId}?hide=${hide}`)
      .json<{ success: boolean }>()
      .then((response) => response.success)
  }

  /**
   * Deletes a comment on an IG Media.
   *
   * @param {string} params.commentId - The Instagram comment ID.
   *
   * @returns {Promise<boolean>} - The success status of the operation.
   */
  public async deleteComment(params: { commentId: number }): Promise<boolean> {
    const { commentId } = params
    return this.api
      .delete(`${commentId}`)
      .json<{ success: boolean }>()
      .then((response) => response.success)
  }

  /**
   * Replies to a comment on an IG Media.
   *
   * @param {string} params.commentId - The Instagram comment ID.
   * @param {string} params.message - The text to be included in the comment.
   *
   * @returns {Promise<string>} - The ID of the created comment.
   */
  public async replyToComment(params: {
    commentId: number
    message: string
  }): Promise<string> {
    const { commentId, message } = params
    return this.api
      .post(`${commentId}/replies?message=${message}`)
      .json<{ id: string }>()
      .then((response) => response.id)
  }

  /**
   * Gets all replies to a comment on an IG Media.
   *
   * @param {string} params.commentId - The Instagram comment ID.
   *
   * @returns {Promise<types.IGCommentReply[]>} - The list of comment replies.
   */
  public async getCommentReplies(params: {
    commentId: number
  }): Promise<types.IGCommentReply[]> {
    const { commentId } = params
    return this.api
      .get(`${commentId}/replies`)
      .json<{ data: types.IGCommentReply[] }>()
      .then((response) => response.data)
  }

  /**
   * Gets an IG Container.
   *
   * @param {string} params.containerId - The Instagram container ID.
   * @param {string[]} params.fields - The list of fields to include in the response.
   *
   * @returns {Promise<types.IGContainer>} - The requested container data.
   */
  public async getContainer(params: {
    containerId: number
    fields?: string[]
  }): Promise<types.IGContainer> {
    const { containerId, fields = [] } = params
    return this.api
      .get(`${containerId}?fields=${fields.join(',')}`)
      .json<types.IGContainer>()
  }

  /**
   * Get a hashtag's ID.
   *
   * @param {number} params.userId - The user ID.
   * @param {string} params.hashtagName - The name of the hashtag.
   *
   * @return {Promise<number>} - The ID of the hashtag.
   */
  public async getHashtagId(params: {
    userId: number
    hashtagName: string
  }): Promise<number> {
    const { userId, hashtagName } = params
    return this.api
      .get(`ig_hashtag_search?user_id=${userId}&q=${hashtagName}`)
      .json<{ data: { id: number }[] }>()
      .then((response) => response.data[0].id)
  }

  /**
   * Gets information about an Instagram hashtag.
   *
   * @param {number} params.hashtagId - The ID of the Instagram hashtag.
   * @param {string[]} params.fields - The list of fields to include in the response.
   *
   * @returns {Promise<IGHashtag>} - An object containing information about the Instagram hashtag.
   */
  public async getHashtag(params: {
    hashtagId: number
    fields?: string[]
  }): Promise<types.IGHashtag> {
    const { hashtagId, fields = [] } = params
    return this.api
      .get(`${hashtagId}?fields=${fields.join(',')}`)
      .json<types.IGHashtag>()
  }

  /**
   * Gets the most recently published photo and video IG Media objects that have been tagged with a specific hashtag.
   *
   * @param {number} params.userId - The ID of the IG User performing the query.
   * @param {number} params.hashtagId - The ID of the Instagram hashtag.
   * @param {string[]} params.fields - The list of fields to include in the response.
   *
   * @returns {Promise<types.IGHashtagRecentMedia[]>} - An array of objects containing information about the most recently published photo and video IG Media objects that have been tagged with the specified hashtag.
   */
  public async getHashtagRecentMedia(params: {
    userId: number
    hashtagId: number
    fields: string[]
  }): Promise<types.IGHashtagRecentMedia[]> {
    const { hashtagId, userId, fields = [] } = params
    return this.api
      .get(
        `${hashtagId}/recent_media?user_id=${userId}&fields=${fields.join(',')}`
      )
      .json<{ data: types.IGHashtagRecentMedia[] }>()
      .then((response) => response.data)
  }

  /**
   * Retrieves the most popular media objects tagged with a hashtag.
   * @param params.userId The ID of the Instagram Business or Creator Account performing the query.
   * @param params.hashtagId The IG hashtag id to get the top media.
   * @param params.fields An array of fields to return.
   * @returns An array of IG Media objects.
   */
  public async getTopHashtagMedia(params: {
    userId: number
    hashtagId: number
    fields: string[]
  }) {
    const { hashtagId, userId, fields = [] } = params
    return this.api
      .get(
        `${hashtagId}/top_media?user_id=${userId}&fields=${fields.join(',')}`
      )
      .json()
  }

  /**
   * Gets IG Media information.
   * @param {number} params.mediaId IG Media ID.
   * @param params.fields An array of fields to return.
   * @returns {IGMedia} IG Media information.
   */
  public async getIgMedia(params: { mediaId: number; fields: string[] }) {
    const { mediaId, fields = [] } = params
    return this.api.get(`${mediaId}?fields=${fields.join(',')}`).json()
  }

  /**
   * Enable or disable comments on an IG Media.
   * @param {number} params.mediaId  IG Media ID.
   * @param {boolean} params.commentEnabled  Set to true to enable comments or false to disable comments.
   * @returns {Object} Result of the request.
   */
  public async updateComments(params: {
    mediaId: number
    commentEnabled: boolean
  }) {
    const { mediaId, commentEnabled } = params
    return this.api.post(`${mediaId}?comment_enabled=${commentEnabled}`).json()
  }

  /**
   * Creates an IG Comment on an IG Media object.
   * @param params.mediaId The ID of the IG Media object to comment on
   * @param params.message The text to be included in the comment
   */
  public async createComment(params: { mediaId: number; message: string }) {
    const { mediaId, message } = params
    return this.api
      .post(`${mediaId}/comments?message=${encodeURIComponent(message)}`)
      .json()
  }

  /**
   * Get comments on a Media Object
   * @param {number} params.mediaId - ID of the media object to get comments for
   * @returns {Object[]} array of comments on the media object
   */
  async getComments(params: { mediaId: number }) {
    const { mediaId } = params
    return this.api
      .get(`${mediaId}/comments`)
      .json<{ data: { id: string }[] }>()
      .then((response) => response.data)
  }

  /**
   * Get a collection of IG Media objects on an album IG Media.
   * @param {number} params.mediaId - ID of the media object to get comments for
   * @returns {Object[]} a list of IG Media objects on an album IG Media object.
   */
  async getChildren(params: { mediaId: number }) {
    const { mediaId } = params
    return this.api
      .get(`${mediaId}/children`)
      .json<{ data: { id: number; type: string }[] }>()
      .then((response) => response.data)
  }

  /**
   * Gets insights data on an IG Media object.
   * @param params.mediaId {number} IG Media ID.
   * @param params.metric {string[]} Comma-separated list of Metrics you want returned.
   * @param params.breakdown (optional) {string} Designates how to break down result set into subsets. See Breakdown.
   * @returns {Promise<object>} Returns a promise containing the response data.
   */
  async getMediaInsights(params: {
    mediaId: number
    metric: string[]
    breakdown: string
  }) {
    const { mediaId, metric, breakdown } = params
    return this.api
      .get(
        `${mediaId}/insights?metric=${metric.join(',')}${
          breakdown ? '&breakdown=' + breakdown : ''
        }`
      )
      .json()
  }

  /**
   * Represents product tags on an IG Media. See Product Tagging guide for complete usage details.
   * @param params.mediaId - Required. IG Media ID.
   * @param params.updatedTags - Updated tags
   */
  async createProductTags(params: { mediaId: number; updatedTags: any[] }) {
    const { mediaId, updatedTags } = params
    return this.api
      .post(`${mediaId}/product_tags?updated_tags=${updatedTags}`)
      .json()
  }

  /**
   * Method to get a collection of product tags on an IG Media.
   * @param {string} params.mediaId - The IG Media ID.
   * @returns {object[]} An array of product tags on the IG Media.
   */
  async getProductTags(params: { mediaId: string }) {
    const { mediaId } = params
    return this.api
      .get(`${mediaId}/product_tags`)
      .json<{ data: { merchant_id: number; product_id: number }[] }>()
      .then((response) => response.data)
  }

  /**
   * Delete product tags on an existing IG Media.
   *
   * @param params.mediaId {number} - The IG Media ID.
   * @param params.deletedTags {Array.<{merchant_id: number, product_id: number}>} - An array containing the info for each product tag to be deleted.
   *
   * @returns {Promise<{success: boolean}>} - Returns true if able to delete the specified product tags on the IG Media, otherwise returns false.
   */
  async deleteProductTags(params: {
    mediaId: number
    deletedTags: Array<{ merchant_id: number; product_id: number }>
  }): Promise<{
    success: boolean
  }> {
    const { mediaId, deletedTags } = params
    return this.api
      .delete(
        `${mediaId}/product_tags?deleted_tags=${JSON.stringify(deletedTags)}`
      )
      .json()
  }

  /**
   * Gets data for an Instagram Business or Creator Account.
   *
   * @param params.userId - The ID of the Instagram Business or Creator Account to get data for.
   * @param params.accessToken - A User access token with the required permissions.
   * @param params.fields - An array of fields to retrieve for the Instagram Business or Creator Account. Defaults to all available fields.
   *
   * @returns An object containing data for the specified Instagram Business or Creator Account.
   */
  async getIgUserData(params: { userId: string; fields: string[] }): Promise<{
    biography?: string
    id?: string
    ig_id?: string
    followers_count?: number
    follows_count?: number
    media_count?: number
  }> {
    const { userId, fields = [] } = params
    return this.api.get(`${userId}?fields=${fields.join(',')}`).json()
  }

  /**
   * Get the product catalog in an IG User's Instagram Shop.
   * @param {number} params.userId The app user's app-scoped user ID.
   * @param {string} params.fields Comma-separated list of catalog fields you want returned for each catalog in the result set.
   * @returns {Object} A JSON-formatted object containing the data requested.
   */
  async getAvailableCatalogs(params: { userId: number; fields: string[] }) {
    const { userId, fields = [] } = params
    return this.api
      .get(`${userId}/available_catalogs?fields=${fields.join(',')}`)
      .json<{ data: { id: number; name: string }[] }>()
      .then((response) => response.data)
  }

  /**
   * Get data about another Instagram Business or Creator IG User.
   * @param {string} params.username - The username of the Instagram Business or Creator IG User you want to get data about
   * @param {IGUserBusinessDiscoveryData[]} [params.fields] - An array of fields to include in the API response
   * @returns {Promise<IGUserBusinessDiscoveryData>} The data about the targeted IG User
   */
  async getBusinessData(params: { username: string; fields: string[] }) {
    const { username, fields = [] } = params
    return this.api
      .get(
        `{ig-user-id}?fields=business_discovery.username(${username})${
          fields.length > 0 ? `{${fields.join(',')}}` : ''
        }`
      )
      .json()
  }

  /**
   * A method to search for products and product variants in an IG User's Instagram Shop product catalog.
   * @param {string} params.userId - app user's app-scoped user ID
   * @param {string} params.catalogId - ID of the catalog to search
   * @param {string} params.q - string to search for in each product's name or SKU number
   * @returns {Object} A JSON-formatted object containing an array of tag-eligible products and their metadata.
   */
  async searchProducts(params: {
    userId: number
    catalogId: number
    q: string
  }) {
    const { userId, catalogId, q } = params
    return this.api
      .get(`${userId}/catalog_product_search?catalog_id=${catalogId}&q=${q}`)
      .json()
  }

  /**
   * Get the number of times an IG User has published an IG Container within a given time period.
   * @param params.userId The IG User ID.
   * @param params.since A Unix timestamp no older than 24 hours (optional).
   * @param params.fields A comma-separated list of fields you want returned. If omitted, quota_usage will be returned by default.
   * @returns The number of times the app user has published an IG Container since the time specified in the since parameter. If the since parameter is omitted, this value will be the number of times the app user has published a container within the last 24 hours.
   */
  async getPublishingLimit(params: {
    userId: number
    since: number
    fields: string[]
  }): Promise<types.PublishingLimitResponse> {
    const { userId, since, fields = ['quota_usage'] } = params
    return this.api
      .get(
        `${userId}/content_publishing_limit?fields=${fields.join(',')}${
          since ? '&since=' + since : ''
        }`
      )
      .json()
  }

  /**
   * Get insights on an IG User.
   * @param {number} params.userId - The IG User ID.
   * @param {string[]} params.metrics - A comma-separated list of Metrics you want returned.
   * @param {string} params.period - A Period that is compatible with the metrics you are requesting.
   * @param {number} params.since - Unix timestamp used in conjunction with 'until' to define a Range.
   * @param {number} params.until - Unix timestamp used in conjunction with 'since' to define a Range.
   */
  async getUserInsights(params: {
    userId: number
    metrics: string[]
    period: string
    since?: number
    until?: number
  }) {
    const { userId, metrics, period } = params
    return this.api
      .get(
        `${userId}/insights?metric=${metrics.join(',')}&period=${period}${
          params.since && params.until
            ? '&since=' + params.since + '&until=' + params.until
            : ''
        }`
      )
      .json()
  }

  /**
   * Get a collection of live video IG Media on an IG User.
   *
   * @param {number} params.userId        App user's app-scoped user ID.
   * @param {string[]} [params.fields]    An array of IG Media fields you want returned for each live IG Media in the result set.
   * @param {Date | number} [params.since]       A Unix timestamp or strtotime data value that points to the start of a range of time-based data.
   * @param {Date | number} [params.until]       A Unix timestamp or strtotime data value that points to the end of a range of time-based data.
   *
   * @returns {Promise<Array>}     An array of IG Media objects on an IG User.
   */
  async getLiveMedia(params: {
    userId: number
    fields: string[]
    since?: Date | number
    until?: Date | number
  }) {
    const { userId, fields = [] } = params
    return this.api
      .get(
        `${userId}/live_media?fields=${fields.join(',')}${
          params.since && params.until
            ? '&since=' + params.since + '&until=' + params.until
            : ''
        }`
      )
      .json<{ data: {id: number, type: string}[]}>()
      .then(response => response.data)
  }

  async createMedia(params: {
    userId: number
    caption?: string
    children?: string[]
    coverUrl?: string
    imageUrl?: string
    isCarouselItem?: boolean
    locationId?: number
    mediaType?: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM' | 'REEL'
    productTags?: {
      product_id: string
      x?: number
      y?: number
    }[]
    shareToFeed?: boolean
    thumbOffset?: number
    userTags?: {
      username: string
      x: number
      y: number
    }[]
    videoUrl?: string
  }): Promise<{ id: string }> {
    const {
      userId,
      caption = null,
      children = null,
      coverUrl = null,
      imageUrl = null,
      isCarouselItem = null,
      locationId = null,
      mediaType = null,
      productTags = null,
      shareToFeed = null,
      thumbOffset = null,
      userTags = null,
      videoUrl = null
    } = params
    return this.api
      .post(
        `${userId}/media?${
          caption ? 'caption=' + encodeURIComponent(caption) : ''
        }${children ? '&children=' + children : ''}${
          coverUrl ? '&cover_url=' + coverUrl : ''
        }${imageUrl ? '&image_url=' + imageUrl : ''}${
          isCarouselItem ? '&is_carousel_item=' + isCarouselItem : ''
        }${locationId ? '&location_id=' + locationId : ''}${
          mediaType ? '&media_type=' + mediaType : ''
        }${productTags ? '&product_tags=' + productTags : ''}${
          shareToFeed ? '&share_to_feed=' + shareToFeed : ''
        }${thumbOffset ? '&thumb_offset=' + thumbOffset : ''}${
          userTags ? '&user_tags=' + userTags : ''
        }${videoUrl ? '&video_url=' + videoUrl : ''}`
      )
      .json()
  }

  /**
   * Get a collection of IG Media on an IG User.
   *
   * @param params.igUserId The ID of the IG User
   */
  async getUserMedia(params: { igUserId: number }) {
    const { igUserId } = params
    return this.api.get(`${igUserId}/media`).json()
  }

  /**
   * Get all IG Media on an IG User.
   *
   * @param params.igUserId The ID of the Instagram Business IG User
   * @param params.creationId The ID of the IG Container object to publish
   *
   * @returns A Promise that resolves to an object containing the ID of the newly published media object.
   */
  async publishContainer(params: {
    userId: number
    creationId: number
  }): Promise<{ id: string }> {
    const { userId, creationId } = params
    return this.api
      .post(`${userId}/media_publish?creation_id=${creationId}`)
      .json()
  }
  /**
   * Creates an IG Comment on an IG Media object or IG Comment in which an IG User has been @mentioned.
   *
   * @param params.igUserId The ID of the IG User
   * @param params.mediaId The media ID contained in the Webhook notification payload
   * @param params.message The text to include in the comment
   * @param params.accessToken The app user's User Access Token.
   * @param params.commentId (optional) The ID of the IG Comment to reply to. If omitted, the comment will be created on the specified media object.
   *
   * @returns A Promise that resolves to an object containing the ID of the newly created comment.
   */
  async createMention(params: {
    mediaId: number
    commentId: number
    message: string
  }): Promise<{ id: string }> {
    const { mediaId, commentId, message } = params
    return this.api
      .post(
        `{ig-user-id}/mentions?media_id=${mediaId}${
          commentId ? '&comment_id=' + commentId : ''
        }&message=${encodeURIComponent(message)}`
      )
      .json()
  }

  /**
   * Returns data on an IG Comment in which an IG User has been @mentioned by another Instagram user.\
   *
   * @param params.igUserId The ID of the IG User
   * @param params.commentId The ID of the IG Comment in which the IG User has been @mentioned. The ID is included in the Webhook notification payload.
   * @param params.fields A comma-separated list of IG Comment Fields you want returned. If omitted, default fields will be returned.
   *
   */
  async getMentionedComment(params: {
    userId: number
    commentId: number
    fields: string[]
  }): Promise<types.MentionedCommentResponse> {
    const { userId, commentId, fields = [] } = params
    return this.api
      .get(
        `${userId}?fields=mentioned_comment.comment_id(${commentId}){${fields.join(
          ','
        )}}`
      )
      .json()
  }

  /**
   * Get data on an IG Media in which an IG User has been @mentioned in a caption by another Instagram user
   *
   * @param params.igUserId The ID of the IG User
   * @param params.mediaId The ID of the IG Media in which the IG User has been @mentioned
   * @param params.fields A comma-separated list of IG Media Fields to return (default: all fields)
   *
   * @returns An object containing data on the mentioned media
   */
  async getMentionedMedia(params: {
    userId: number
    mediaId: number
    fields: string[]
  }): Promise<types.MentionedMedia> {
    const { userId, mediaId, fields = [] } = params
    return this.api
      .get(
        `${userId}?fields=mentioned_media.media_id(${mediaId}){${fields.join(
          ','
        )}}`
      )
      .json()
  }

  /**
   * Appeal a rejected product for an Instagram user
   *
   * @param params.igUserId The ID of the IG User
   * @param params.appealReason Explanation of why the product should be approved
   * @param params.productId The ID of the product to appeal
   *
   * @returns An object indicating success or failure. Response does not indicate appeal outcome.
   */
  async appealRejectedProduct(params: {
    igUserId: string
    appealReason: string
    productId: string
  }): Promise<{ success: boolean }> {
    const { igUserId, appealReason, productId } = params
    return this.api
      .post(
        `${igUserId}/product_appeal?appeal_reason=${appealReason}&product_id=${productId}`
      )
      .json()
  }

  /**
   * Get appeal status of a rejected product for an Instagram user
   *
   * @param params.igUserId The ID of the IG User
   * @param params.productId The ID of the product to check
   *
   * @returns An array of appeal status metadata
   */
  async getProductAppealStatus(params: {
    userId: number
    productId: number
  }): Promise<types.ProductAppealStatusResponse> {
    const { userId, productId } = params
    return this.api
      .get(`${userId}/product_appeal?product_id=${productId}}}`)
      .json()
  }

  /**
   * Get the hashtags that an IG User has queried using the IG Hashtags endpoint within the last 7 days.
   *
   * @param params.userId The ID of the IG User
   * @param params.limit The number of results to return per page (max: 30)
   *
   * @returns An array of hashtag IDs
   */
  async getRecentlySearchedHashtags(params: {
    userId: number
    limit: number
  }): Promise<{ data: { id: string }[] }> {
    const { userId, limit } = params
    return this.api
      .get(`${userId}/recently_searched_hashtags?limit=${limit}`)
      .json()
  }

  /**
   * Represents a collection of story IG Media objects on an IG User.
   *
   * @param params.userId - The ID of the IG User to get stories for.
   *
   * @returns A list of story IG Media objects on an IG User.
   */
  async getStories(params: {
    userId: number
  }): Promise<{ data: { id: string }[] }> {
    const { userId } = params
    return this.api.get(`${userId}/stories`).json()
  }

  /**
   * Gets the list of IG Media objects in which an IG User has been tagged by another Instagram user.
   *
   * @param {number} params.userId The ID of the Instagram User to be queried.
   * @param {string} params.fields Comma-separated list of IG Media Fields you want returned.
   *
   * @returns a Promise that resolves with the IG Media objects.
   */
  async getTaggedMedia(params: {
    userId: number
    fields: string[]
  }) {
    const { userId, fields = [] } = params
    return this.api.get(`${userId}/tags?fields=${fields.join(',')}`).json<{data: { id: number, type: string}[]}>()
    .then(response => response.data)
  }

  /**
   * Gets the Instagram Business Account connected to a Facebook Page.
   *
   * @param pageId - The ID of the Facebook Page to get the connected Instagram Business Account for.
   *
   * @returns {Promise<{ instagram_business_account: { id: string } }>} The Instagram Business Account connected to the Facebook Page.
   */
  async getPageIGUser(params: {
    userId: number
    fields: string[]
  }): Promise<{ instagram_business_account: { id: string } }> {
    const { userId, fields = [] } = params
    return this.api.get(`${userId}?fields=${fields.join(',')}`).json()
  }
}
