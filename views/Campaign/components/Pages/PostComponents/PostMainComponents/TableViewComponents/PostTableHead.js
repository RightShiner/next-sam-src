import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';

const headCells = [
  {
    id: 'media',
    label: '',
    align: 'center',
  },
  {
    id: 'caption',
    label: '投稿文章',
    align: 'center',
    maxWidth: '100px',
  },
  {
    id: 'fullname',
    label: 'アカウント',
    align: 'center',
  },
  {
    id: 'engagement',
    label: 'EGM',
    align: 'left',
  },
  {
    id: 'like_count',
    label: 'いいね',
    align: 'left',
  },
  {
    id: 'comment_count',
    label: 'コメント',
    align: 'left',
  },
  {
    id: 'taken_at_org',
    label: '投稿日時',
    align: 'left',
  },
];

const PostTableHead = ({ order, orderBy, onRequestSort }) => {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding}
            maxWidth={headCell?.maxWidth}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              fontWeight: 'bold',
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {headCell.id !== 'caption' && orderBy === headCell.id && (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              )}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default PostTableHead;
