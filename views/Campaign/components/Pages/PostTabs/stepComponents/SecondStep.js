/* eslint-disable react/no-unescaped-entities */
import React, { useCallback, useState } from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Item from '@mui/material/Grid';
import {
  FltInfluencerHash,
  FltInfluencerMention,
} from 'views/Common/SearchFilters';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const SecondStep = ({
  collections,
  setCollections,
  disabled,
  searchType,
  setSearchType,
  secondStepDisabled,
}) => {
  const theme = useTheme();

  const handleOperator = (tag, items, field) => {
    let fieldArray = items.map((item) => {
      return item.value;
    });

    setCollections({
      ...collections,
      [field]: fieldArray,
    });
  };

  const handleChecked = (val, field) => {
    setCollections({
      ...collections,
      [field]: val,
    });
  };

  const handleSearchAllClick = useCallback(() => {
    setCollections((collections) => ({
      ...collections,
      hasAllTagAndMention: true,
    }));
    setSearchType('all');
  }, [setCollections]);

  const handleSearchConditionClick = useCallback(() => {
    setCollections((collections) => ({
      ...collections,
      hasAllTagAndMention: false,
    }));
    setSearchType('condition');
  }, [setCollections]);

  return (
    <>
      {!searchType && (
        <>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              marginBottom: '1rem',
            }}
          >
            <Item
              sx={{
                padding: 6,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all',
                transitionDuration: '150ms',
                color: theme.palette.monitoring.searchAllActive,
                backgroundColor: theme.palette.monitoring.searchAll,
                '&:hover': {
                  color: theme.palette.monitoring.searchTextActive,
                  backgroundColor: theme.palette.monitoring.searchAllActive,
                },
              }}
              onClick={handleSearchAllClick}
            >
              <Typography
                fontSize="1.4rem"
                fontWeight="bold"
                marginBottom="0.5rem"
              >
                全投稿を取得
              </Typography>
              <img
                src={'/images/monitoring/search_all.png'}
                style={{
                  display: 'block',
                  maxWidth: '32rem',
                }}
              />
            </Item>
            <Item
              sx={{
                padding: 6,
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all',
                transitionDuration: '150ms',
                color: theme.palette.monitoring.searchConditionActive,
                backgroundColor: theme.palette.monitoring.searchCondition,
                '&:hover': {
                  color: theme.palette.monitoring.searchTextActive,
                  backgroundColor:
                    theme.palette.monitoring.searchConditionActive,
                },
              }}
              onClick={handleSearchConditionClick}
            >
              <Typography
                fontSize="1.4rem"
                fontWeight="bold"
                marginBottom="0.5rem"
              >
                条件を指定して取得
              </Typography>
              <img
                src={'/images/monitoring/search_condition.png'}
                style={{
                  display: 'block',
                  maxWidth: '32rem',
                }}
              />
            </Item>
          </Box>
        </>
      )}
      {searchType === 'all' && (
        <Box marginBottom="1rem">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography fontWeight="bold" marginRight="1.4rem">
              全投稿取得モード
            </Typography>
            <small>
              設定したハッシュタグ、メンションなどがついていない投稿を見える化し管理しやすくなります。
            </small>
          </Box>
          <FltInfluencerHash
            clearFlag={false}
            tip="ハッシュタグ"
            icon={false}
            phstr="#ハッシュタグ"
            initValue={collections.hashtag}
            setValues={handleOperator}
            disabled={disabled}
          />
          <FltInfluencerMention
            clearFlag={false}
            tip="メンション"
            icon={false}
            phstr="@メンション"
            initValue={collections.mention}
            setValues={handleOperator}
            disabled={disabled}
          />
          <FltInfluencerMention
            clearFlag={false}
            tip="@タグ"
            icon={false}
            phstr="@タグ"
            initValue={collections.tag}
            setValues={handleOperator}
            disabled={disabled}
          />
        </Box>
      )}
      {searchType === 'condition' && (
        <Box marginBottom="1rem">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography fontWeight="bold" marginRight="1.4rem">
              条件指定取得モード
            </Typography>
            <small>
              設定したハッシュタグ、メンションなどがついていない投稿を見える化し管理しやすくなります。
            </small>
          </Box>
          {secondStepDisabled && (
            <Typography
              sx={{
                marginTop: '1rem',
                fontSize: '0.9rem',
                color: theme.palette.monitoring.danger,
                fontWeight: 'bold',
              }}
            >
              タグ、またはメンションを1つ以上指定してください。
            </Typography>
          )}
          <FltInfluencerHash
            clearFlag={false}
            tip="ハッシュタグ"
            icon={false}
            phstr="#ハッシュタグ"
            initValue={collections.hashtag}
            setValues={handleOperator}
            disabled={disabled}
            isError={secondStepDisabled}
          />
          <FltInfluencerMention
            clearFlag={false}
            tip="メンション"
            icon={false}
            phstr="@メンション"
            initValue={collections.mention}
            setValues={handleOperator}
            disabled={disabled}
            isError={secondStepDisabled}
          />
          <FltInfluencerMention
            clearFlag={false}
            tip="@タグ"
            icon={false}
            phstr="@タグ"
            initValue={collections.tag}
            setValues={handleOperator}
            disabled={disabled}
            isError={secondStepDisabled}
          />
        </Box>
      )}
    </>
  );
};

export default SecondStep;
