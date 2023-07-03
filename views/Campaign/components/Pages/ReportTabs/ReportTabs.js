/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { memberList } from 'mockup/campain_list';
import { ReportFeedTable } from '../../Table'


const ReportTabs = ({ members, curType }) => {

  return (
    <Box>
      {/* <ListPage display={`${curType === 'list' ? 'block' : 'none'}`} />
      <PostPage display={`${curType === 'post' ? 'block' : 'none'}`} />
      <ReportPage display={`${curType === 'report' ? 'block' : 'none'}`} /> */}
      {curType === 'feed' && 
        <ReportFeedTable 
          headCells={feedHeadCells}
          data={members}
          status={1}
        />
      }
      {curType === 'story' && 
        <ReportFeedTable 
          headCells={storyHeadCells}
          data={members}
          status={2}
        />
      }
      {curType === 'rir' && 
        <ReportFeedTable 
          headCells={rirHeadCells}
          data={members}
          status={3}
        />
      }
    </Box>
  );
};

export default ReportTabs;

ReportTabs.propTypes = {
  curType: PropTypes.string.isRequired,
};