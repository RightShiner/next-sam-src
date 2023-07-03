export const config = {
  api: {
    bodyParser: {
      sizeLimit: '600mb',
    },
    responseLimit: false,
  },
};

export default async (req, res) => {
  const url = decodeURIComponent(req.query.imageUrl);
  if (!url || (!url.startsWith('https://') && !url.startsWith('http://'))) {
    console.log({ UnrecognizedUrl: url });
  }
  const result = await fetch(url);
  const body = result.body;
  body.pipe(res);
};
