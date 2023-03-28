import type { JsonObject } from 'type-fest'

/**
 * Options for customizing the behavior of an InstagramGraphApiError.
 */
interface InstagramGraphApiErrorOptions {
  /**
   * The error code returned by the Instagram Graph API.
   */
  code: number
  /**
   * The error type returned by the Instagram Graph API.
   */
  type: string
  /**
   * The Facebook trace ID for the error.
   */
  fbtrace_id: string
}

/**
 * An error thrown when a request to the Instagram Graph API fails.
 */
export class InstagramGraphApiError extends Error {
  /**
   * The error code returned by the Instagram Graph API.
   */
  public code: number
  /**
   * The error type returned by the Instagram Graph API.
   */
  public type: string
  /**
   * The Facebook trace ID for the error.
   */
  public fbtrace_id: string

  /**
   * Creates a new InstagramGraphApiError.
   *
   * @param message - The error message.
   * @param options - Options for customizing the behavior of the error.
   */
  constructor(message: string, options: InstagramGraphApiErrorOptions) {
    super(message)
    this.name = 'InstagramGraphApiError'
    this.code = options.code
    this.type = options.type
    this.fbtrace_id = options.fbtrace_id
  }
}
