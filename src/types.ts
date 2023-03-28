export type Config = {
  accessToken: string
  baseUrl?: string
  debug?: boolean
}

export type IGComment = {
  from: {
    id: string
    username: string
  }
  hidden: boolean
  id: string
  like_count: number
  media: {
    id: string
    media_product_type: string
  }
  parent_id?: string
  replies?: IGComment[]
  text: string
  timestamp: string
  user?: string
  username: string
}

export interface IGCommentReply {
  timestamp: string
  text: string
  id: string
}

export interface IGContainer {
  id: string
  status?: string
  status_code?: 'EXPIRED' | 'ERROR' | 'FINISHED' | 'IN_PROGRESS' | 'PUBLISHED'
}

/**
 * Represents an Instagram hashtag.
 */
export interface IGHashtag {
  /** The hashtag's ID (included by default). IDs are static and global. */
  id: string
  /** The hashtag's name, without the leading hash symbol. */
  name: string
}

/**
 * Represents a collection of the most recently published photo and video IG Media objects that have been tagged with a hashtag.
 */
export interface IGHashtagRecentMedia {
  /** The ID of the media object. */
  id: string
  // Add other fields as needed
}

interface ProductAppealStatus {
  eligible_for_appeal: boolean
  product_id: string
  review_status:
    | 'approved'
    | 'rejected'
    | 'pending'
    | 'outdated'
    | ''
    | 'no_review'
}

export interface ProductAppealStatusResponse {
  data: ProductAppealStatus[]
}

export interface MentionedMedia {
  [key: string]: any
}

export interface MentionedCommentResponse {
  mentioned_comment: {
    timestamp: string
    like_count: number
    text: string
    id: string
  }
  id: string
}

export interface PublishingLimitResponse {
  data?: DataEntity[] | null
}
interface DataEntity {
  quota_usage: number
  config: Configure
}
interface Configure {
  quota_total: number
  quota_duration: number
}

export interface TaggedMediaResponse {
  id?: string
  media_type?: string
  media_url?: string
  permalink?: string
}
