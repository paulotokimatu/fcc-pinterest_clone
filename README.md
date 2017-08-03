# Pinterest Clone
App made using NodeJS, ExpressJS, MySQL and VueJS.

## User stories
From: https://www.freecodecamp.org/challenges/build-a-pinterest-clone
- As an unauthenticated user, I can login with Twitter.
- As an authenticated user, I can link to images.
- As an authenticated user, I can delete images that I've linked to.
- As an authenticated user, I can see a Pinterest-style wall of all the images I've linked to.
- As an unauthenticated user, I can browse other users' walls of images.
- As an authenticated user, if I upload an image that is broken, it will be replaced by a placeholder image. (can use jQuery broken image detection)

## Deploying
1. `git clone https://github.com/paulotokimatu/fcc-pinterest_clone.git`
2. `cd fcc-pinterest_clone.git`
3. `npm install`
4. Set up the .env file with TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, PROD_CALLBACK_URL (from Twitter OAuth) and DB_USER, DB_NAME, DB_HOST, DB_PASSWD
5. `node server.js`
