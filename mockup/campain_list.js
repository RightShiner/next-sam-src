import faker from 'faker';

const snsValues = ['Instagram', 'Youtube', 'TikTok'];
const genreValues = ['ファッション', 'ビューティー', 'グルメ', 'インテリア', '電化製品', '不動産', '動物', '旅行', '日用品', 'エンタメ', '旅行・ホテル', 'ゲーム', 'キッズ', '乗り物', 'アート(音楽・映画)', 'ビジネス', 'スポーツ・アクティブ', 'その他'];

function getDateString(date) {
  return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate());
}

export const campaignList = [...Array(23)].map((_, index) => ({
  name: faker.datatype.string(6),
  sns: snsValues[faker.datatype.number() % 3],
  genre: genreValues[faker.datatype.number() % 18],
  price: faker.datatype.number() % 100000 / 5,
  members: faker.datatype.number() % 10000,
  createdDate: getDateString(faker.date.past()),
  endDate: getDateString(faker.date.past()),
  numberOfReach: faker.datatype.number() % 1000,
  percentOfReach: faker.datatype.number() % 100,
  earnings: faker.datatype.number() % 1000000,
  roas: faker.datatype.number() % 1000,
  
  star: faker.datatype.number() % 5 + 1,
  id: faker.datatype.string(6),
  link: faker.datatype.string(6),
  followers: faker.datatype.number() % 100000,
  eg: faker.datatype.number() % 100000,
  status: faker.datatype.number() % 4,
}));

export const memberList = [...Array(2)].map((_, index) => ({
  id: faker.datatype.string(6),
  postDate: faker.datatype.datetime().toDateString(),
  postURL: faker.datatype.string(10),
  productName: faker.datatype.string(5),
  price: faker.datatype.number() % 10000,
  followers: faker.datatype.number() % 10000,
  numberOfReach: faker.datatype.number() % 10000,
  percentOfReach: faker.datatype.number() % 100,
  save: faker.datatype.number() % 10000,
  savePercent: faker.datatype.number() % 100,
  numberOfLikes: faker.datatype.number() % 10000,
  numberOfComments: faker.datatype.number() % 10000,
  normalEG: faker.datatype.number() % 100,
  prEG: faker.datatype.number() % 100,
  sales: faker.datatype.number() % 10000,
  ROAS: faker.datatype.number() % 10000,
  star: faker.datatype.number() % 5 + 1,

  budget: faker.datatype.number() % 10000,
  numberOfImp: faker.datatype.number() % 10000,
  percentOfImp: faker.datatype.number() % 100,
  numberOfClick: faker.datatype.number() % 10000,
  percentOfClick:faker.datatype.number() % 100,
  numberOfStamp: faker.datatype.number() % 10000,
  percentOfStamp: faker.datatype.number() % 100,
  earning: faker.datatype.number() % 10000,
  status: faker.datatype.number() % 1,
}));