# Programming Quotes API

**Programming Quotes API for open source projects.**

Server Entry: [http://localhost:8081](http://localhost:8081)

Github repo: [github.com/sharadm20/challenge/server](https://github.com/sharadm20/challenge.git)

## API Documentation

Suported languages: en, sr.

### Public routes

GET [`/quotes`](http://localhost:8081/quotes) (get all quotes)

GET [`/quotes/lang/en`](http://localhost:8081/quotes/lang/en) (get quotes by language)

GET [`/quotes/page/2`](http://localhost:8081/quotes/page/2) (get quotes by page)

GET [`/quotes/random`](http://localhost:8081/quotes/random) (get random quote)

GET [`/quotes/random/lang/sr`](http://localhost:8081/quotes/random/lang/sr) (get random quote by language)

GET [`/quotes/id/5a6ce86f2af929789500e824`](http://localhost:8081/quotes/id/5a6ce86f2af929789500e824) (get quote by id)

### Protected routes

POST `/quotes/vote` (post vote)
- required params: `quoteId`, `newVote` (number from 1 to 5)

POST `/quotes` (for registered user)
- required params: `token`, `author`, `en`
- optional: `source`, `sr`
- author name should be from Wikipedia

PUT `/quotes` (update quote for admin)
- required params: `token`, `_id`, `author`, `en`
- optional: `source`, `sr`

DELETE: `/quotes` (for admin)
- required params: `token`, `_id`

### Authentication

GET `/auth/{provider}` (user login)
- suported providers: Github, Google
- opens login page

After successful login, user will be redirected to client app. The client app should handle token on this route: `#/auth/{provider}/${token}`.

GET `/auth/{provider}:token` (get user data)
- returns info on current user

## Development

### Prerequisites

- Install Node.js
- Set [environment variables](https://github.com/sharadm20/challenge/wiki/Enviornment-variable)


### Env variables

Create `.env` file proper values:

```
# Database credentials (obtain from MongoDB)
DB_NAME=
DB_USER=
DB_PASSWORD=
DB_DOMAIN=

# obtain from Github (have two separate OAuth apps, for local and for production)
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
# OAuth 2.0 client IDs (obtain from Google API Console)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
# whatever random string you like
JWTSECRET=

# use development for local testing
NODE_ENV=development 
```

### Start

```
npm i
npm run dev
```

### Deploy

This is just a development server
