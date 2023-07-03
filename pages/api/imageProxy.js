import { withImageProxy } from '@blazity/next-image-proxy';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '600mb',
    },
    responseLimit: false,
  },
};

export default withImageProxy({
  whitelistedPatterns: [
    /^https?:\/\/(.*).fna.fbcdn.net/,
    /^https?:\/\/(.*).cdninstagram.com/,
  ],
});
