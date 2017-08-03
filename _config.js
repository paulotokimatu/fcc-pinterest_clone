var ids = {
  twitter: {
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: process.env.PROD_CALLBACK_URL || "https://one-pinterest-tokimatu.c9users.io/auth/twitter/callback"
  }
};

module.exports = ids;