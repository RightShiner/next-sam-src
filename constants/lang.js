const keywords = {
  btn: {
    save: '保存',
    create: '作成',
    update: '更新',
    register: '登録',
  },
  nav: {
    accountresearch: 'アカウントリサーチ',
    insightlist: 'インサイトリスト',
    campaignlist: 'キャンペーンリスト',
    keyaccount: 'キーアカウント調査',
    academy: 'アカデミー',
    plan: '利用プラン',
    bookMeeting: 'ミーティングを予約',
    support: 'よくある質問',
    question: 'ヘルプセンター',
    logout: 'ログアウト',
    terms: '利用規約',
    policy: 'プライバシーポリシー',
    user: {
      create: '新規作成',
      list: 'ユーザーリスト',
      setting: 'プラン設定',
      load: 'インフルエンサー取得',
      announcement: 'お知らせ',
    },
  },
  caption: {
    search: '検索',
    clearall: '削除',
    clear: 'クリア',
    min: '最小',
    max: '最大',
    instagram: 'Instagram',
    youtube: 'Youtube',
    tiktok: 'TikTok',
    credibility: 'アクティブ率',
    followers: 'フォロワー数',
    follower: 'フォロワー',
    averageReelsPlays: 'リール再生回数',
    averageReelsPlaysInfo: 'インフルエンサーの最近リールの平均再生回数',
    hashtagEngagement: 'ハッシュタグエンゲージメント',
    hashtagEngagementPlaceHolder:
      'ハッシュタグを入力したあとにエンターを押してください',
    influencerlocation: '地域',
    gender: '性別',
    interestcare: '興味',
    interest: '興味',
    acctype: 'アカウントタイプ',
    exceptcampaign: 'キャンペーンリスト除外',
    language: '言語',
    post: '最終投稿',
    engagement: 'エンゲージメント',
    contractinfo: 'コンタクト',
    rateinfo: '成長率',
    bio: 'Bio',
    growthRate: 'フォロワー成長率',
    keyword: 'キーワード',
    keywordEnglishOnly: `"猫"と検索する場合は"neko"と入力`,
    topics: 'トピック',
    hashtag: 'ハッシュタグエンゲージメント',
    hashtagonly: 'ハッシュタグ',
    mentiononyl: 'メンション',
    audiencelocation: '地域',
    age: '年齢',
    subscriber: '登録者数',
    averageview: '平均再生回数',
    sort: '整列',
    nextpage: 'Load',
    type: 'ジャンル',
    list: 'リスト',
    engagement_tip:
      '直近10投稿のエンゲージメント。エンゲージメント率は「(いいね＋コメント)÷フォロワー」で算出しています。Instagramの平均エンゲージメント率は2%です。',
    bio_tip: 'プロフィール内のキーワードでインフルエンサーを検索します。',
    acctype_tip:
      'Instagramアカウントの種類(一般/ビジネス/クリエイター)で検索します。',
    contract_info_tip:
      'インフルエンサーのプロフィールに、メールアドレスが記載されているかを指定できます。',
    exceptcampaign_tip:
      '既にキャンペーンリストにご登録いただいたアカウントを、検索結果から非表示にします。',
    fileinput_tip:
      'すでにお持ちのリストがある場合、CSVにてユーザーIDをインポートいただくことで一括検索が可能です。',
    interestcare_tip:
      '興味 追加 インフルエンサーがどんな物事に興味関心を抱いているか。 インフルエンサーが「いい􏰁している投稿」「フォローしているアカウント」「投稿内容」などから、総合的に独自 􏰀アルゴリズムで測っています。',
    keyword_instagram_tip:
      '投稿時のキャプション内のフレーズで、インフルエンサーを検索します。複数のフレーズでのアンド検索をする場合は、フレーズごとにカンマ(,)で区切ってください。',
    keyword_youtube_tip:
      '概要文の「文章」や動画内の「発言」で、インフルエンサーを検索します。複数のフレーズでのアンド検索をする場合は、フレーズごとにカンマ(,)で区切ってください。',
    keyword_tiktok_tip:
      '入力したキーワードに関連するインフルエンサーを検索します',
    topics_tip:
      '独自のアルゴリズムでインフルエンサーを分類しています。例え􏰂ば「筋トレ」で検索すると、筋トレと相性􏰀良いインフルエンサーが表示されます。ただし現在アップデート中のため検索結果に誤差が生じる場合がございます。アップデート完了次第メールにてお知らせいたします。',
    hashtag_tip:
      '指定のハッシュタグを今までに2回以上使ったことがあるインフルエンサーを抽出いたします。ただしそのハッシュタグを使った投稿のエンゲージメントが著しく低い場合は検索から除外します。',
    credibility_tip:
      'フォロワーの実在率(アクティブ率)を指定いただけます。1ヶ月以内に動きがないアカウントを非アクティブと見なしています。70%を下回ると広告効果に影響をもたらすので注意です。',
    mention_tip:
      '投稿のキャプション内で指定のメンションを記載しているアカウントを検索します。',
    other_tip:
      '最適なインフルエンサーを絞り込むためには、まずはデフォルトのパーセンテージから初めて、徐々にパーセンテージを変更することをおすすめします。',
    profile_tip: 'プロフィール内のキーワードでインフルエンサーを検索します。',
    post_tip:
      'インフレンサーの最終投稿が何日以内なのか。よりアクティブなインフルエンサーを検索する際に有効です。',
    infu_interest_tip:
      'フォロワーがどんな物事に興味関心を抱いているか。フォロワーが「いいねしている投稿」「フォローしているアカウント」「投稿内容」などから、総合的に独自のアルゴリズムで測っています。',
    youtube_engagement_tip:
      'エンゲージメント率は直近10投稿の「(いいね＋コメント)÷平均再生回数」で算出しています。',
    tiktok_engagement_tip:
      'エンゲージメント率は直近10投稿の「(いいね＋コメント)÷平均再生回数」で算出しています。',
    youtube_username_tip:
      'もし検索がうまくいかない場合、インフルエンサーのYouTubeページ(トップページ)を ご確認いただき、URLの”channel/”以降を入力することで検索いただけます。 わかりづらい場合、説明書やヘルプセンターの確認、またはチャットサポートにてご気軽にお問い合わせください。',
    memo_tip: 'データベースでご追加いただいた内容から検索いただけます。',
    growthRate_tip: 'フォロワー成長率',
    hashtag_engagement_tip:
      'そのハッシュタグを使用した際の投稿のエンゲージメントが高いアカウントを抽出します。',
  },
  label: {
    searchfromsite: 'Instagram・YouTube・TikTokからアカウントを探します。',
    influencersaved: 'アカウントを登録しました。',
  },
  communcation_errs: {
    e001: 'メールアドレスが存在しません。',
    e002: 'トクンエラー。',
    e003: 'パスワードが間違っています。',
    e005: 'データベース接続エラー。',
    e006: '再ログインしてください。',
    e009: '対応メッソドがありません。',
    e010: '先に登録してください。',
    e011: 'トクン時間が経過しました、再度登録してください。',
    e020: 'このキャンペーン名は既に使われています。',
    e030: 'アカウントがずでに存在します。',
    e031: 'ステータスが「社内確認中」以外の人はリストから除外できません。',
    e032: '同じインフルエンサーがすでに存在します。',
    e039: '処理途中にエラーが発生しました。',
    e040: '同じメールアドレスが存在します。',
    e041: 'プランを先に設定してください。',
    e049: '処理中にエラーが発生しました。',
    e050:
      'キャンペーン登録数が上限に達しました。\r\nキャンペーン登録を利用するには、利用プランをアップグレード頂くか、利用プランの検索数のリセット日をお待ちください。',
    e051: 'プロフィール表示数がオーバーしました。',
    e052: 'フルレポート表示数がオーバーしました。',
    e053: 'ページ検索数がオーバーしました。',
    e054:
      'CSVの月間使用可能量が0になりました！\r\n月間使用可能量のリセット日をお待ちください。すぐにCSVをご利用になられたい場合はプランをアップグレード頂くと月間使用可能量が追加されます。',
    e059: '支払いをお願いします。',
  },

  en: {
    btn: {
      save: 'Save',
      create: 'Create',
      update: 'Update',
      register: 'Register',
      export: 'CSV Export',
      apply: 'Request',
    },
    nav: {
      accountresearch: 'Account Research',
      insightlist: 'Insight List',
      campaignlist: 'Campaign List',
      keyaccount: 'Key Account Survey',
      academy: 'Academy',
      plan: 'Usage Plan',
      bookMeeting: 'Book a meeting',
      support: 'FAQ',
      question: 'Help center',
      logout: 'Log Out',
      terms: 'Terms of Service',
      policy: 'Privacy Policy',
      user: {
        create: 'Create User',
        trial: 'Trial Url',
        list: 'User List',
        setting: 'Plan Service',
        load: 'Influencer Acquisition',
        announcement: 'Announcement',
      },
    },
    caption: {
      search: 'Search',
      clearall: 'Clear all filters',
      clear: 'Clear',
      min: 'min',
      max: 'max',
      instagram: 'Instagram',
      youtube: 'Youtube',
      tiktok: 'TikTok',
      credibility: 'Credibility',
      followers: 'Followers',
      follower: 'Follower',
      averageReelsPlays: 'Average Reels plays',
      averageReelsPlaysInfo:
        'Identify influencers by the average number of plays on their recent reels.',
      hashtagEngagement: 'Hashtag Engagement',
      hashtagEngagementPlaceHolder: 'Input hashtag and press enter',
      influencerlocation: 'Influencer Location',
      gender: 'Gender',
      interestcare: 'Interest',
      interest: 'Interest',
      acctype: 'Account type',
      exceptcampaign: 'Exclude campaign list',
      language: 'Language',
      post: 'Last Post',
      profile: 'Profile',
      engagement: 'Engagement',
      contractinfo: 'Contact information',
      rateinfo: 'Growth Rate',
      bio: 'Bio',
      growthRate: 'Follower Growth Rate',
      keyword: 'Keyword',
      keywordEnglishOnly: `Enter "neko" to search for "cat"`,
      topics: 'Topics',
      hashtag: 'Hashtag Engagement',
      hashtagonly: 'Hashtag',
      mentiononyl: 'Mention',
      audiencelocation: 'Audience Location',
      age: 'Age',
      subscriber: 'Subscribers',
      averageview: 'Average Views',
      sort: 'Sort',
      nextpage: 'Load',
      type: 'Genre',
      freeWord: 'Free word',
      list: 'List',
      tag: 'Tag',
      requestFee: 'Request fee',
      username: 'Username',
      influencer: 'Influencer',
      engagement_tip:
        'Engagement of last 10 posts. The engagement rate is calculated as "(likes + comments) ÷ followers". The average engagement rate on Instagram is 2%.',
      bio_tip: 'Search influencers by keywords in their profile.',
      acctype_tip:
        'Search by Instagram account type (General/Business/Creator).',
      contract_info_tip:
        "You can specify whether an influencer's profile contains an email address.",
      exceptcampaign_tip:
        'Accounts that have already been registered in the campaign list will be hidden from search results',
      fileinput_tip:
        'If you already have a list, you can perform a batch search by importing user IDs in CSV.',
      interestcare_tip:
        'Interests Add What interests the influencer. Influencers\' "good posts", "following accounts", "post content", etc. are comprehensively measured using a unique algorithm.',
      keyword_instagram_tip:
        'Search for influencers by phrases in the caption of the post. When performing an AND search with multiple phrases, separate each phrase with a comma (,).',
      keyword_youtube_tip:
        'Search for influencers by "sentence" in the synopsis or "remarks" in the video. When performing an AND search with multiple phrases, separate each phrase with a comma (,).',
      keyword_tiktok_tip:
        'Search for influencers related to the keywords you enter',
      topics_tip:
        'We classify influencers with our own algorithm. For example, if you search for "muscle training", influencers that are compatible with muscle training will be displayed. However, since it is currently being updated, errors may occur in the search results. We will notify you by email when the update is complete.',
      hashtag_tip:
        'Posts with specified hashtags will show people with high engagement.',
      credibility_tip:
        "You can specify the follower's actual existence rate (active rate). Accounts with no activity within a month are considered inactive. Please note that if it is less than 70%, it will affect the advertising effect.",
      mention_tip:
        'Search for accounts with the specified mention in the post caption.',
      other_tip:
        'To narrow down the best influencers, we recommend starting with the default percentages and gradually changing the percentages.',
      profile_tip: 'Search influencers by keywords in their profile.',
      post_tip:
        'Within how many days is the last post of the influencer? Effective when searching for more active influencers.',
      infu_interest_tip:
        'What are your followers interested in? It is comprehensively measured by a unique algorithm based on "posts liked", "accounts followed", "posted content", etc.',
      youtube_engagement_tip:
        'The engagement rate is calculated as "(like + comment) ÷ average number of views" of the last 10 posts.',
      tiktok_engagement_tip:
        'The engagement rate is calculated as "(like + comment) ÷ average number of views" of the last 10 posts.',
      youtube_username_tip:
        'If the search does not work, please check the influencer\'s YouTube page (top page) and enter the URL after "channel/" to search. If it is difficult to understand, please check the manual, help center, or feel free to contact us via chat support.',
      memo_tip: 'You can search from the contents added in the database.',
      growthRate_tip: 'Follower Growth Rate',
      hashtag_engagement_tip:
        'Extract accounts with high post engagement when using that hashtag.',
    },
    label: {
      all: 'All',
      searchfromsite:
        'Search for accounts from Instagram, YouTube, and TikTok.',
      influencersaved: 'You have registered your account.',
    },
    communcation_errs: {
      e001: 'Email address does not exist.',
      e002: 'Token error.',
      e003: 'Your password is incorrect.',
      e005: 'Database connection error.',
      e006: 'Please login again',
      e009: 'There is no corresponding method.',
      e010: 'Please register first.',
      e011: 'Token time expired, please register again.',
      e020: 'This campaign name is already in use.',
      e030: 'The account already exists.',
      e031:
        'People with a status other than "internal verification" cannot be removed from the list.',
      e032: 'The same influencer already exists.',
      e039: 'An error occurred during processing.',
      e040: 'Same email address exists.',
      e041: 'Set your plan first.',
      e049: 'An error occurred during processing.',
      e050:
        'The number of campaign registrations has reached the upper limit. \r\nTo use the campaign registration, please upgrade your usage plan or wait for the search count reset date for your usage plan.',
      e051: 'The number of profile views has exceeded.',
      e052: 'The number of full report displays has exceeded.',
      e053: 'The number of page searches has exceeded.',
      e054:
        'The monthly usable amount of CSV has become 0! \r\nPlease wait for the monthly usage reset date. If you want to use CSV right away, you can upgrade your plan and the monthly usage amount will be added.',
      e059: 'please pay.',
    },
  },
  jp: {
    btn: {
      save: '保存',
      create: '作成',
      update: '更新',
      register: '登録',
      export: 'CSV出力',
      apply: '申請',
    },
    nav: {
      accountresearch: 'アカウントリサーチ',
      insightlist: 'インサイトリスト',
      campaignlist: 'キャンペーンリスト',
      keyaccount: 'キーアカウント調査',
      academy: 'アカデミー',
      plan: '利用プラン',
      bookMeeting: 'ミーティングを予約',
      support: 'よくある質問',
      question: 'ヘルプセンター',
      logout: 'ログアウト',
      terms: '利用規約',
      policy: 'プライバシーポリシー',
      user: {
        create: '新規作成',
        trial: 'トライアルURL',
        list: 'ユーザーリスト',
        setting: 'プラン設定',
        load: 'インフルエンサー取得',
        announcement: 'お知らせ',
      },
    },
    caption: {
      search: '検索',
      clearall: '削除',
      clear: 'クリア',
      min: '最小',
      max: '最大',
      instagram: 'Instagram',
      youtube: 'Youtube',
      tiktok: 'TikTok',
      credibility: 'アクティブ率',
      followers: 'フォロワー数',
      follower: 'フォロワー',
      averageReelsPlays: 'リール再生回数',
      averageReelsPlaysInfo: 'インフルエンサーの最近リールの平均再生回数',
      hashtagEngagement: 'ハッシュタグエンゲージメント',
      hashtagEngagementPlaceHolder:
        'ハッシュタグを入力したあとにエンターを押してください',
      influencerlocation: '地域',
      gender: '性別',
      interestcare: '興味',
      interest: '興味',
      acctype: 'アカウントタイプ',
      exceptcampaign: 'キャンペーンリスト除外',
      language: '言語',
      post: '最終投稿',
      profile: 'プロフィール',
      engagement: 'エンゲージメント',
      contractinfo: 'コンタクト',
      rateinfo: '成長率',
      bio: 'Bio',
      growthRate: 'フォロワー成長率',
      keyword: 'キーワード',
      keywordEnglishOnly: `"猫"と検索する場合は"neko"と入力`,
      topics: 'トピック',
      hashtag: 'ハッシュタグエンゲージメント',
      hashtagonly: 'ハッシュタグ',
      mentiononyl: 'メンション',
      audiencelocation: '地域',
      age: '年齢',
      subscriber: '登録者数',
      averageview: '平均再生回数',
      sort: '整列',
      nextpage: 'Load',
      type: 'ジャンル',
      freeWord: 'フリーワード',
      list: 'リスト',
      tag: 'タグ',
      requestFee: '依頼費用',
      username: 'ユーザーネーム',
      influencer: 'インフルエンサー',
      engagement_tip:
        '直近10投稿のエンゲージメント。エンゲージメント率は「(いいね＋コメント)÷フォロワー」で算出しています。Instagramの平均エンゲージメント率は2%です。',
      bio_tip: 'プロフィール内のキーワードでインフルエンサーを検索します。',
      acctype_tip:
        'Instagramアカウントの種類(一般/ビジネス/クリエイター)で検索します。',
      contract_info_tip:
        'インフルエンサーのプロフィールに、メールアドレスが記載されているかを指定できます。',
      exceptcampaign_tip:
        '既にキャンペーンリストにご登録いただいたアカウントを、検索結果から非表示にします。',
      fileinput_tip:
        'すでにお持ちのリストがある場合、CSVにてユーザーIDをインポートいただくことで一括検索が可能です。',
      interestcare_tip:
        '興味 追加 インフルエンサーがどんな物事に興味関心を抱いているか。 インフルエンサーが「いい􏰁している投稿」「フォローしているアカウント」「投稿内容」などから、総合的に独自 􏰀アルゴリズムで測っています。',
      keyword_instagram_tip:
        '投稿時のキャプション内のフレーズで、インフルエンサーを検索します。複数のフレーズでのアンド検索をする場合は、フレーズごとにカンマ(,)で区切ってください。',
      keyword_youtube_tip:
        '概要文の「文章」や動画内の「発言」で、インフルエンサーを検索します。複数のフレーズでのアンド検索をする場合は、フレーズごとにカンマ(,)で区切ってください。',
      keyword_tiktok_tip:
        '入力したキーワードに関連するインフルエンサーを検索します',
      topics_tip:
        '独自のアルゴリズムでインフルエンサーを分類しています。例え􏰂ば「筋トレ」で検索すると、筋トレと相性􏰀良いインフルエンサーが表示されます。ただし現在アップデート中のため検索結果に誤差が生じる場合がございます。アップデート完了次第メールにてお知らせいたします。',
      hashtag_tip:
        '指定のハッシュタグを今までに2回以上使ったことがあるインフルエンサーを抽出いたします。ただしそのハッシュタグを使った投稿のエンゲージメントが著しく低い場合は検索から除外します。',
      credibility_tip:
        'フォロワーの実在率(アクティブ率)を指定いただけます。1ヶ月以内に動きがないアカウントを非アクティブと見なしています。70%を下回ると広告効果に影響をもたらすので注意です。',
      mention_tip:
        '投稿のキャプション内で指定のメンションを記載しているアカウントを検索します。',
      other_tip:
        '最適なインフルエンサーを絞り込むためには、まずはデフォルトのパーセンテージから初めて、徐々にパーセンテージを変更することをおすすめします。',
      profile_tip: 'プロフィール内のキーワードでインフルエンサーを検索します。',
      post_tip:
        'インフレンサーの最終投稿が何日以内なのか。よりアクティブなインフルエンサーを検索する際に有効です。',
      infu_interest_tip:
        'フォロワーがどんな物事に興味関心を抱いているか。フォロワーが「いいねしている投稿」「フォローしているアカウント」「投稿内容」などから、総合的に独自のアルゴリズムで測っています。',
      youtube_engagement_tip:
        'エンゲージメント率は直近10投稿の「(いいね＋コメント)÷平均再生回数」で算出しています。',
      tiktok_engagement_tip:
        'エンゲージメント率は直近10投稿の「(いいね＋コメント)÷平均再生回数」で算出しています。',
      youtube_username_tip:
        'もし検索がうまくいかない場合、インフルエンサーのYouTubeページ(トップページ)を ご確認いただき、URLの”channel/”以降を入力することで検索いただけます。 わかりづらい場合、説明書やヘルプセンターの確認、またはチャットサポートにてご気軽にお問い合わせください。',
      memo_tip: 'データベースでご追加いただいた内容から検索いただけます。',
      growthRate_tip: 'フォロワー成長率',
      hashtag_engagement_tip:
        'そのハッシュタグを使用した際の投稿のエンゲージメントが高いアカウントを抽出します。',
    },
    label: {
      all: '全て',
      searchfromsite: 'Instagram・YouTube・TikTokからアカウントを探します。',
      influencersaved: 'アカウントを登録しました。',
    },
    communcation_errs: {
      e001: 'メールアドレスが存在しません。',
      e002: 'トクンエラー。',
      e003: 'パスワードが間違っています。',
      e005: 'データベース接続エラー。',
      e006: '再ログインしてください。',
      e009: '対応メッソドがありません。',
      e010: '先に登録してください。',
      e011: 'トクン時間が経過しました、再度登録してください。',
      e020: 'このキャンペーン名は既に使われています。',
      e030: 'アカウントがずでに存在します。',
      e031: 'ステータスが「社内確認中」以外の人はリストから除外できません。',
      e032: '同じインフルエンサーがすでに存在します。',
      e039: '処理途中にエラーが発生しました。',
      e040: '同じメールアドレスが存在します。',
      e041: 'プランを先に設定してください。',
      e049: '処理中にエラーが発生しました。',
      e050:
        'キャンペーン登録数が上限に達しました。\r\nキャンペーン登録を利用するには、利用プランをアップグレード頂くか、利用プランの検索数のリセット日をお待ちください。',
      e051: 'プロフィール表示数がオーバーしました。',
      e052: 'フルレポート表示数がオーバーしました。',
      e053: 'ページ検索数がオーバーしました。',
      e054:
        'CSVの月間使用可能量が0になりました！\r\n月間使用可能量のリセット日をお待ちください。すぐにCSVをご利用になられたい場合はプランをアップグレード頂くと月間使用可能量が追加されます。',
      e059: '支払いをお願いします。',
    },
  },
};

export default keywords;
