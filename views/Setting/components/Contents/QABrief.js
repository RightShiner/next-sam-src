import _ from 'lodash';
import clsx from 'clsx';
import NextLink from 'next/link'
import React, {useMemo} from 'react';
import {Typography, Box} from '@mui/material';
import {useTheme} from '@mui/material/styles';
import {makeStyles} from '@mui/styles'; 
import styles from './styles';
export default function QABrief() {
  const theme = useTheme();
  const useStyles = useMemo(() => {
    return makeStyles(styles, {defaultTheme: theme});
  }, [theme]);
  const classes = useStyles();

  return (
    <Box sx={{width: '80%', margin: '20px auto'}} data-aos={'fade-up'}>
      <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '20px !important'}}>
        <Typography className={clsx(classes.qaTitle, classes.mb40)}>よくある質問</Typography>
      </Box>
      <Box className={'qaSubWrapper'}>
        <Typography className={clsx(classes.qaSubTitle, classes.mb20)}>自分のチームに最適なプランはどれですか？</Typography>
        <Typography className={classes.mb20}>Astreamは、1人のフリーランサーから1万人の従業員を抱える多国籍企業、そしてその中間の企業まで、さまざまな企業に最適です。それを踏まえた上で、どのプランが最適なのか？</Typography>
        <Typography className={classes.mb20}><span className={classes.boldFont}>Essentials plan:</span>このプランは、すでにインフルエンサー・マーケティングを始めていて、より定期的なプロジェクトや継続的なキャンペーンを行う予定で、インフルエンサーとの連携をもう少し本格的に行いたいと考えている企業に最適です。</Typography>
        <Typography className={classes.mb20}><span className={classes.boldFont}>Performance plan:</span>このプランはインフルエンサーとの連携や検証を行っている代理店、インフルエンサーに重点を置いているブランドに最適です。</Typography>
        <Typography className={classes.mb20}><span className={classes.boldFont}>Advanced Plan:</span>このプランは、インフルエンサーマーケティングの成果を追求したい、複数人以上の大型のチームに最適です。</Typography>
        <Typography className={classes.mb20}><span className={classes.boldFont}>Enterprise:</span>利用回数の上限はありません。自由自在にインフルエンサーマーケティングを追求したいチームは気軽にご相談ください。また追加機能のご相談も承ります。</Typography>
      </Box>
      <Box className={clsx('qaSubWrapper', classes.mt70)}>
        <Typography className={clsx(classes.qaSubTitle, classes.mb20)}>ぺージ検索とは？</Typography>
        <Typography className={classes.mb40}>Astreamは、インフルエンサーを探すための検索エンジンです。使い方は、ターゲット層の情報を入力して「検索」ボタンをクリックします。「検索」ボタンをクリックすると、ターゲット層にアピールできるインフルエンサーが表示されます。「検索」ボタンをクリックする、もしくはページを「Load」して表示アカウントを増やすと、月間のページ検索数に1回カウントされます。</Typography>
      </Box>
      <Box className={clsx('qaSubWrapper', classes.mt70)}>
        <Typography className={clsx(classes.qaSubTitle, classes.mb20)}>プロフィール表示とは？</Typography>
        <Typography className={classes.mb20}>検索結果をクリックすると、インフルエンサーのプロフィールが表示されます。検索結果をクリックして統計情報を表示すると、月間で1プロフィール表示としてカウントされます。</Typography>
        <Typography className={classes.mb20}>プロフィールの概要は以下の通りです。</Typography>
        <Box className={classes.mb40}>
          <Box className={classes.upgradeprofilesummary}>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              平均いいね
            </Box>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              フォロワーの国
            </Box>
          </Box>
          <Box className={classes.upgradeprofilesummary}>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              フォロワー数
            </Box>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              フォロワーの都市
            </Box>
          </Box>
          <Box className={classes.upgradeprofilesummary}>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              エンゲージメント率
            </Box>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              男女比
            </Box>
          </Box>
          <Box className={classes.upgradeprofilesummary}>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              最近の投稿
            </Box>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              フォロワーの年齢
            </Box>
          </Box>
          <Box className={classes.upgradeprofilesummary}>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              フォロワーのアクティブ率
            </Box>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              など
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={clsx('qaSubWrapper', classes.mt70)}>
        <Typography className={clsx(classes.qaSubTitle, classes.mb20)}>フルレポートとは？</Typography>
        <Typography className={classes.mb20}>フルレポートではより詳細なフォロワーとインフルエンサーのデータが数ページに渡って表示されます。プロフィールの中で「フルレポートを表示」をクリックすると、月間で1つのフルレポートとしてカウントされます。</Typography>
        <Typography className={classes.mb20}>フルレポートには以下のような詳細が追加で表示されます。</Typography>
        <Box className={classes.mb40}>
          <Box className={classes.upgradeprofilesummary}>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              成長率
            </Box>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              ハッシュタグエンゲージメント
            </Box>
          </Box>
          <Box className={classes.upgradeprofilesummary}>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              フォロワーの興味(IGのみ)
            </Box>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              フォロワーの好みのブランド傾向(IGのみ)
            </Box>
          </Box>
          <Box className={classes.upgradeprofilesummary}>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              エンゲージメントの推移
            </Box>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              など
            </Box>
          </Box>
          <Box className={classes.upgradeprofilesummary}>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              フォロワーの言語
            </Box>
          </Box>
          <Box className={classes.upgradeprofilesummary}>
            <Box className={classes.upgradeprofilesummarysub}>
              <Box
                component={'img'}
                src={'/images/svgs/tick.svg'}
                marginRight={1.5}
              />
              プロフィールに含まれるデータの詳細
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className={clsx('qaSubWrapper', classes.mt70)}>
        <Typography className={clsx(classes.qaSubTitle, classes.mb20)}>CSVとは？</Typography>
        <Typography className={classes.mb20}>キャンペーンリストに保存したインフルエンサーやフォロワーの詳細をCSVにエクスポートすることができます。</Typography>
        <Typography className={classes.mb20}>CSVは、キャンペーン後のインフルエンサ―のデータ解析をしたり、チームやクライアントと情報を共有したりするのに最適です。</Typography>
        <Typography className={classes.mb20}>CSVで出力した際のアカウントの数が、月間のカウントの数となります。</Typography>
      </Box>
      <Box className={clsx('qaSubWrapper', classes.mt70)}>
        <Typography className={clsx(classes.qaSubTitle, classes.mb20)}>キャンペーン登録とは？</Typography>
        <Typography className={classes.mb20}>キャンペーン登録は、好みのインフルエンサーを見つけた際に「キャンペーンリストに登録」をすることです。</Typography>
        <Typography className={classes.mb20}>「登録」のボタンを押して、キャンペーンリストにチェックマークをいれると、月間で1つのキャンペーン登録としてカウントされます。</Typography>
      </Box>
    </Box>
  );
}