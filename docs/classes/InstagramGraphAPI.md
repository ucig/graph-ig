[graph-ig](../README.md) / [Exports](../modules.md) / InstagramGraphAPI

# Class: InstagramGraphAPI

## Table of contents

### Constructors

- [constructor](InstagramGraphAPI.md#constructor)

### Properties

- [accessToken](InstagramGraphAPI.md#accesstoken)
- [api](InstagramGraphAPI.md#api)
- [baseUrl](InstagramGraphAPI.md#baseurl)
- [debug](InstagramGraphAPI.md#debug)

### Methods

- [appealRejectedProduct](InstagramGraphAPI.md#appealrejectedproduct)
- [createComment](InstagramGraphAPI.md#createcomment)
- [createMedia](InstagramGraphAPI.md#createmedia)
- [createMention](InstagramGraphAPI.md#createmention)
- [createProductTags](InstagramGraphAPI.md#createproducttags)
- [deleteComment](InstagramGraphAPI.md#deletecomment)
- [deleteProductTags](InstagramGraphAPI.md#deleteproducttags)
- [getAvailableCatalogs](InstagramGraphAPI.md#getavailablecatalogs)
- [getBusinessData](InstagramGraphAPI.md#getbusinessdata)
- [getChildren](InstagramGraphAPI.md#getchildren)
- [getCommentById](InstagramGraphAPI.md#getcommentbyid)
- [getCommentReplies](InstagramGraphAPI.md#getcommentreplies)
- [getComments](InstagramGraphAPI.md#getcomments)
- [getContainer](InstagramGraphAPI.md#getcontainer)
- [getHashtag](InstagramGraphAPI.md#gethashtag)
- [getHashtagId](InstagramGraphAPI.md#gethashtagid)
- [getHashtagRecentMedia](InstagramGraphAPI.md#gethashtagrecentmedia)
- [getIgMedia](InstagramGraphAPI.md#getigmedia)
- [getIgUserData](InstagramGraphAPI.md#getiguserdata)
- [getLiveMedia](InstagramGraphAPI.md#getlivemedia)
- [getMediaInsights](InstagramGraphAPI.md#getmediainsights)
- [getMentionedComment](InstagramGraphAPI.md#getmentionedcomment)
- [getMentionedMedia](InstagramGraphAPI.md#getmentionedmedia)
- [getPageIGUser](InstagramGraphAPI.md#getpageiguser)
- [getProductAppealStatus](InstagramGraphAPI.md#getproductappealstatus)
- [getProductTags](InstagramGraphAPI.md#getproducttags)
- [getPublishingLimit](InstagramGraphAPI.md#getpublishinglimit)
- [getRecentlySearchedHashtags](InstagramGraphAPI.md#getrecentlysearchedhashtags)
- [getStories](InstagramGraphAPI.md#getstories)
- [getTaggedMedia](InstagramGraphAPI.md#gettaggedmedia)
- [getTopHashtagMedia](InstagramGraphAPI.md#gettophashtagmedia)
- [getUserInsights](InstagramGraphAPI.md#getuserinsights)
- [getUserMedia](InstagramGraphAPI.md#getusermedia)
- [publishContainer](InstagramGraphAPI.md#publishcontainer)
- [replyToComment](InstagramGraphAPI.md#replytocomment)
- [searchProducts](InstagramGraphAPI.md#searchproducts)
- [updateCommentVisibility](InstagramGraphAPI.md#updatecommentvisibility)
- [updateComments](InstagramGraphAPI.md#updatecomments)

## Constructors

### constructor

• **new InstagramGraphAPI**(`config`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `config` | [`Config`](../modules.md#config) |

#### Defined in

[graph-api.ts:10](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L10)

## Properties

### accessToken

• `Private` **accessToken**: `string`

#### Defined in

[graph-api.ts:5](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L5)

___

### api

• `Private` **api**: `Got`

#### Defined in

[graph-api.ts:7](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L7)

___

### baseUrl

• `Private` **baseUrl**: `string`

#### Defined in

[graph-api.ts:6](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L6)

___

### debug

• `Private` **debug**: `boolean`

#### Defined in

[graph-api.ts:8](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L8)

## Methods

### appealRejectedProduct

▸ **appealRejectedProduct**(`igUserId`, `appealReason`, `productId`): `Promise`<{ `success`: `boolean`  }\>

Appeal a rejected product for an Instagram user

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `igUserId` | `string` | The ID of the IG User |
| `appealReason` | `string` | Explanation of why the product should be approved |
| `productId` | `string` | The ID of the product to appeal |

#### Returns

`Promise`<{ `success`: `boolean`  }\>

An object indicating success or failure. Response does not indicate appeal outcome.

#### Defined in

[graph-api.ts:629](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L629)

___

### createComment

▸ **createComment**(`mediaId`, `message`): `Promise`<`unknown`\>

Creates an IG Comment on an IG Media object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mediaId` | `number` | The ID of the IG Media object to comment on |
| `message` | `string` | The text to be included in the comment |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[graph-api.ts:234](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L234)

___

### createMedia

▸ **createMedia**(`userId`, `caption?`, `children?`, `coverUrl?`, `imageUrl?`, `isCarouselItem?`, `locationId?`, `mediaType?`, `productTags?`, `shareToFeed?`, `thumbOffset?`, `userTags?`, `videoUrl?`): `Promise`<{ `id`: `string`  }\>

Create an Instagram Container to be used in a post publishing process.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `number` | The app user's app-scoped user ID. |
| `caption?` | `string` | A caption for the image, video, or carousel. Can include hashtags and usernames of Instagram users. |
| `children?` | `string`[] | An array of up to 10 container IDs of each image and video that should appear in the published carousel. |
| `coverUrl?` | `string` | For Reels only. The path to an image to use as the cover image for the Reels tab. |
| `imageUrl?` | `string` | Required for images. The path to the image. |
| `isCarouselItem?` | `boolean` | Indicates if the image or video appears in a carousel. |
| `locationId?` | `number` | The ID of a Page associated with a location that you want to tag the image or video with. |
| `mediaType?` | ``"IMAGE"`` \| ``"VIDEO"`` \| ``"CAROUSEL_ALBUM"`` \| ``"REEL"`` | The type of container being created. Should be either VIDEO, CAROUSEL, or REELS. |
| `productTags?` | { `product_id`: `string` ; `x?`: `number` ; `y?`: `number`  }[] | An array of objects specifying which product tags to tag the image or video with. |
| `shareToFeed?` | `boolean` | For Reels only. When true, indicates that the reel can appear in both the Feed and Reels tabs. |
| `thumbOffset?` | `number` | For videos and reels. Location, in milliseconds, of the video or reel frame to be used as the cover thumbnail image. |
| `userTags?` | { `username`: `string` ; `x`: `number` ; `y`: `number`  }[] | An array of public usernames and x/y coordinates for any public Instagram users who you want to tag in the image. |
| `videoUrl?` | `string` | Required for videos and reels. Path to the video. |

#### Returns

`Promise`<{ `id`: `string`  }\>

- A JSON-formatted object containing an IG Container ID which you can use to publish the container.

#### Defined in

[graph-api.ts:481](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L481)

___

### createMention

▸ **createMention**(`mediaId`, `commentId`, `message`): `Promise`<{ `id`: `string`  }\>

Creates an IG Comment on an IG Media object or IG Comment in which an IG User has been @mentioned.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mediaId` | `number` | The media ID contained in the Webhook notification payload |
| `commentId` | `number` | (optional) The ID of the IG Comment to reply to. If omitted, the comment will be created on the specified media object. |
| `message` | `string` | The text to include in the comment |

#### Returns

`Promise`<{ `id`: `string`  }\>

A Promise that resolves to an object containing the ID of the newly created comment.

#### Defined in

[graph-api.ts:561](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L561)

___

### createProductTags

▸ **createProductTags**(`mediaId`, `updatedTags`): `Promise`<`unknown`\>

Represents product tags on an IG Media. See Product Tagging guide for complete usage details.

**`Example`**

```
const mediaId = '123456789';
const updatedTags = [{...}, {...}];

const ig = new InstagramGraphAPI({ accessToken: process.env.INSTAGRAM_ACCESS_TOKEN });
ig.createProductTags(mediaId, updatedTags);
```

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mediaId` | `number` | Required. IG Media ID. |
| `updatedTags` | `any`[] | Updated tags |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[graph-api.ts:289](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L289)

___

### deleteComment

▸ **deleteComment**(`commentId`): `Promise`<`boolean`\>

Deletes a comment on an IG Media.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `commentId` | `number` | The Instagram comment ID. |

#### Returns

`Promise`<`boolean`\>

- The success status of the operation.

#### Defined in

[graph-api.ts:75](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L75)

___

### deleteProductTags

▸ **deleteProductTags**(`mediaId`, `deletedTags`): `Promise`<{ `success`: `boolean`  }\>

Delete product tags on an existing IG Media.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mediaId` | `number` | {number} - The IG Media ID. |
| `deletedTags` | { `merchant_id`: `number` ; `product_id`: `number`  }[] | {Array.<{merchant_id: number, product_id: number}>} - An array containing the info for each product tag to be deleted. |

#### Returns

`Promise`<{ `success`: `boolean`  }\>

- Returns true if able to delete the specified product tags on the IG Media, otherwise returns false.

#### Defined in

[graph-api.ts:312](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L312)

___

### getAvailableCatalogs

▸ **getAvailableCatalogs**(`userId`, `fields`): `Promise`<`unknown`\>

Get the product catalog in an IG User's Instagram Shop.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `number` | The app user's app-scoped user ID. |
| `fields` | `string`[] | Comma-separated list of catalog fields you want returned for each catalog in the result set. |

#### Returns

`Promise`<`unknown`\>

A JSON-formatted object containing the data requested.

#### Defined in

[graph-api.ts:357](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L357)

___

### getBusinessData

▸ **getBusinessData**(`username`, `fields?`): `Promise`<`unknown`\>

Get data about another Instagram Business or Creator IG User.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `username` | `string` | The username of the Instagram Business or Creator IG User you want to get data about |
| `fields?` | `string`[] | An array of fields to include in the API response |

#### Returns

`Promise`<`unknown`\>

The data about the targeted IG User

#### Defined in

[graph-api.ts:369](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L369)

___

### getChildren

▸ **getChildren**(`mediaId`): `Promise`<`unknown`\>

Get a collection of IG Media objects on an album IG Media.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mediaId` | `number` | ID of the media object to get comments for |

#### Returns

`Promise`<`unknown`\>

a list of IG Media objects on an album IG Media object.

#### Defined in

[graph-api.ts:255](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L255)

___

### getCommentById

▸ **getCommentById**(`commentId`, `fields`): `Promise`<[`IGComment`](../modules.md#igcomment)\>

Gets a comment from the Instagram API.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `commentId` | `number` | The Instagram comment ID. |
| `fields` | `string`[] | The list of fields to include in the response. |

#### Returns

`Promise`<[`IGComment`](../modules.md#igcomment)\>

- The requested comment data.

#### Defined in

[graph-api.ts:41](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L41)

___

### getCommentReplies

▸ **getCommentReplies**(`commentId`): `Promise`<[`IGCommentReply`](../interfaces/IGCommentReply.md)[]\>

Gets all replies to a comment on an IG Media.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `commentId` | `number` | The Instagram comment ID. |

#### Returns

`Promise`<[`IGCommentReply`](../interfaces/IGCommentReply.md)[]\>

- The list of comment replies.

#### Defined in

[graph-api.ts:107](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L107)

___

### getComments

▸ **getComments**(`mediaId`): `Promise`<`unknown`\>

Get comments on a Media Object

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mediaId` | `number` | ID of the media object to get comments for |

#### Returns

`Promise`<`unknown`\>

array of comments on the media object

#### Defined in

[graph-api.ts:246](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L246)

___

### getContainer

▸ **getContainer**(`containerId`, `fields`): `Promise`<[`IGContainer`](../interfaces/IGContainer.md)\>

Gets an IG Container.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `containerId` | `number` | The Instagram container ID. |
| `fields` | `string`[] | The list of fields to include in the response. |

#### Returns

`Promise`<[`IGContainer`](../interfaces/IGContainer.md)\>

- The requested container data.

#### Defined in

[graph-api.ts:124](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L124)

___

### getHashtag

▸ **getHashtag**(`hashtagId`, `fields?`): `Promise`<[`IGHashtag`](../interfaces/IGHashtag.md)\>

Gets information about an Instagram hashtag.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hashtagId` | `string` | The ID of the Instagram hashtag. |
| `fields` | `string`[] | The list of fields to include in the response. |

#### Returns

`Promise`<[`IGHashtag`](../interfaces/IGHashtag.md)\>

- An object containing information about the Instagram hashtag.

#### Defined in

[graph-api.ts:159](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L159)

___

### getHashtagId

▸ **getHashtagId**(`userId`, `hashtagName`): `Promise`<`number`\>

Get a hashtag's ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `number` | The user ID. |
| `hashtagName` | `string` | The name of the hashtag. |

#### Returns

`Promise`<`number`\>

- The ID of the hashtag.

#### Defined in

[graph-api.ts:141](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L141)

___

### getHashtagRecentMedia

▸ **getHashtagRecentMedia**(`hashtagId`, `userId`, `fields?`): `Promise`<[`IGHashtagRecentMedia`](../interfaces/IGHashtagRecentMedia.md)[]\>

Gets the most recently published photo and video IG Media objects that have been tagged with a specific hashtag.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `hashtagId` | `string` | The ID of the Instagram hashtag. |
| `userId` | `number` | The ID of the IG User performing the query. |
| `fields` | `string`[] | The list of fields to include in the response. |

#### Returns

`Promise`<[`IGHashtagRecentMedia`](../interfaces/IGHashtagRecentMedia.md)[]\>

- An array of objects containing information about the most recently published photo and video IG Media objects that have been tagged with the specified hashtag.

#### Defined in

[graph-api.ts:177](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L177)

___

### getIgMedia

▸ **getIgMedia**(`mediaId`, `fields`): `Promise`<`unknown`\>

Gets IG Media information.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mediaId` | `number` | IG Media ID. |
| `fields` | `string`[] | An array of fields to return. |

#### Returns

`Promise`<`unknown`\>

IG Media information.

#### Defined in

[graph-api.ts:215](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L215)

___

### getIgUserData

▸ **getIgUserData**(`userId`, `accessToken`, `fields?`): `Promise`<{ `biography?`: `string` ; `followers_count?`: `number` ; `follows_count?`: `number` ; `id?`: `string` ; `ig_id?`: `string` ; `media_count?`: `number`  }\>

Gets data for an Instagram Business or Creator Account.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `userId` | `string` | `undefined` | The ID of the Instagram Business or Creator Account to get data for. |
| `accessToken` | `string` | `undefined` | A User access token with the required permissions. |
| `fields` | `string`[] | `[]` | An array of fields to retrieve for the Instagram Business or Creator Account. Defaults to all available fields. |

#### Returns

`Promise`<{ `biography?`: `string` ; `followers_count?`: `number` ; `follows_count?`: `number` ; `id?`: `string` ; `ig_id?`: `string` ; `media_count?`: `number`  }\>

An object containing data for the specified Instagram Business or Creator Account.

#### Defined in

[graph-api.ts:334](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L334)

___

### getLiveMedia

▸ **getLiveMedia**(`userId`, `fields?`, `since?`, `until?`): `Promise`<`unknown`\>

Get a collection of live video IG Media on an IG User.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `userId` | `number` | `undefined` | App user's app-scoped user ID. |
| `fields?` | `string`[] | `[]` | An array of IG Media fields you want returned for each live IG Media in the result set. |
| `since?` | `number` \| `Date` | `undefined` | A Unix timestamp or strtotime data value that points to the start of a range of time-based data. |
| `until?` | `number` \| `Date` | `undefined` | A Unix timestamp or strtotime data value that points to the end of a range of time-based data. |

#### Returns

`Promise`<`unknown`\>

An array of IG Media objects on an IG User.

#### Defined in

[graph-api.ts:447](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L447)

___

### getMediaInsights

▸ **getMediaInsights**(`mediaId`, `metric`, `breakdown`): `Promise`<`unknown`\>

Gets insights data on an IG Media object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mediaId` | `number` | {number} IG Media ID. |
| `metric` | `string`[] | {string[]} Comma-separated list of Metrics you want returned. |
| `breakdown` | `string` | (optional) {string} Designates how to break down result set into subsets. See Breakdown. |

#### Returns

`Promise`<`unknown`\>

Returns a promise containing the response data.

#### Defined in

[graph-api.ts:266](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L266)

___

### getMentionedComment

▸ **getMentionedComment**(`userId`, `commentId`, `fields?`): `Promise`<[`MentionedCommentResponse`](../interfaces/MentionedCommentResponse.md)\>

Returns data on an IG Comment in which an IG User has been

**`Mentioned`**

by another Instagram user.\

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `userId` | `number` | `undefined` | - |
| `commentId` | `number` | `undefined` | The ID of the IG Comment in which the IG User has been @mentioned. The ID is included in the Webhook notification payload. |
| `fields` | `string`[] | `[]` | A comma-separated list of IG Comment Fields you want returned. If omitted, default fields will be returned. |

#### Returns

`Promise`<[`MentionedCommentResponse`](../interfaces/MentionedCommentResponse.md)\>

#### Defined in

[graph-api.ts:583](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L583)

___

### getMentionedMedia

▸ **getMentionedMedia**(`userId`, `mediaId`, `fields?`): `Promise`<[`MentionedMedia`](../interfaces/MentionedMedia.md)\>

Get data on an IG Media in which an IG User has been

**`Mentioned`**

in a caption by another Instagram user

**`Mentioned`**

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `userId` | `number` | `undefined` | - |
| `mediaId` | `number` | `undefined` | The ID of the IG Media in which the IG User has been |
| `fields` | `string`[] | `[]` | A comma-separated list of IG Media Fields to return (default: all fields) |

#### Returns

`Promise`<[`MentionedMedia`](../interfaces/MentionedMedia.md)\>

An object containing data on the mentioned media

#### Defined in

[graph-api.ts:606](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L606)

___

### getPageIGUser

▸ **getPageIGUser**(`userId`, `fields?`): `Promise`<{ `instagram_business_account`: { `id`: `string`  }  }\>

Gets the Instagram Business Account connected to a Facebook Page.

#### Parameters

| Name | Type |
| :------ | :------ |
| `userId` | `number` |
| `fields` | `string`[] |

#### Returns

`Promise`<{ `instagram_business_account`: { `id`: `string`  }  }\>

The Instagram Business Account connected to the Facebook Page.

#### Defined in

[graph-api.ts:708](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L708)

___

### getProductAppealStatus

▸ **getProductAppealStatus**(`userId`, `productId`): `Promise`<[`ProductAppealStatusResponse`](../interfaces/ProductAppealStatusResponse.md)\>

Get appeal status of a rejected product for an Instagram user

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `number` | - |
| `productId` | `number` | The ID of the product to check |

#### Returns

`Promise`<[`ProductAppealStatusResponse`](../interfaces/ProductAppealStatusResponse.md)\>

An array of appeal status metadata

#### Defined in

[graph-api.ts:649](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L649)

___

### getProductTags

▸ **getProductTags**(`mediaId`): `Promise`<`unknown`\>

Method to get a collection of product tags on an IG Media.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mediaId` | `string` | The IG Media ID. |

#### Returns

`Promise`<`unknown`\>

An array of product tags on the IG Media.

#### Defined in

[graph-api.ts:300](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L300)

___

### getPublishingLimit

▸ **getPublishingLimit**(`userId`, `since`, `fields?`): `Promise`<[`PublishingLimitResponse`](../interfaces/PublishingLimitResponse.md)\>

Get the number of times an IG User has published an IG Container within a given time period.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `number` | The IG User ID. |
| `since` | `number` | A Unix timestamp no older than 24 hours (optional). |
| `fields` | `string`[] | A comma-separated list of fields you want returned. If omitted, quota_usage will be returned by default. |

#### Returns

`Promise`<[`PublishingLimitResponse`](../interfaces/PublishingLimitResponse.md)\>

The number of times the app user has published an IG Container since the time specified in the since parameter. If the since parameter is omitted, this value will be the number of times the app user has published a container within the last 24 hours.

#### Defined in

[graph-api.ts:399](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L399)

___

### getRecentlySearchedHashtags

▸ **getRecentlySearchedHashtags**(`userId`, `limit?`): `Promise`<{ `data`: { `id`: `string`  }[]  }\>

Get the hashtags that an IG User has queried using the IG Hashtags endpoint within the last 7 days.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `userId` | `number` | `undefined` | - |
| `limit` | `number` | `25` | The number of results to return per page (max: 30) |

#### Returns

`Promise`<{ `data`: { `id`: `string`  }[]  }\>

An array of hashtag IDs

#### Defined in

[graph-api.ts:666](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L666)

___

### getStories

▸ **getStories**(`userId`): `Promise`<{ `data`: { `id`: `string`  }[]  }\>

Represents a collection of story IG Media objects on an IG User.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `number` | The ID of the IG User to get stories for. |

#### Returns

`Promise`<{ `data`: { `id`: `string`  }[]  }\>

A list of story IG Media objects on an IG User.

#### Defined in

[graph-api.ts:682](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L682)

___

### getTaggedMedia

▸ **getTaggedMedia**(`userId`, `fields?`): `Promise`<[`TaggedMediaResponse`](../interfaces/TaggedMediaResponse.md)[]\>

Gets the list of IG Media objects in which an IG User has been tagged by another Instagram user.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `userId` | `number` | `undefined` | The ID of the Instagram User to be queried. |
| `fields` | `string`[] | `[]` | Comma-separated list of IG Media Fields you want returned. |

#### Returns

`Promise`<[`TaggedMediaResponse`](../interfaces/TaggedMediaResponse.md)[]\>

Returns a Promise that resolves with the IG Media objects.

#### Defined in

[graph-api.ts:694](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L694)

___

### getTopHashtagMedia

▸ **getTopHashtagMedia**(`userId`, `hashtagId`, `fields`): `Promise`<`unknown`\>

Retrieves the most popular media objects tagged with a hashtag.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `number` | The ID of the Instagram Business or Creator Account performing the query. |
| `hashtagId` | `number` | The IG hashtag id to get the top media. |
| `fields` | `string`[] | An array of fields to return. |

#### Returns

`Promise`<`unknown`\>

An array of IG Media objects.

#### Defined in

[graph-api.ts:197](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L197)

___

### getUserInsights

▸ **getUserInsights**(`userId`, `metrics`, `period`, `since?`, `until?`): `Promise`<`unknown`\>

Get insights on an IG User.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `number` | The IG User ID. |
| `metrics` | `string`[] | A comma-separated list of Metrics you want returned. |
| `period` | `string` | A Period that is compatible with the metrics you are requesting. |
| `since?` | `number` | Unix timestamp used in conjunction with 'until' to define a Range. |
| `until?` | `number` | Unix timestamp used in conjunction with 'since' to define a Range. |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[graph-api.ts:421](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L421)

___

### getUserMedia

▸ **getUserMedia**(`igUserId`): `Promise`<`unknown`\>

Get a collection of IG Media on an IG User.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `igUserId` | `number` | The ID of the IG User |

#### Returns

`Promise`<`unknown`\>

#### Defined in

[graph-api.ts:530](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L530)

___

### publishContainer

▸ **publishContainer**(`userId`, `creationId`): `Promise`<{ `id`: `string`  }\>

Get all IG Media on an IG User.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `number` | - |
| `creationId` | `number` | The ID of the IG Container object to publish |

#### Returns

`Promise`<{ `id`: `string`  }\>

A Promise that resolves to an object containing the ID of the newly published media object.

#### Defined in

[graph-api.ts:542](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L542)

___

### replyToComment

▸ **replyToComment**(`commentId`, `message`): `Promise`<`string`\>

Replies to a comment on an IG Media.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `commentId` | `number` | The Instagram comment ID. |
| `message` | `string` | The text to be included in the comment. |

#### Returns

`Promise`<`string`\>

- The ID of the created comment.

#### Defined in

[graph-api.ts:90](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L90)

___

### searchProducts

▸ **searchProducts**(`userId`, `catalogId`, `q`): `Promise`<`unknown`\>

A method to search for products and product variants in an IG User's Instagram Shop product catalog.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `userId` | `number` | app user's app-scoped user ID |
| `catalogId` | `number` | ID of the catalog to search |
| `q` | `string` | string to search for in each product's name or SKU number |

#### Returns

`Promise`<`unknown`\>

A JSON-formatted object containing an array of tag-eligible products and their metadata.

#### Defined in

[graph-api.ts:386](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L386)

___

### updateCommentVisibility

▸ **updateCommentVisibility**(`commentId`, `hide`): `Promise`<`boolean`\>

Hides or unhides a comment on an IG Media.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `commentId` | `number` | The Instagram comment ID. |
| `hide` | `boolean` | Set to true to hide the comment, or false to show the comment. |

#### Returns

`Promise`<`boolean`\>

- The success status of the operation.

#### Defined in

[graph-api.ts:58](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L58)

___

### updateComments

▸ **updateComments**(`mediaId`, `commentEnabled`): `Promise`<`unknown`\>

Enable or disable comments on an IG Media.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `mediaId` | `number` | IG Media ID. |
| `commentEnabled` | `boolean` | Set to true to enable comments or false to disable comments. |

#### Returns

`Promise`<`unknown`\>

Result of the request.

#### Defined in

[graph-api.ts:225](https://github.com/ucig/graph-ig/blob/ce5df35/src/graph-api.ts#L225)
