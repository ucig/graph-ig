[graph-ig](README.md) / Exports

# graph-ig

## Table of contents

### Classes

- [InstagramGraphAPI](classes/InstagramGraphAPI.md)

### Interfaces

- [IGCommentReply](interfaces/IGCommentReply.md)
- [IGContainer](interfaces/IGContainer.md)
- [IGHashtag](interfaces/IGHashtag.md)
- [IGHashtagRecentMedia](interfaces/IGHashtagRecentMedia.md)
- [MentionedCommentResponse](interfaces/MentionedCommentResponse.md)
- [MentionedMedia](interfaces/MentionedMedia.md)
- [ProductAppealStatusResponse](interfaces/ProductAppealStatusResponse.md)
- [PublishingLimitResponse](interfaces/PublishingLimitResponse.md)
- [TaggedMediaResponse](interfaces/TaggedMediaResponse.md)

### Type Aliases

- [Config](modules.md#config)
- [IGComment](modules.md#igcomment)

## Type Aliases

### Config

Ƭ **Config**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `accessToken` | `string` |
| `baseUrl?` | `string` |
| `debug?` | `boolean` |

#### Defined in

[types.ts:1](https://github.com/ucig/graph-ig/blob/ce5df35/src/types.ts#L1)

___

### IGComment

Ƭ **IGComment**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `from` | { `id`: `string` ; `username`: `string`  } |
| `from.id` | `string` |
| `from.username` | `string` |
| `hidden` | `boolean` |
| `id` | `string` |
| `like_count` | `number` |
| `media` | { `id`: `string` ; `media_product_type`: `string`  } |
| `media.id` | `string` |
| `media.media_product_type` | `string` |
| `parent_id?` | `string` |
| `replies?` | [`IGComment`](modules.md#igcomment)[] |
| `text` | `string` |
| `timestamp` | `string` |
| `user?` | `string` |
| `username` | `string` |

#### Defined in

[types.ts:7](https://github.com/ucig/graph-ig/blob/ce5df35/src/types.ts#L7)
