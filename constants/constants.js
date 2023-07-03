import Lang from './lang';
import _ from 'lodash';
import crypto from 'crypto';

const keywords = {
  roleInfo: {
    admin: 'admin',
    user: 'user',
  },
  blurImage:
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mO0tdWLBAACagEDaHUA1gAAAABJRU5ErkJggg==',
  snsInstagram: 'instagram',
  snsYoutube: 'youtube',
  snsTiktok: 'tiktok',
  snsTypes: {
    instagram: Lang.en.caption.instagram,
    youtube: Lang.en.caption.youtube,
    tiktok: Lang.en.caption.tiktok,
  },
  campaignTypes: {
    en: [
      'fashion',
      'beauty',
      'gourmet',
      'interior',
      'electric appliances',
      'real estate',
      'animal',
      'trip',
      'daily necessities',
      'entertainment',
      'travel/Hotel',
      'game',
      'kids',
      'vehicle',
      'art (music/film)',
      'business',
      'sport Active',
      'others',
    ],
    jp: [
      'ファッション',
      'ビューティー',
      'グルメ',
      'インテリア',
      '電化製品',
      '不動産',
      '動物',
      '旅行',
      '日用品',
      'エンタメ',
      '旅行・ホテル',
      'ゲーム',
      'キッズ',
      '乗り物',
      'アート(音楽・映画)',
      'ビジネス',
      'スポーツ・アクティブ',
      'その他',
    ],
  },
  campaignLists: {
    en: ['Insight', 'Office', 'Scout', 'Suggestion List'],
    jp: ['インサイト', '事務所', 'スカウト', '提案リスト'],
  },
  errors: {
    badrequest: 400,
    unauthorized: 401,
    forbidden: 403,
    error: 500,
  },
};

const japaneseInterests = {
  'Television & Film': 'テレビ / 映画',
  Music: '音楽',
  'Shopping & Retail': 'ショッピング/小売り',
  'Coffee, Tea & Beverages': 'コーヒー/紅茶/飲料',
  'Camera & Photography': 'カメラ/写真',
  'Clothes, Shoes, Handbags & Accessories':
    '服/シューズ/ハンドバッグ/アクセサリー',
  'Beer, Wine & Spirits': 'ビール/ワイン/お酒',
  Sports: 'スポーツ',
  'Electronics & Computers': '電化製品',
  Gaming: 'ゲーム',
  Activewear: 'スポーツウェア―',
  'Art & Design': 'アート/デザイン',
  'Travel, Tourism & Aviation': '旅行/観光',
  'Business & Careers': 'ビジネス/キャリア',
  'Beauty & Cosmetics': 'ビューティー/コスメ',
  'Healthcare & Medicine': 'ヘルスケア',
  'Jewellery & Watches': 'ジュエリー/時計',
  'Restaurants, Food & Grocery': 'レストラン/食べ物',
  'Toys, Children & Baby': '子供',
  'Fitness & Yoga': 'フィットネス/ヨガ',
  Wedding: 'ウェディング',
  'Tobacco & Smoking': 'タバコ/スモーキング',
  Pets: 'ペット',
  'Healthy Lifestyle': '健康',
  'Luxury Goods': 'ラグジュアリーグッズ',
  'Home Decor, Furniture & Garden': 'インテリア/ガーデニング',
  'Friends, Family & Relationships': '友人/家族',
  'Cars & Motorbikes': '車/バイク',
};

export const growthRate = {
  en: [
    { value: '1', text: '1 month' },
    { value: '2', text: '2 months' },
    { value: '3', text: '3 months' },
    { value: '4', text: '4 months' },
    { value: '5', text: '5 months' },
    { value: '6', text: '6 months' },
  ],
  jp: [
    { value: '1', text: '1ヶ月' },
    { value: '2', text: '2ヶ月' },
    { value: '3', text: '3ヶ月' },
    { value: '4', text: '4ヶ月' },
    { value: '5', text: '5ヶ月' },
    { value: '6', text: '6ヶ月' },
  ],
};

export const TagColors = [
  '#FD8972EE',
  '#FED45CEE',
  '#9A83E5EE',
  '#7CB6E3EE',
  '#A3DE9CEE',
  '#F09C55EE',
];

export const getMatchInterests = (val) => {
  if (process.env.NEXT_PUBLIC_REGION === 'SG') {
    return val;
  }
  const matchVal = _.get(japaneseInterests, val);
  if (!matchVal) return val;
  return matchVal;
};

export const audienceLocations = [
  {
    title: '東京',
    id: ['Tokyo', 'Kita Ward', 'Chuo Ward'],
    val: [1543125, 600000208, 600000035],
  },
  {
    title: '大阪',
    id: ['Ōsaka', 'Higashisumiyoshi', 'Konohana', 'Ikuno Ward'],
    val: [600004364, 358674, 600001567, 600002792],
  },
  { title: '兵庫', id: ['Kōbe'], val: [900329] },
  {
    title: '北海道',
    id: ['Sapporo', 'Hakodate', 'Chitose', 'Otaru', 'Yūbari'],
    val: [4085749, 4088019, 4085704, 4085754, 4082948],
  },
  { title: '京都', id: ['Kyoto'], val: [357794] },
  {
    title: '神奈川',
    id: [
      'Yokohama',
      'Kawasaki',
      'Sagamihara',
      'Kamakura',
      'Fujisawa',
      'Yokosuka',
      'Hiratsuka',
      'Chigasaki',
      'Odawara',
      'Atsugi',
      'Zushi',
    ],
    val: [
      2689476,
      2689481,
      2689482,
      2689445,
      2689443,
      2689433,
      2689429,
      2689441,
      2689427,
      2689422,
      2689444,
    ],
  },
  { title: '鹿児島', id: ['Kagoshima'], val: [3962762] },
  {
    title: '千葉',
    id: [
      'Chiba',
      'Matsudo',
      'Ichikawa',
      'Kisarazu',
      'Yachiyo',
      'Kashiwa',
      'Narita',
      'Funabashi',
      'Urayasu',
    ],
    val: [
      2679924,
      2679914,
      2679956,
      2679929,
      2679935,
      2679917,
      2679925,
      2679900,
      2679921,
      2679915,
    ],
  },
  {
    title: '埼玉',
    id: ['Saitama', 'Kawagoe', 'Koshigaya', 'Soka', 'Kuki'],
    val: [1768466, 1768338, 1768402, 1767047, 1768985],
  },
  { title: '広島', id: ['Hiroshima'], val: [4097196] },
  {
    title: '沖縄',
    id: [
      'Okinawa',
      'Urasoe',
      'Uruma',
      'Miyakojima',
      'Ishigaki',
      'Naha',
      'Nago',
      'Ginowan',
      'Itoman',
    ],
    val: [
      4559181,
      4556087,
      4538671,
      4556086,
      4556097,
      4559285,
      4559235,
      4542217,
      4556096,
    ],
  },
  { title: '熊本', id: ['Kumamoto'], val: [4000503] },
  { title: '岡山', id: ['Okayama', 'Kurashiki'], val: [3939644, 3938622] },
  { title: '滋賀', id: ['Ōtsu', 'Hikone'], val: [722196, 722198] },
  {
    title: '茨城',
    id: ['Tsukuba'],
    val: [2682891, 2682892, 2682911, 722220, 2682914],
  },
  {
    title: '群馬',
    id: ['Maebashi', 'Iseｓaki', 'Takasaki'],
    val: [3563845, 3555552, 1865315],
  },
  {
    title: '福岡',
    id: [
      'Fukuoka',
      'Iizuka',
      'Kurume',
      'Hakata Ward',
      'Chikushino',
      'Kokura Kita Ward',
      'Yame',
      'Kokura Minami Ward',
    ],
    val: [
      4008611,
      600004411,
      4008438,
      600000871,
      4008390,
      600000149,
      4008314,
      4008439,
    ],
  },
  { title: '愛媛', id: ['Matsuyama'], val: [4050217] },
  { title: '和歌山', id: ['Wakayama'], val: [1919929] },
  {
    title: '長野',
    id: ['Matsumoto', 'Nagano', 'Ueda'],
    val: [3648972, 3648962, 3599783],
  },
  { title: '岩手', id: ['Morioka'], val: [963784] },
  { title: '高知', id: ['Kōchi'], val: [4028510] },
  {
    title: '青森',
    id: ['Hachinohe', 'Aomori', 'Hirosaki'],
    val: [4107337, 4107414, 4107507],
  },
  { title: '福島', id: ['Fukushima'], val: [600001405] },
  { title: '愛知', id: ['Aichi'], val: [4576938] },
  { title: '長崎', id: ['Nagasaki'], val: [4011885] },
  { title: '新潟', id: ['Niigata'], val: [4237973] },
  { title: '静岡', id: ['Shizuoka'], val: [4674742] },
  { title: '宮城', id: ['Sendai'], val: [4135014] },
  { title: '秋田', id: ['Akita'], val: [4117549] },
  { title: '山形', id: ['Yamagata'], val: [3790869] },
  { title: '徳島', id: ['Tokushima'], val: [4058068] },
  { title: '宮崎', id: ['Miyazaki'], val: [3989984] },
];

export const audienceLocationsAdditions = [
  { title: 'シンガポール', id: ['Singapore'], val: [536780] },
  { title: 'マレーシア', id: ['Malaysia'], val: [2108121] },
  { title: 'インドネシア', id: ['Indonesia'], val: [304751] },
  { title: '韓国', id: ['South Korea'], val: [307756] },
];

export const audienceLocationsAdditions2 = [
  { title: 'アメリカ', id: ['United States'], val: [148838] },
];

export const audienceLocationsAdditions3 = [
  {
    title: 'Los Angeles, California, United States',
    id: ['Los Angeles'],
    val: [207359],
  },
  { title: 'New York State, United States', id: ['New York'], val: [61320] },
];

export const audienceLocationsAdditions4 = [
  { title: 'シンガポール', id: ['Singapore'], val: [536780] },
  { title: 'マレーシア', id: ['Malaysia'], val: [2108121] },
  { title: 'インドネシア', id: ['Indonesia'], val: [304751] },
  { title: 'タイ', id: ['Thailand'], val: [2067731] },
];

export const audienceLocationsAdditions5 = [
  { title: 'インドネシア', id: ['Indonesia'], val: [304751] },
  { title: 'シンガポール', id: ['Singapore'], val: [536780] },
  { title: 'マレーシア', id: ['Malaysia'], val: [2108121] },
  { title: 'タイ', id: ['Thailand'], val: [2067731] },
  { title: 'フィリピン', id: ['Philippines'], val: [443174] },
  { title: 'ベトナム', id: ['Vietnam'], val: [49915] },
  { title: 'ミャンマー', id: ['Myanmar'], val: [50371] },
  { title: '香港', id: ['Hong Kong'], val: [913110] },
  { title: '韓国', id: ['South Korea'], val: [307756] },
  { title: '台湾', id: ['Taipei'], val: [1293250] },
  { title: 'アメリカ', id: ['United States'], val: [148838] },
  { title: 'オーストラリア', id: ['Australia'], val: [80500] },
];

export const audienceLocationsAdditions6 = [
  { title: '日本', id: ['Japan'], val: [382313] },
  { title: 'アメリカ', id: ['United States'], val: [148838] },
];

export const audienceLocationsAdditions7 = [
  { title: 'マレーシア', id: ['Malaysia'], val: [2108121] },
  { title: 'インドネシア', id: ['Indonesia'], val: [304751] },
  { title: 'タイ', id: ['Thailand'], val: [2067731] },
  { title: 'ベトナム', id: ['Vietnam'], val: [49915] },
  { title: '香港', id: ['Hong Kong'], val: [913110] },
  { title: '台湾', id: ['Taipei'], val: [1293250] },
  { title: '韓国', id: ['South Korea'], val: [307756] },
];

export const audienceLocationsAdditions8 = [
  { title: 'Malaysia', id: ['Malaysia'], val: [2108121] },
  { title: 'Indonesia', id: ['Indonesia'], val: [304751] },
  { title: 'Thailand', id: ['Thailand'], val: [2067731] },
  { title: 'Vietnam', id: ['Vietnam'], val: [49915] },
  { title: 'Hong Kong', id: ['Hong Kong'], val: [913110] },
  { title: 'Taipei', id: ['Taipei'], val: [1293250] },
  { title: 'South Korea', id: ['South Korea'], val: [307756] },
];

export const audienceLocationsAdditions9 = [
  { title: 'ベトナム', id: ['Vietnam'], val: [49915] },
];

export const audienceLocationsAdditions10 = [
  { title: 'アラブ首長国連邦', id: ['United Arab Emirates'], val: [307763] },
];

export const audienceLocationsSg = [
  { title: 'シンガポール', id: ['Singapore'], val: [536780] },
];

export const audienceLimit = {
  location: 0.2,
  gender: 0.5,
  age: 0.3,
  interests: 0.3,
};

export const ages = ['13-17', '18-24', '25-34', '35-44', '45-64', '65-'];

export const engages = Array.from({ length: 10 }, (_, i) => {
  return { value: (i + 1) * 0.01, text: `≥${i + 1}%` };
});

export const dateToPeriod = (date) => {
  let period = new Date() - new Date(date);
  return period / (60 * 60 * 24 * 1000);
};

export const getMatchLocations = (val) => {
  let jpName = '',
    idIndex = -1;

  for (let location of audienceLocations) {
    idIndex = location.id.findIndex((itm) => itm === val);
    if (idIndex !== -1) {
      jpName = location.title;
      break;
    }
  }

  return jpName || val;
};

export const getNamesFromFileData = (values) => {
  let result = [];

  values.map((cells) => {
    if (cells[0].trim() === '') return;

    result.push(cells[0].startsWith('@') ? cells[0] : '@' + cells[0]);
  });

  return result;
};

export const evaluateValue = (val) => {
  if (typeof val != 'number') {
    return val;
  }

  if (val > 1000 * 1000 * 1000)
    return (val / (1000 * 1000 * 1000)).toFixed(1) + 'B';
  else if (val > 1000 * 1000) return (val / (1000 * 1000)).toFixed(1) + 'M';
  else if (val > 1000) return (val / 1000).toFixed(1) + 'K';

  return Number.isInteger(val) ? val : val.toFixed(2);
};

export const getDataUri = (url, callback, idx = undefined) => {
  if (!url || url === '' || !callback) return '';

  // var xhr = new XMLHttpRequest();
  // xhr.open("GET", url, true);
  // xhr.responseType = "blob";

  // xhr.onload = function (e) {
  //   var reader = new FileReader();
  //   if (!this || !this.response) {
  //     callback('');
  //     return;
  //   }

  //   reader.onload = function(event) {
  //      var res = event.target.result;
  //      return res;
  //   }

  //   var file = this.response;
  //   reader.readAsDataURL(file);
  // };
  // xhr.send()

  var image = new Image();
  image.crossOrigin = 'Anonymous';
  image.src =
    url.includes('.fna.fbcdn.net/') || url.includes('cdninstagram.com')
      ? `/api/imageFetcher?imageUrl=${encodeURIComponent(url)}`
      : url;

  image.onload = function() {
    var canvas = document.createElement('canvas');
    canvas.width = this.naturalWidth; // or 'width' if you want a special/scaled size
    canvas.height = this.naturalHeight; // or 'height' if you want a special/scaled size

    canvas.getContext('2d').drawImage(this, 0, 0);

    // ... or get as Data URI
    if (idx === undefined) callback(canvas.toDataURL('image/png'));
    else callback(canvas.toDataURL('image/png'), idx);
  };
};

export const getHash = (input) => {
  return crypto
    .createHash('sha512')
    .update(input)
    .digest('hex');
};

export const getSortedTags = (tags) => {
  if (!tags) return [];

  let sortedTags = Array.from(new Set(tags.map((x) => x.color))).map(
    (color) => {
      const temp = tags.filter((s) => s.color === color);
      return { color: color, members: temp };
    },
  );

  return sortedTags;
};

export const groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};

export const avg = (arr) => {
  return arr.length !== 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 0;
};

export default keywords;
