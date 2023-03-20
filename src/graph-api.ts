import fetch from 'node-fetch'

import * as types from './types'

export class InstagramGraphAPI {
  private accessToken: string
  private baseUrl: string

  constructor(config: types.Config) {
    const { accessToken, baseUrl = 'https://graph.facebook.com/v15.0' } = config

    this.accessToken = accessToken
    this.baseUrl = baseUrl

    if (!accessToken) {
      throw new Error(
        'Missing Access Token. An access token is required to make requests to Instagram Graph API. Please provide one as a parameter when creating a new instance of InstagramGraphAPI or set the INSTAGRAM_ACCESS_TOKEN environment variable. You can obtain an access token by following the instructions in the Instagram Graph API documentation: https://developers.facebook.com/docs/facebook-login/guides/access-tokens#usertokens'
      )
    }
  }

  async postComment(mediaId: string, text: string) {
    const url = `${this.baseUrl}${mediaId}/comments`
    const data = {
      message: text,
      access_token: this.accessToken
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      return await response.json()
    } catch (error) {
      console.error(error)
    }
  }
}
