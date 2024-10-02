# @ezy/util

> Many convenient utility function packages that are `ezy` to use

All our utilities are designed with asynchronous programming in mind, ensuring they work seamlessly in both synchronous and asynchronous environments. This allows for easy integration into various programming paradigms and application architectures.

## Installation

```bash
# npm
npm install @ezy/util

# yarn
yarn add @ezy/util

# pnpm
pnpm install @ezy/util
```

## Usage

```js
import { ConvertUtil } from "@ezy/util";

console.log(ConvertUtil.strToNum("1")); // 1
```

## Utilities

### ConvertUtil

- `numToBool`: Convert number to boolean
- `strToBool`: Convert string to boolean
- `strToNum`: Convert string to number
- `strToDate`: Convert string to date
- `dateToStr`: Convert date to string
- `base64Encode`: Encode string to base64
- `base64Decode`: Decode base64 to string

### FileUtil

- `readFile`: Asynchronously read a file
- `writeFile`: Asynchronously write data to a file
- `appendFile`: Asynchronously append data to a file
- `deleteFile`: Asynchronously delete a file
- `copyFile`: Asynchronously copy a file
- `moveFile`: Asynchronously move a file
- `listFiles`: Asynchronously list files in a directory

### RandomUtil

- `generateRandomString`: Generate a random string
- `generateRandomNumber`: Generate a random number within a range
- `generateUUID`: Generate a UUID (Universally Unique Identifier)
- `shuffleArray`: Randomly shuffle an array
- `pickRandomElement`: Pick a random element from an array

### ErrorUtil

- `createCustomError`: Create a custom error with additional properties
- `handleAsyncError`: Wrapper for handling asynchronous errors
- `logError`: Log error details with optional metadata

### ConfigUtil

- `loadConfig`: Load configuration from a file or environment variables
- `validateConfig`: Validate configuration against a schema
- `mergeConfigs`: Merge multiple configuration objects
- `getConfigValue`: Safely retrieve a configuration value with fallback

### ApiUtil

- `fetchWithRetry`: Fetch data with automatic retries on failure
- `handleApiResponse`: Handle API responses with error checking
- `buildQueryString`: Build a URL query string from an object
- `parseJsonSafely`: Safely parse JSON with error handling

## Authors

- \_jujoycode - Developer

## Version History

### 0.0.1

- Initial release with the following utilities:
  - ConvertUtil
  - FileUtil
  - RandomUtil
  - ErrorUtil
  - ConfigUtil
  - ApiUtil

## License

This project is licensed under the [MIT] License
