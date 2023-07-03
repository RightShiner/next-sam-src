import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Box, Dialog, DialogContent } from '@mui/material';
import toast from 'react-hot-toast';
import { useTheme } from '@mui/material/styles';
import { useMainContext } from 'context/MainContext';
import InfluencerDetailInstagram from './Detail/InfluencerDetailInstagram';
import InfluencerDetailYoutube from './Detail/InfluencerDetailYoutube';
import InfluencerDetailTiktok from './Detail/InfluencerDetailTiktok';
import Constants from 'constants/constants';
import { modashService } from 'services';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function InfluencerDetail({
  open,
  handleClose,
  data,
  feed,
  reels,
  igtv,
}) {
  const { selectedInfluencer } = useMainContext();
  const [isLoading, setLoading] = useState(false);

  const theme = useTheme();
  const [enthinity, setEnthinity] = useState([]);
  const [language, setLanguage] = useState([]);
  const [ages, setAges] = useState([]);
  const [agesrange, setAgesRange] = useState([]);
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [brand, setBrand] = useState([]);
  const [interest, setInterest] = useState([]);
  const [downloadEnabled, setDownloadEnabled] = useState(false);

  useEffect(() => {
    if (!open) return;

    setDownloadEnabled(false);

    let temp = [];
    let matchData = null;
    data.audience?.ethnicities?.map((itm) => {
      matchData = _.find(data.audienceLikers?.ethnicities, (audItm) => {
        return audItm.code === itm.code;
      });

      temp.push({
        code: itm.name,
        likers: itm.weight,
        followers: matchData?.weight ?? 0,
      });
    });

    setEnthinity(temp);

    temp = [];
    data.audience?.languages?.map((itm) => {
      matchData = _.find(data.audienceLikers?.languages, (audItm) => {
        return audItm.code === itm.code;
      });

      temp.push({
        code: itm.name ?? 'Other',
        likers: matchData ? itm.weight : 0,
        followers: matchData?.weight ?? itm.weight,
      });
    });

    setLanguage(temp);

    temp = [];
    _.map(data.audience?.gendersPerAge, (itm) => {
      matchData = data.audienceLikers?.gendersPerAge?.find((audItm) => {
        return audItm.code === itm.code;
      });

      temp.push({
        code: itm.code ?? 'Other',
        malelikers: matchData ? itm.male : 0,
        femalelikers: matchData ? itm.female : 0,
        malefollowers: matchData?.male ?? itm.male,
        femalefollowers: matchData?.female ?? itm.female,
      });
    });
    setAges(temp);

    temp = [];
    _.map(data.audience?.ages, (itm) => {
      matchData = data.audienceLikers?.ages?.find((audItm) => {
        return audItm.code === itm.code;
      });

      temp.push({
        code: itm.code ?? 'Other',
        likers: matchData?.weight ?? 0,
        followers: itm.weight,
      });
    });
    setAgesRange(temp);

    temp = [];
    _.map(data.audience?.geoCountries, (itm) => {
      matchData = data.audienceLikers?.geoCountries?.find((audItm) => {
        return audItm.code === itm.code;
      });

      temp.push({
        code: itm.name ?? 'Other',
        likers: matchData?.weight ?? 0,
        followers: itm.weight,
      });
    });
    setCountries(temp);

    temp = [];
    _.map(data.audience?.geoCities, (itm) => {
      matchData = data.audienceLikers?.geoCities?.find((audItm) => {
        return audItm.name === itm.name;
      });

      temp.push({
        code: itm.name ?? 'Other',
        likers: matchData?.weight ?? 0,
        followers: itm.weight,
      });
    });
    setCities(temp);

    temp = [];
    _.map(data.audience?.interests, (itm) => {
      matchData = data.audienceLikers?.interests?.find((audItm) => {
        return audItm.name === itm.name;
      });

      temp.push({
        code: itm.name ?? 'Other',
        likers: matchData?.weight ?? 0,
        followers: itm.weight,
      });
    });
    setInterest(temp);

    temp = [];
    _.map(data.audience?.brandAffinity, (itm) => {
      matchData = data.audienceLikers?.brandAffinity?.find((audItm) => {
        return audItm.name === itm.name;
      });

      temp.push({
        code: itm.name ?? 'Other',
        likers: matchData?.weight ?? 0,
        followers: itm.weight,
      });
    });
    setBrand(temp);
  }, [open, selectedInfluencer]);

  const downloadModashPDF = () => {
    setLoading(true);
    const input = document.getElementById('influencer_detail_wrapper');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'pt', [
        (input.offsetWidth * 72) / 96,
        (input.offsetHeight * 72) / 96,
      ]);
      pdf.addImage(
        imgData,
        'JPEG',
        0,
        0,
        (input.offsetWidth * 72) / 96,
        (input.offsetHeight * 72) / 96,
      ); //, input.offsetWidth, input.offsetHeight);
      // pdf.output('dataurlnewwindow');
      pdf.save(data.profile.username + '.pdf');
      setLoading(false);
    });
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={'body'}
      sx={{
        '& .MuiDialog-paper': {
          width: '720px',
          minWidth: '720px',
          background:
            'linear-gradient(157.53deg,#edf7fe 11.25%,#fff 50.77%,#edf7fe 92.83%)',
        },
      }}
    >
      <DialogContent
        sx={{
          paddingLeft: '35px !important',
          paddingRight: '35px !important',
          background:
            'linear-gradient(157.53deg,#edf7fe 11.25%,#fff 50.77%,#edf7fe 92.83%)',
          boxShadow: 'unset !important',
        }}
        id="influencer_detail_wrapper"
      >
        {/*<InfluencerDetailLoading /> : */}
        {data !== null && (
          <Box>
            <Button
              disabled={!downloadEnabled}
              sx={{
                position: 'fixed',
                top: '1rem',
                right: '2rem',
                backgroundColor: theme.palette.primary.main,
                color: 'white',
              }}
              onClick={(e) => downloadModashPDF()}
              variant={'outlined'}
            >
              {!downloadEnabled
                ? 'お待ち下さい'
                : isLoading
                ? '取得中'
                : 'ダウンロード'}
            </Button>
            {selectedInfluencer.type === Constants.snsInstagram && (
              <InfluencerDetailInstagram
                data={data}
                feed={feed}
                reels={reels}
                igtv={igtv}
                enthinity={enthinity}
                language={language}
                ages={ages}
                agesrange={agesrange}
                countries={countries}
                cities={cities}
                brand={brand}
                interest={interest}
                open={open}
                setDownloadEnabled={setDownloadEnabled}
              />
            )}
            {selectedInfluencer.type === Constants.snsYoutube && (
              <InfluencerDetailYoutube
                data={data}
                enthinity={enthinity}
                language={language}
                ages={ages}
                agesrange={agesrange}
                countries={countries}
                cities={cities}
                brand={brand}
                interest={interest}
                open={open}
                setDownloadEnabled={setDownloadEnabled}
              />
            )}
            {selectedInfluencer.type === Constants.snsTiktok && (
              <InfluencerDetailTiktok
                data={data}
                setDownloadEnabled={setDownloadEnabled}
                open={open}
              />
            )}
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}

InfluencerDetail.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
};
