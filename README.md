# graph-ig

[![npm version](https://badge.fury.io/js/graph-ig.svg)](https://badge.fury.io/js/graph-ig)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

`graph-ig` helps you interact with the Instagram Graph API easily and efficiently. The library is still under development and not yet stable.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Creating an API client](#creating-an-api-client)
  - [Fetching a comment by ID](#fetching-a-comment-by-id)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install `graph-ig`, run the following command:

```bash
npm install graph-ig
```

## Usage

### Creating an API client

The `InstagramGraphAPI` class is the main interface for interacting with the Instagram Graph API. The configuration object should include an access token, a base URL, and a debug flag (optional). The access token is required to authenticate with the Instagram Graph API. If no base URL is provided, the default will be `https://graph.facebook.com/v16.0`. The debug flag, if set to `true`, will enable logging of request and response information.

```typescript
import { InstagramGraphAPI } from 'graph-ig'

const ig = new InstagramGraphAPI({
  accessToken: 'your-access-token',
  baseUrl: 'https://graph.facebook.com/v16.0',
  debug: true
})
```

### Fetching a comment by ID

To fetch a comment by its ID, use the `getCommentById` method. You can also provide an array of fields to include in the response.

```typescript
const commentId = 123456789
const fields = ['text', 'username']

ig.getCommentById({ commentId, fields })
  .then((comment) => {
    console.log(comment)
  })
  .catch((error) => {
    console.error('Error fetching comment:', error)
  })
```

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests on [GitHub](https://github.com/wldeh/graph-ig).

## License

`graph-ig` is licensed under the [MIT License](https://opensource.org/licenses/MIT).