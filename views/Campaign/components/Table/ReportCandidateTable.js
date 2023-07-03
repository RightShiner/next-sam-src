import React, { useEffect, useState } from 'react';
import {Box, Typography, Paper} from '@mui/material';
import {ReportTabSelect} from '../Pages/ReportTabs';
import RelativeImage from 'components/RelativeImage';

const CandidateItem = ({row, showAlert, classes}) => {
  const handleSelect = (val) => {
    showAlert(true);
  }

  return (
    <Paper className={classes.candidateItem}>
      <Box sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 5fr 4fr',
          alignItems: 'center'
        }}
      >    
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginLeft="20px"
        >
          <RelativeImage
            isRound
            imgSrc={row.avatar}
            sx={{width: '3rem !important', height: '3rem !important', margin: '.5rem'}}
          />
        </Box>
        <Box marginLeft="20px">
          <Typography>{row.name}</Typography>
        </Box>
        <Box 
          sx={{
            flex: 'auto',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <ReportTabSelect curType='' onSelect={handleSelect}/>
        </Box>
      </Box>
    </Paper>
  )
};

export default function ReportCandidateTable({getDatas, displayAlert, classes}) {
  const [data, setData] = useState([]);
  useEffect(() => {
    setData([...getDatas()]);
  }, [getDatas]);

  return (
    <Box>
      {data.map((row, index) => (
        <CandidateItem 
          key={index} 
          row={row} 
          showAlert={displayAlert}
          classes={classes}
        />
      ))}
    </Box>
  );
}