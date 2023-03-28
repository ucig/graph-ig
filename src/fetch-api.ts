/**
 * Creates an instance of the `got` HTTP client with default settings and hooks for use with the Instagram Graph API.
 *
 * @param {types.Config} opts - The configuration options for the API instance.
 *
 * @returns {got} An instance of the `got` HTTP client.
 */
import got from 'got'

import * as types from './types'
import { InstagramGraphApiError } from './errors'

const DEFAULT_BASE_URL = 'https://graph.facebook.com/v16.0'

export function createApiClient(opts: types.Config) {
  return got.extend({
    prefixUrl: opts.baseUrl || DEFAULT_BASE_URL,
    timeout: 1000 * 120,
    headers: {
      'User-Agent': 'graph-ig',
      Authorization: `Bearer ${opts.accessToken}`
    },
    hooks: {
      beforeRequest: [
        (options) => {
          if (opts.debug) {
            options.context = { startTime: Date.now() }
            console.log(`Making request to ${options.url}`)
          }
        }
      ],
      afterResponse: [
        (response) => {
          if (opts.debug) {
            const elapsedTime =
              Date.now() -
              (response.request.options.context.startTime as number)
            console.log(
              `Received response from ${response.url} in ${elapsedTime}ms`
            )
          }
          return response
        }
      ],
      beforeError: [
        async (error) => {
          if (error instanceof got.HTTPError) {
            const response = error.response
            try {
              const body = JSON.parse((response as any).body)
              if (body.error) {
                return new InstagramGraphApiError(body.error.message, {
                  code: body.error.code,
                  type: body.error.type,
                  fbtrace_id: body.error.fbtrace_id
                })
              }
            } catch (e) {
              console.error('Failed reading HTTPError response body', e)
            }
          }
          return error
        }
      ]
    }
  })
}
