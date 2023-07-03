/* eslint-disable react/no-unescaped-entities */
import CsvDownloader from 'react-csv-downloader';
import React, { useState, useEffect } from 'react';
import { Button, Box, Paper, Skeleton } from '@mui/material';
import { campaignService, astreamService } from 'services';
import Constants from 'constants/constants';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
import RoundInfo from '../../../../components/RoundInfo';

const columnsInstagram = [
  {
    id: 'c1',
    displayName: 'アカウント名',
  },
  {
    id: 'c2',
    displayName: '国',
  },
  {
    id: 'c3',
    displayName: '名前',
  },
  {
    id: 'c4',
    displayName: 'アカウントURL',
  },
  {
    id: 'c5',
    displayName: 'フォロワー数',
  },
  {
    id: 'c6',
    displayName: 'エンゲージメント',
  },
  {
    id: 'c7',
    displayName: 'フォロワーの男性割合',
  },
  {
    id: 'c8',
    displayName: 'フォロワーの女性割合',
  },
  {
    id: 'c9',
    displayName: 'フォロワーの13-17歳の男性の割合',
  },
  {
    id: 'c10',
    displayName: 'フォロワーの18-24歳の男性の割合',
  },
  {
    id: 'c11',
    displayName: 'フォロワーの25-34歳の男性の割合',
  },
  {
    id: 'c12',
    displayName: 'フォロワーの35-44歳の男性の割合',
  },
  {
    id: 'c13',
    displayName: 'フォロワーの45-64歳の男性の割合',
  },
  {
    id: 'c14',
    displayName: 'フォロワーの13-17歳の女性の割合',
  },
  {
    id: 'c15',
    displayName: 'フォロワーの18-24歳の女性の割合',
  },
  {
    id: 'c16',
    displayName: 'フォロワーの25-34歳の女性の割合',
  },
  {
    id: 'c17',
    displayName: 'フォロワーの35-44歳の女性の割合',
  },
  {
    id: 'c18',
    displayName: 'フォロワーの45-64歳の女性の割合',
  },
  {
    id: 'c19',
    displayName: 'フォロワーの所在地１位',
  },
  {
    id: 'c20',
    displayName: 'フォロワーの所在地２位',
  },
  {
    id: 'c21',
    displayName: 'フォロワーの所在地３位',
  },
  {
    id: 'c22',
    displayName: 'ハッシュタグエンゲージメント１位',
  },
  {
    id: 'c23',
    displayName: 'ハッシュタグエンゲージメント２位',
  },
  {
    id: 'c24',
    displayName: 'ハッシュタグエンゲージメント３位',
  },
  {
    id: 'c25',
    displayName: 'ハッシュタグエンゲージメント４位',
  },
  {
    id: 'c26',
    displayName: 'ハッシュタグエンゲージメント５位',
  },
  {
    id: 'c27',
    displayName: '興味１位',
  },
  {
    id: 'c28',
    displayName: '興味２位',
  },
  {
    id: 'c29',
    displayName: '興味３位',
  },
  {
    id: 'c30',
    displayName: '興味４位',
  },
  {
    id: 'c31',
    displayName: '興味５位',
  },
  {
    id: 'c32',
    displayName: 'ブランド属性１位',
  },
  {
    id: 'c33',
    displayName: 'ブランド属性２位',
  },
  {
    id: 'c34',
    displayName: 'ブランド属性３位',
  },
  {
    id: 'c35',
    displayName: 'ブランド属性４位',
  },
  {
    id: 'c36',
    displayName: 'ブランド属性５位',
  },
  {
    id: 'c37',
    displayName: 'フォロワー実在率',
  },
  {
    id: 'c38',
    displayName: '直近30投稿の平均いいね数',
  },
  {
    id: 'c39',
    displayName: '直近30投稿の平均コメント数',
  },
  {
    id: 'c40',
    displayName: 'フォロワー外からのいいね',
  },
  {
    id: 'c41',
    displayName: 'いいねのアクティブ率',
  },
  {
    id: 'c42',
    displayName: 'プロフィールに記載のコンタクト情報',
  },
  {
    id: 'c43',
    displayName: 'ステータス',
  },
  {
    id: 'c44',
    displayName: '直近10投稿のリールのいいね数平均値',
  },
  {
    id: 'c45',
    displayName: '直近10投稿のリールのコメント平均',
  },
  {
    id: 'c46',
    displayName: '直近10投稿のリールの再生数平均値',
  },
  {
    id: 'c47',
    displayName: '直近10投稿のリールの平均エンゲージメント',
  },
];

const columnsYoutube = [
  {
    id: 'c1',
    displayName: 'アカウント名',
  },
  {
    id: 'c2',
    displayName: 'チャンネルURL',
  },
  {
    id: 'c3',
    displayName: '国',
  },
  {
    id: 'c4',
    displayName: 'URL',
  },
  {
    id: 'c5',
    displayName: '名前',
  },
  {
    id: 'c6',
    displayName: '登録者数',
  },
  {
    id: 'c7',
    displayName: 'エンゲージメント',
  },
  {
    id: 'c8',
    displayName: '登録者の男性割合',
  },
  {
    id: 'c9',
    displayName: '登録者の女性割合',
  },
  {
    id: 'c10',
    displayName: '登録者の13-17歳の男性の割合',
  },
  {
    id: 'c11',
    displayName: '登録者の18-24歳の男性の割合',
  },
  {
    id: 'c12',
    displayName: '登録者の25-34歳の男性の割合',
  },
  {
    id: 'c13',
    displayName: '登録者の35-44歳の男性の割合',
  },
  {
    id: 'c14',
    displayName: '登録者の45-64歳の男性の割合',
  },
  {
    id: 'c15',
    displayName: '登録者の13-17歳の女性の割合',
  },
  {
    id: 'c16',
    displayName: '登録者の18-24歳の女性の割合',
  },
  {
    id: 'c17',
    displayName: '登録者の25-34歳の女性の割合',
  },
  {
    id: 'c18',
    displayName: '登録者の35-44歳の女性の割合',
  },
  {
    id: 'c19',
    displayName: '登録者の45-64歳の女性の割合',
  },
  {
    id: 'c20',
    displayName: '登録者の所在地１位',
  },
  {
    id: 'c21',
    displayName: '登録者の所在地２位',
  },
  {
    id: 'c22',
    displayName: '登録者の所在地３位',
  },
  {
    id: 'c23',
    displayName: '登録者の中の有名人比率',
  },
  {
    id: 'c24',
    displayName: '直近30投稿の平均いいね数',
  },
  {
    id: 'c25',
    displayName: '直近30投稿の平均低評価数',
  },
  {
    id: 'c26',
    displayName: '直近30投稿の再生数平均値',
  },
  {
    id: 'c27',
    displayName: '直近30投稿の平均コメント数',
  },
  {
    id: 'c28',
    displayName: 'プロフィールに記載のコンタクト情報',
  },
  {
    id: 'c29',
    displayName: 'ステータス',
  },
];

const columnsTiktok = [
  {
    id: 'c1',
    displayName: 'アカウント名',
  },
  {
    id: 'c2',
    displayName: '国',
  },
  {
    id: 'c3',
    displayName: '名前',
  },
  {
    id: 'c4',
    displayName: 'URL',
  },
  {
    id: 'c5',
    displayName: 'フォロワー数',
  },
  {
    id: 'c6',
    displayName: 'エンゲージメント',
  },
  {
    id: 'c7',
    displayName: 'フォロワーの男性割合',
  },
  {
    id: 'c8',
    displayName: 'フォロワーの女性割合',
  },
  {
    id: 'c9',
    displayName: 'フォロワーの13-17歳の男性の割合',
  },
  {
    id: 'c10',
    displayName: 'フォロワーの18-24歳の男性の割合',
  },
  {
    id: 'c11',
    displayName: 'フォロワーの25-34歳の男性の割合',
  },
  {
    id: 'c12',
    displayName: 'フォロワーの35-44歳の男性の割合',
  },
  {
    id: 'c13',
    displayName: 'フォロワーの45-64歳の男性の割合',
  },
  {
    id: 'c14',
    displayName: 'フォロワーの13-17歳の歳の女性の割合',
  },
  {
    id: 'c15',
    displayName: 'フォロワーの18-24歳の女性の割合',
  },
  {
    id: 'c16',
    displayName: 'フォロワーの25-34歳の女性の割合',
  },
  {
    id: 'c17',
    displayName: 'フォロワーの35-44歳の女性の割合',
  },
  {
    id: 'c18',
    displayName: 'フォロワーの45-64歳の女性の割合',
  },
  {
    id: 'c19',
    displayName: 'フォロワーの所在地１位',
  },
  {
    id: 'c20',
    displayName: 'フォロワーの所在地２位',
  },
  {
    id: 'c21',
    displayName: 'フォロワーの所在地３位',
  },
  {
    id: 'c22',
    displayName: 'フォロワーの中の有名人比率',
  },
  {
    id: 'c23',
    displayName: '直近30投稿の平均いいね数',
  },
  {
    id: 'c24',
    displayName: '直近30投稿の再生数平均値',
  },
  {
    id: 'c25',
    displayName: '直近30投稿の平均コメント数',
  },
  {
    id: 'c26',
    displayName: 'プロフィールに記載のコンタクト情報',
  },
  {
    id: 'c27',
    displayName: 'インスタグラムURL',
  },
  {
    id: 'c28',
    displayName: 'ステータス',
  },
];

const lang = {
  en: {
    people: 'Number of people',
    listFollowers: 'List Followers',
    follower: 'Follower',
    check: 'Checking in-house',
    negotiation: 'During negotiations',
    success_download: 'Downloaded Successfully',
    error_download: 'Error occurred while downloading',
    downloading: 'Downloading. Please wait.',
    success_update: 'Updated Successfully',
    error_update: 'Error occurred while updating',
    updating: 'Updating. Please wait.',
    update: 'Update data',
    updateInfo:
      'Click to refresh the data. The data of influencers added to the campaign list will stop when they are added to the campaign list, so please use the "Update" button when you want to update the data. You can download the latest data by updating the data before downloading the CSV.',
  },
  jp: {
    people: '人数',
    listFollowers: 'リストフォロワー',
    follower: 'フォロワー',
    check: '社内確認中',
    negotiation: '交渉中',
    success_download: 'csvをダウンロードしました。',
    error_download: 'csvダウンロードに失敗しました。',
    downloading: 'ダウンロード中です。しばらくお待ちください。',
    success_update:
      'キャンペーンをアッデートしました。画面をリフレッシュしてください。',
    error_update: 'キャンペーンアップデートに失敗しました。',
    updating: 'キャンペーン更新中です。しばらくお待ちください。',
    update: 'データを更新',
    updateInfo:
      'クリックすることでデータを最新にします。キャンペーンリストに追加したインフルエンサーのデータは、キャンペーンリストへ追加した時点でストップするので、データを更新したいタイミングで「更新」ボタンを利用してください。CSVをダウンロードする前に更新することで、最新データのダウンロードが可能です。',
  },
};

const ListPageStatic = ({ isloading, updatedInfos, selCampId, catType }) => {
  const { locale } = useRouter();
  const formatterInt = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  });
  const [staticInfo, setStaticInfo] = useState({
    mems: 0,
    oks: 0,
    okfols: 0,
    memfols: 0,
    imems: 0,
    cmems: 0,
    nmems: 0,
  });

  useEffect(() => {
    let datas = updatedInfos();
    if (!datas || datas.length < 1) return;

    let oks = 0,
      okfols = 0,
      cmems = 0,
      imems = 0,
      nmems = 0,
      fols = 0;
    _.map(datas, (itm) => {
      if (itm.status === 1) {
        //社内確認中
        cmems++;
      } else if (itm.status === 2) {
        //交渉中
        imems++;
      } else if (itm.status === 3) {
        //NG
        nmems++;
      } else {
        //OK
        oks++;
        okfols += itm.detail_doc.profile.followers;
      }

      fols += itm.detail_doc.profile.followers;
    });

    setStaticInfo({
      mems: datas.length,
      oks: oks,
      okfols: okfols,
      memfols: fols,
      imems: imems,
      cmems: cmems,
      nmems: nmems,
    });
  }, [updatedInfos]);

  const downloadCSVDatas = () => {
    let toastId = toast.loading(lang[locale].downloading, {
      duration: 1000000 * 1000,
    });

    return Promise.resolve(
      campaignService
        .downloadCSVData(selCampId, catType)
        .then(async (ret) => {
          if (ret.status !== 'ok') {
            toast.error(ret.msg);
            return;
          }

          if (catType == Constants.snsInstagram) {
            const unresolved = _.map(ret.data, async (itm, idx) => {
              let reelsAvgLikes = 0;
              let reelsAvgComments = 0;
              let reelsAvgEngagement = 0;
              let reelsAvgViews = 0;

              await new Promise((r) => setTimeout(r, idx * 100));

              try {
                await astreamService
                  .getInstagramReels(itm.c1.substring(1))
                  .then((reels) => {
                    if (reels && reels.items && reels.items.length != 0) {
                      let totalLikes = 0;
                      let totalComments = 0;
                      let totalViews = 0;
                      reels.items.forEach((itm) => {
                        totalLikes += itm.like_count;
                        totalComments += itm.comment_count;
                        totalViews += itm.view_count;
                      });

                      reelsAvgLikes = totalLikes / reels.items.length;
                      reelsAvgComments = totalComments / reels.items.length;
                      reelsAvgEngagement =
                        (totalLikes + totalComments) /
                        reels.items.length /
                        itm.c5;
                      reelsAvgViews = totalViews / reels.items.length;

                      itm.c44 = reelsAvgLikes;
                      itm.c45 = reelsAvgComments;
                      itm.c46 = reelsAvgViews;
                      itm.c47 = (reelsAvgEngagement * 100).toFixed(2) + '%';
                    }
                  })
                  .catch((error) => {
                    console.log('error', error);
                  });
              } catch (e) {
                console.log('error', e.message);
              }

              return itm;
            });

            await Promise.all(unresolved);
          }

          toast.remove(toastId);

          toast.success(lang[locale].success_download);

          return ret.data;
        })
        .catch((error) => {
          toast.remove(toastId);

          toast.error(lang[locale].error_download);

          return [];
        }),
    );
  };

  const updateData = () => {
    let toastId = toast.loading(lang[locale].updating, {
      duration: 1000000 * 1000,
    });

    return Promise.resolve(
      campaignService
        .updateCampaignInfluencers(selCampId, catType)
        .then(async (ret) => {
          if (ret.status !== 'ok') {
            toast.error(ret.msg);
            return;
          }

          toast.remove(toastId);

          toast.success(lang[locale].success_update);

          return ret.data;
        })
        .catch((error) => {
          toast.remove(toastId);

          toast.error(lang[locale].error_update);

          return [];
        }),
    );
  };

  const getColumns = () => {
    if (catType === Constants.snsInstagram) return columnsInstagram;
    if (catType === Constants.snsYoutube) return columnsYoutube;
    if (catType === Constants.snsTiktok) return columnsTiktok;
  };

  return (
    <Paper
      sx={{
        padding: '10px 0',
        position: 'relative',
      }}
    >
      {/*
      <PDFDownloadLink document={<ListPagePDF />} fileName="somename.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Download now!'
        }
      </PDFDownloadLink>
      const doc = <ListPagePDF />;
          const asPdf = pdf([]); // {} is important, throws without an argument
          asPdf.updateContainer(doc);
          const blob = await asPdf.toBlob();
          saveAs(blob, 'リストページ.pdf');
      */}
      <Box
        sx={{
          position: 'absolute',
          right: 20,
          top: 20,
          zIndex: '0',
        }}
      >
        <CsvDownloader
          filename={`${catType}_report`}
          extension=".csv"
          separator=","
          columns={getColumns()}
          datas={downloadCSVDatas}
        >
          <Button
            sx={{
              color: '#1377EB !important',
              borderRadius: '20px !important',
              border: '1px solid #1377EB',
              width: '10em',
            }}
            // onClick={e=>downloadPDF()}
          >
            CSV
          </Button>
        </CsvDownloader>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            marginTop: '0.5em',
            overflow: 'visible',
          }}
        >
          <Button
            sx={{
              color: 'white !important',
              backgroundColor: '#1377EB !important',
              borderRadius: '20px !important',
              border: '1px solid #1377EB',
              width: '10em',
            }}
            onClick={(e) => updateData()}
          >
            {lang[locale].update}
          </Button>
          <RoundInfo caption={lang[locale].updateInfo} marginLeft={1} />
        </Box>
      </Box>
      <Box className="valueItemContainer">
        <Box className="valueItem">
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value">{formatterInt.format(staticInfo.mems)}</p>
          )}
          <p className="title">{lang[locale].people}</p>
        </Box>
        <Box className="valueItem">
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value">{formatterInt.format(staticInfo.memfols)}</p>
          )}
          <p className="title">{lang[locale].listFollowers}</p>
        </Box>
        <Box className="valueItem">
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value">{formatterInt.format(staticInfo.oks)}</p>
          )}
          <p className="title">OK {lang[locale].people}</p>
        </Box>
        <Box className="valueItem">
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value">{formatterInt.format(staticInfo.okfols)}</p>
          )}
          <p className="title">OK {lang[locale].follower}</p>
        </Box>
      </Box>
      <Box className="valueItemContainer">
        <Box className="valueItem">
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value">{formatterInt.format(staticInfo.cmems)}</p>
          )}
          <p className="title">{lang[locale].check}</p>
        </Box>
        <Box className="valueItem">
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value">{formatterInt.format(staticInfo.imems)}</p>
          )}
          <p className="title">{lang[locale].negotiation}</p>
        </Box>
        <Box className="valueItem">
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value">{formatterInt.format(staticInfo.nmems)}</p>
          )}
          <p className="title">NG</p>
        </Box>
        <Box className="valueItem">
          {isloading ? (
            <Skeleton width="60%" height={60} sx={{ margin: 'auto' }} />
          ) : (
            <p className="value">{formatterInt.format(staticInfo.oks)}</p>
          )}
          <p className="title">OK</p>
        </Box>
      </Box>
    </Paper>
  );
};

export default ListPageStatic;
