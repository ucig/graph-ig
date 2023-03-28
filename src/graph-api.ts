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
   * @param {string} commentId - The Instagram comment ID.
   * @param {string[]} fields - The list of fields to include in the response.
   *
   * @returns {Promise<types.IGComment>} - The requested comment data.
   */
  public async getCommentById(
    commentId: number,
    fields: string[]
  ): Promise<types.IGComment> {
    return this.api
      .get(`${commentId}?fields=${fields.join(',')}`)
      .json<types.IGComment>()
  }

  /**
   * Hides or unhides a comment on an IG Media.
   *
   * @param {string} commentId - The Instagram comment ID.
   * @param {boolean} hide - Set to true to hide the comment, or false to show the comment.
   *
   * @returns {Promise<boolean>} - The success status of the operation.
   */
  public async updateCommentVisibility(
    commentId: number,
    hide: boolean
  ): Promise<boolean> {
    return this.api
      .post(`${commentId}?hide=${hide}`)
      .json<{ success: boolean }>()
      .then((response) => response.success)
  }

  /**
   * Deletes a comment on an IG Media.
   *
   * @param {string} commentId - The Instagram comment ID.
   *
   * @returns {Promise<boolean>} - The success status of the operation.
   */
  public async deleteComment(commentId: number): Promise<boolean> {
    return this.api
      .delete(`${commentId}`)
      .json<{ success: boolean }>()
      .then((response) => response.success)
  }

  /**
   * Replies to a comment on an IG Media.
   *
   * @param {string} commentId - The Instagram comment ID.
   * @param {string} message - The text to be included in the comment.
   *
   * @returns {Promise<string>} - The ID of the created comment.
   */
  public async replyToComment(
    commentId: number,
    message: string
  ): Promise<string> {
    return this.api
      .post(`${commentId}/replies?message=${message}`)
      .json<{ id: string }>()
      .then((response) => response.id)
  }

  /**
   * Gets all replies to a comment on an IG Media.
   *
   * @param {string} commentId - The Instagram comment ID.
   *
   * @returns {Promise<types.IGCommentReply[]>} - The list of comment replies.
   */
  public async getCommentReplies(
    commentId: number
  ): Promise<types.IGCommentReply[]> {
    return this.api
      .get(`${commentId}/replies`)
      .json<{ data: types.IGCommentReply[] }>()
      .then((response) => response.data)
  }

  /**
   * Gets an IG Container.
   *
   * @param {string} containerId - The Instagram container ID.
   * @param {string[]} fields - The list of fields to include in the response.
   *
   * @returns {Promise<types.IGContainer>} - The requested container data.
   */
  public async getContainer(
    containerId: number,
    fields: string[]
  ): Promise<types.IGContainer> {
    return this.api
      .get(`${containerId}?fields=${fields.join(',')}`)
      .json<types.IGContainer>()
  }

  /**
   * Get a hashtag's ID.
   *
   * @param {number} userId - The user ID.
   * @param {string} hashtagName - The name of the hashtag.
   *
   * @return {Promise<number>} - The ID of the hashtag.
   */
  public async getHashtagId(
    userId: number,
    hashtagName: string
  ): Promise<number> {
    return this.api
      .get(`ig_hashtag_search?user_id=${userId}?q=${hashtagName}`)
      .json<{ data: { id: number }[] }>()
      .then((response) => response.data[0].id)
  }

  /**
   * Gets information about an Instagram hashtag.
   *
   * @param {string} hashtagId - The ID of the Instagram hashtag.
   * @param {string[]} fields - The list of fields to include in the response.
   *
   * @returns {Promise<IGHashtag>} - An object containing information about the Instagram hashtag.
   */
  public async getHashtag(
    hashtagId: string,
    fields: string[] = ['id', 'name']
  ): Promise<types.IGHashtag> {
    return this.api
      .get(`${hashtagId}?fields=${fields.join(',')}`)
      .json<types.IGHashtag>()
  }

  /**
   * Gets the most recently published photo and video IG Media objects that have been tagged with a specific hashtag.
   *
   * @param {string} hashtagId - The ID of the Instagram hashtag.
   * @param {number} userId - The ID of the IG User performing the query.
   * @param {string[]} fields - The list of fields to include in the response.
   *
   * @returns {Promise<types.IGHashtagRecentMedia[]>} - An array of objects containing information about the most recently published photo and video IG Media objects that have been tagged with the specified hashtag.
   */
  public async getHashtagRecentMedia(
    hashtagId: string,
    userId: number,
    fields: string[] = ['id']
  ): Promise<types.IGHashtagRecentMedia[]> {
    return this.api
      .get(
        `${hashtagId}/recent_media?user_id=${userId}&fields=${fields.join(',')}`
      )
      .json<{ data: types.IGHashtagRecentMedia[] }>()
      .then((response) => response.data)
  }

  /**
   * Retrieves the most popular media objects tagged with a hashtag.
   * @param userId The ID of the Instagram Business or Creator Account performing the query.
   * @param hashtagId The IG hashtag id to get the top media.
   * @param fields An array of fields to return.
   * @returns An array of IG Media objects.
   */
  public async getTopHashtagMedia(
    userId: number,
    hashtagId: number,
    fields: string[]
  ) {
    return this.api
      .get(
        `${hashtagId}/top_media?user_id=${userId}&fields=${fields.join(',')}`
      )
      .json()
  }

  /**
   * Gets IG Media information.
   * @param {number} mediaId IG Media ID.
   * @param fields An array of fields to return.
   * @returns {IGMedia} IG Media information.
   */
  public async getIgMedia(mediaId: number, fields: string[]) {
    return this.api.get(`${mediaId}?fields=${fields.join(',')}`).json()
  }

  /**
   * Enable or disable comments on an IG Media.
   * @param {number} mediaId  IG Media ID.
   * @param {boolean} commentEnabled  Set to true to enable comments or false to disable comments.
   * @returns {Object} Result of the request.
   */
  public async updateComments(mediaId: number, commentEnabled: boolean) {
    return this.api.post(`${mediaId}?comment_enabled=${commentEnabled}`).json()
  }

  /**
   * Creates an IG Comment on an IG Media object.
   * @param mediaId The ID of the IG Media object to comment on
   * @param message The text to be included in the comment
   */
  public async createComment(mediaId: number, message: string) {
    //const params = new URLSearchParams({message});
    return this.api
      .post(`${mediaId}/comments?message=${encodeURIComponent(message)}`)
      .json()
  }

  /**
   * Get comments on a Media Object
   * @param {number} mediaId - ID of the media object to get comments for
   * @returns {Object[]} array of comments on the media object
   */
  async getComments(mediaId: number) {
    return this.api.get(`${mediaId}/comments`).json()
  }

  /**
   * Get a collection of IG Media objects on an album IG Media.
   * @param {number} mediaId - ID of the media object to get comments for
   * @returns {Object[]} a list of IG Media objects on an album IG Media object.
   */
  async getChildren(mediaId: number) {
    return this.api.get(`${mediaId}/children`).json()
  }

  /**
   * Gets insights data on an IG Media object.
   * @param mediaId {number} IG Media ID.
   * @param metric {string[]} Comma-separated list of Metrics you want returned.
   * @param breakdown (optional) {string} Designates how to break down result set into subsets. See Breakdown.
   * @returns {Promise<object>} Returns a promise containing the response data.
   */
  async getMediaInsights(mediaId: number, metric: string[], breakdown: string) {
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
   * @param mediaId - Required. IG Media ID.
   * @param updatedTags - Updated tags
   * @example
   * ```
   * const mediaId = '123456789';
   * const updatedTags = [{...}, {...}];
   *
   * const ig = new InstagramGraphAPI({ accessToken: process.env.INSTAGRAM_ACCESS_TOKEN });
   * ig.createProductTags(mediaId, updatedTags);
   * ```
   */
  async createProductTags(mediaId: number, updatedTags: any[]) {
    return this.api
      .post(`${mediaId}/product_tags?updated_tags=${updatedTags}`)
      .json()
  }

  /**
   * Method to get a collection of product tags on an IG Media.
   * @param {string} mediaId - The IG Media ID.
   * @returns {object[]} An array of product tags on the IG Media.
   */
  async getProductTags(mediaId: string) {
    return this.api.get(`${mediaId}/product_tags`).json()
  }

  /**
   * Delete product tags on an existing IG Media.
   *
   * @param mediaId {number} - The IG Media ID.
   * @param deletedTags {Array.<{merchant_id: number, product_id: number}>} - An array containing the info for each product tag to be deleted.
   *
   * @returns {Promise<{success: boolean}>} - Returns true if able to delete the specified product tags on the IG Media, otherwise returns false.
   */
  async deleteProductTags(
    mediaId: number,
    deletedTags: Array<{ merchant_id: number; product_id: number }>
  ): Promise<{
    success: boolean
  }> {
    return this.api
      .delete(
        `${mediaId}/product_tags?deleted_tags=${JSON.stringify(deletedTags)}`
      )
      .json()
  }

  /**
   * Gets data for an Instagram Business or Creator Account.
   *
   * @param userId - The ID of the Instagram Business or Creator Account to get data for.
   * @param accessToken - A User access token with the required permissions.
   * @param fields - An array of fields to retrieve for the Instagram Business or Creator Account. Defaults to all available fields.
   *
   * @returns An object containing data for the specified Instagram Business or Creator Account.
   */
  async getIgUserData(
    userId: string,
    accessToken: string,
    fields: string[] = []
  ): Promise<{
    biography?: string
    id?: string
    ig_id?: string
    followers_count?: number
    follows_count?: number
    media_count?: number
  }> {
    return this.api
      .get(`${userId}?fields=${fields.join(',')}&access_token=${accessToken}`)
      .json()
  }

  /**
   * Get the product catalog in an IG User's Instagram Shop.
   * @param {number} userId The app user's app-scoped user ID.
   * @param {string} fields Comma-separated list of catalog fields you want returned for each catalog in the result set.
   * @returns {Object} A JSON-formatted object containing the data requested.
   */
  async getAvailableCatalogs(userId: number, fields: string[]) {
    return this.api
      .get(`${userId}/available_catalogs?fields=${fields.join(',')}`)
      .json()
  }

  /**
   * Get data about another Instagram Business or Creator IG User.
   * @param {string} username - The username of the Instagram Business or Creator IG User you want to get data about
   * @param {IGUserBusinessDiscoveryData[]} [fields] - An array of fields to include in the API response
   * @returns {Promise<IGUserBusinessDiscoveryData>} The data about the targeted IG User
   */
  async getBusinessData(username: string, fields: string[]) {
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
   * @param {string} userId - app user's app-scoped user ID
   * @param {string} catalogId - ID of the catalog to search
   * @param {string} q - string to search for in each product's name or SKU number
   * @returns {Object} A JSON-formatted object containing an array of tag-eligible products and their metadata.
   */
  async searchProducts(userId: number, catalogId: number, q: string) {
    return this.api
      .get(`${userId}/catalog_product_search?catalog_id=${catalogId}&q=${q}`)
      .json()
  }

  /**
   * Get the number of times an IG User has published an IG Container within a given time period.
   * @param userId The IG User ID.
   * @param since A Unix timestamp no older than 24 hours (optional).
   * @param fields A comma-separated list of fields you want returned. If omitted, quota_usage will be returned by default.
   * @returns The number of times the app user has published an IG Container since the time specified in the since parameter. If the since parameter is omitted, this value will be the number of times the app user has published a container within the last 24 hours.
   */
  async getPublishingLimit(
    userId: number,
    since: number,
    fields: string[] = ['quota_usage']
  ): Promise<types.PublishingLimitResponse> {
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
   * @param {number} userId - The IG User ID.
   * @param {string[]} metrics - A comma-separated list of Metrics you want returned.
   * @param {string} period - A Period that is compatible with the metrics you are requesting.
   * @param {number} since - Unix timestamp used in conjunction with 'until' to define a Range.
   * @param {number} until - Unix timestamp used in conjunction with 'since' to define a Range.
   */
  async getUserInsights(
    userId: number,
    metrics: string[],
    period: string,
    since?: number,
    until?: number
  ) {
    return this.api
      .get(
        `${userId}/insights?metric=${metrics.join(',')}&period=${period}${
          since && until ? '&since=' + since + '&until=' + until : ''
        }`
      )
      .json()
  }

  /**
   * Get a collection of live video IG Media on an IG User.
   *
   * @param {number} userId        App user's app-scoped user ID.
   * @param {string[]} [fields]    An array of IG Media fields you want returned for each live IG Media in the result set.
   * @param {Date | number} [since]       A Unix timestamp or strtotime data value that points to the start of a range of time-based data.
   * @param {Date | number} [until]       A Unix timestamp or strtotime data value that points to the end of a range of time-based data.
   *
   * @returns {Promise<Array>}     An array of IG Media objects on an IG User.
   */
  async getLiveMedia(
    userId: number,
    fields: string[] = [],
    since?: Date | number,
    until?: Date | number
  ) {
    return this.api
      .get(
        `${userId}/live_media?fields=${fields.join(',')}${
          since && until ? '&since=' + since + '&until=' + until : ''
        }`
      )
      .json()
  }

  /**
   * Create an Instagram Container to be used in a post publishing process.
   *
   * @param {number} userId - The app user's app-scoped user ID.
   * @param {string} mediaType - The type of container being created. Should be either VIDEO, CAROUSEL, or REELS.
   * @param {string} imageUrl - Required for images. The path to the image.
   * @param {string} videoUrl - Required for videos and reels. Path to the video.
   * @param {string} caption - A caption for the image, video, or carousel. Can include hashtags and usernames of Instagram users.
   * @param {string} locationId - The ID of a Page associated with a location that you want to tag the image or video with.
   * @param {boolean} isCarouselItem - Indicates if the image or video appears in a carousel.
   * @param {string} thumbOffset - For videos and reels. Location, in milliseconds, of the video or reel frame to be used as the cover thumbnail image.
   * @param {object[]} userTags - An array of public usernames and x/y coordinates for any public Instagram users who you want to tag in the image.
   * @param {object[]} productTags - An array of objects specifying which product tags to tag the image or video with.
   * @param {string} coverUrl - For Reels only. The path to an image to use as the cover image for the Reels tab.
   * @param {boolean} shareToFeed - For Reels only. When true, indicates that the reel can appear in both the Feed and Reels tabs.
   * @param {object[]} children - An array of up to 10 container IDs of each image and video that should appear in the published carousel.
   *
   * @returns {Object} - A JSON-formatted object containing an IG Container ID which you can use to publish the container.
   */
  async createMedia(
    userId: number,
    caption?: string,
    children?: string[],
    coverUrl?: string,
    imageUrl?: string,
    isCarouselItem?: boolean,
    locationId?: number,
    mediaType?: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM' | 'REEL',
    productTags?: {
      product_id: string
      x?: number
      y?: number
    }[],
    shareToFeed?: boolean,
    thumbOffset?: number,
    userTags?: {
      username: string
      x: number
      y: number
    }[],
    videoUrl?: string
  ): Promise<{
    id: string
  }> {
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
   * @param igUserId The ID of the IG User
   */
  async getUserMedia(igUserId: number) {
    return this.api.get(`${igUserId}/media`).json()
  }

  /**
   * Get all IG Media on an IG User.
   *
   * @param igUserId The ID of the Instagram Business IG User
   * @param creationId The ID of the IG Container object to publish
   *
   * @returns A Promise that resolves to an object containing the ID of the newly published media object.
   */
  async publishContainer(
    userId: number,
    creationId: number
  ): Promise<{ id: string }> {
    return this.api
      .post(`${userId}/media_publish?creation_id=${creationId}`)
      .json()
  }
  /**
   * Creates an IG Comment on an IG Media object or IG Comment in which an IG User has been @mentioned.
   *
   * @param igUserId The ID of the IG User
   * @param mediaId The media ID contained in the Webhook notification payload
   * @param message The text to include in the comment
   * @param accessToken The app user's User Access Token.
   * @param commentId (optional) The ID of the IG Comment to reply to. If omitted, the comment will be created on the specified media object.
   *
   * @returns A Promise that resolves to an object containing the ID of the newly created comment.
   */
  async createMention(
    mediaId: number,
    commentId: number,
    message: string
  ): Promise<{ id: string }> {
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
   * @param igUserId The ID of the IG User
   * @param commentId The ID of the IG Comment in which the IG User has been @mentioned. The ID is included in the Webhook notification payload.
   * @param fields A comma-separated list of IG Comment Fields you want returned. If omitted, default fields will be returned.
   *
   */
  async getMentionedComment(
    userId: number,
    commentId: number,
    fields: string[] = []
  ): Promise<types.MentionedCommentResponse> {
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
   * @param igUserId The ID of the IG User
   * @param mediaId The ID of the IG Media in which the IG User has been @mentioned
   * @param fields A comma-separated list of IG Media Fields to return (default: all fields)
   *
   * @returns An object containing data on the mentioned media
   */
  async getMentionedMedia(
    userId: number,
    mediaId: number,
    fields: string[] = []
  ): Promise<types.MentionedMedia> {
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
   * @param igUserId The ID of the IG User
   * @param appealReason Explanation of why the product should be approved
   * @param productId The ID of the product to appeal
   *
   * @returns An object indicating success or failure. Response does not indicate appeal outcome.
   */
  async appealRejectedProduct(
    igUserId: string,
    appealReason: string,
    productId: string
  ): Promise<{ success: boolean }> {
    return this.api
      .post(
        `${igUserId}/product_appeal?appeal_reason=${appealReason}&product_id=${productId}`
      )
      .json()
  }

  /**
   * Get appeal status of a rejected product for an Instagram user
   *
   * @param igUserId The ID of the IG User
   * @param productId The ID of the product to check
   *
   * @returns An array of appeal status metadata
   */
  async getProductAppealStatus(
    userId: number,
    productId: number
  ): Promise<types.ProductAppealStatusResponse> {
    return this.api
      .get(`${userId}/product_appeal?product_id=${productId}}}`)
      .json()
  }

  /**
   * Get the hashtags that an IG User has queried using the IG Hashtags endpoint within the last 7 days.
   *
   * @param igUserId The ID of the IG User
   * @param limit The number of results to return per page (max: 30)
   *
   * @returns An array of hashtag IDs
   */
  async getRecentlySearchedHashtags(
    userId: number,
    limit: number = 25
  ): Promise<{ data: { id: string }[] }> {
    return this.api
      .get(`${userId}/recently_searched_hashtags?limit=${limit}`)
      .json()
  }

  /**
   * Represents a collection of story IG Media objects on an IG User.
   *
   * @param userId - The ID of the IG User to get stories for.
   *
   * @returns A list of story IG Media objects on an IG User.
   */
  async getStories(userId: number): Promise<{ data: { id: string }[] }> {
    return this.api.get(`${userId}/stories`).json()
  }

  /**
   * Gets the list of IG Media objects in which an IG User has been tagged by another Instagram user.
   *
   * @param {number} userId The ID of the Instagram User to be queried.
   * @param {string} fields Comma-separated list of IG Media Fields you want returned.
   *
   * @returns {Promise<{types.TaggedMediaResponse[]}>} Returns a Promise that resolves with the IG Media objects.
   */
  async getTaggedMedia(
    userId: number,
    fields: string[] = []
  ): Promise<types.TaggedMediaResponse[]> {
    return this.api.get(`${userId}/tags?fields=${fields.join(',')}`).json()
  }

  /**
   * Gets the Instagram Business Account connected to a Facebook Page.
   *
   * @param pageId - The ID of the Facebook Page to get the connected Instagram Business Account for.
   *
   * @returns {Promise<{ instagram_business_account: { id: string } }>} The Instagram Business Account connected to the Facebook Page.
   */
  async getPageIGUser(
    userId: number,
    fields: string[] = ['instagram_business_account']
  ): Promise<{ instagram_business_account: { id: string } }> {
    return this.api.get(`${userId}?fields=${fields.join(',')}`).json()
  }
}
