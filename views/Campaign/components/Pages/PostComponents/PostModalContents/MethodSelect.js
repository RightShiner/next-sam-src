import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Radio,
  RadioGroup,
  Typography,
  FormControlLabel,
  Button,
  Checkbox,
  DialogContent,
  DialogActions,
} from '@mui/material';

const MethodSelect = ({
  method,
  checked,
  initMethod,
  handleChange,
  handleCheckChange,
  handleCancelClick,
  handleConfirmClick,
}) => {
  return (
    <>
      <DialogContent className="content" dividers>
        <Typography
          variant="h6"
          textAlign="center"
          sx={{
            fontWeight: 'bold',
          }}
          gutterBottom
        >
          どの方法で投稿を表示しますか？
        </Typography>
        <Box py={6}>
          <RadioGroup
            row
            aria-labelledby="select-method"
            name="select-method"
            value={method}
            sx={{
              justifyContent: 'space-evenly',
            }}
          >
            <FormControlLabel
              onChange={handleChange}
              value="auto"
              control={<Radio />}
              label="自動で取得"
              sx={{
                '& .MuiTypography-root': {
                  fontWeight: method === 'auto' && 'bold',
                },
              }}
            />
            <FormControlLabel
              onChange={handleChange}
              value="manual"
              control={<Radio />}
              label="手動で作成"
              sx={{
                '& .MuiTypography-root': {
                  fontWeight: method === 'manual' && 'bold',
                },
              }}
            />
          </RadioGroup>
        </Box>
        {method === 'auto' ? (
          <>
            <Box className="monitoring">
              <Typography
                variant="h6"
                fontSize="16px"
                sx={{
                  fontWeight: 'bold',
                  lineHeight: '1.5',
                }}
                gutterBottom
              >
                モニタリング
              </Typography>
              <Typography
                fontSize="14px"
                sx={{
                  lineHeight: '1.5',
                }}
                gutterBottom
              >
                指定した条件にマッチした投稿を、A STREAMが自動で取得します。
              </Typography>
              <Typography variant="caption" color="red" gutterBottom>
                &#8251;モニタリング期間内に設定を変更することはできません
              </Typography>
            </Box>
            <Box py={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    disabled={initMethod === 'auto'}
                    checked={checked === 'auto'}
                    onChange={(e) => handleCheckChange('auto')}
                  />
                }
                label="この方法をデフォルトに設定する"
              />
            </Box>
          </>
        ) : (
          <Box py={4} display="flex" justifyContent="center">
            <FormControlLabel
              control={
                <Checkbox
                  disabled={initMethod === 'manual'}
                  checked={checked === 'manual'}
                  onChange={(e) => handleCheckChange('manual')}
                />
              }
              label="この方法をデフォルトに設定する"
            />
          </Box>
        )}
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button className="cancel" onClick={handleCancelClick}>
          キャンセル
        </Button>
        <Button className="confirm" onClick={handleConfirmClick}>
          次へ
        </Button>
      </DialogActions>
    </>
  );
};
export default MethodSelect;
