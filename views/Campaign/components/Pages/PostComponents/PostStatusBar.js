import React, { useState } from 'react';
import {
  Box,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DateToString } from 'libs/commonFunc';

const text = {
  hold: 'モニタリング待機中...',
  start: 'モニタリング中...',
  end: 'モニタリング終了',
};

const PostStatusBar = ({ data, setOpen, monitoringStatus }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Accordion
      elevation={0}
      className="status_bar"
      onChange={(e, expanded) => setExpanded(expanded)}
    >
      <AccordionSummary
        className="summary"
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography className={monitoringStatus}>
          {text[monitoringStatus]}
        </Typography>
        <Typography sx={{ color: '#0092E4', fontSize: '14px' }}>
          {expanded ? '短く表示' : '設定内容を表示'}
        </Typography>
      </AccordionSummary>
      <AccordionDetails className="details">
        <Stack spacing={3}>
          <Typography>
            取得モード：
            <span>
              {data.hasAllTagAndMention ? 'すべての投稿' : '条件を指定'}
            </span>
          </Typography>
          <Typography>
            期間：
            <span>
              {DateToString(data.monitorFrom)}&nbsp;~&nbsp;
              {DateToString(data.monitorTo)}
            </span>
          </Typography>
          <Box display="flex" alignItems="baseline">
            <Typography sx={{ minWidth: 'max-content' }}>アラート：</Typography>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              flexWrap="wrap"
              width="84%"
            >
              {data.hashtag.map((item, key) => {
                return (
                  <Box className="badge hashtag" key={key}>
                    {'#' + item}
                  </Box>
                );
              })}
              {data.mention.map((item, key) => {
                return (
                  <Box className="badge mention" key={key}>
                    {'@' + item}
                  </Box>
                );
              })}
            </Stack>
            {monitoringStatus === 'hold' && (
              <Button
                className="edit_button"
                onClick={() =>
                  setOpen((prev) => ({ ...prev, monitoring: true }))
                }
              >
                内容を修正
              </Button>
            )}
          </Box>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default PostStatusBar;
