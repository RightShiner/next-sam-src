import AWS from 'aws-sdk';

const s3 = new AWS.S3({
  region: 'ap-northeast-1',
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    let { infId, name, type } = req.body;

    let timestamp = Date.now();
    let key = `test/${infId}/${timestamp}_${name}`;

    const fileParams = {
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: key,
      ContentType: type,
    };

    const url = await s3.getSignedUrlPromise('putObject', fileParams);

    res.status(200).json({ url, key });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '600mb', // Set desired value here
    },
  },
};
