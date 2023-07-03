import React, { useEffect, useState } from 'react';
import {Box, Typography, Paper} from '@mui/material';
import {ReportTabSelect} from '../Pages/ReportTabs';
import RelativeImage from 'components/RelativeImage';

const CandidateItem = ({row, setType, classes}) => {
  const handleSelect = (newType) => {
    setType(row._id, newType);
  }

  return (
    <Paper className={classes.candidateItem} style={{width: 'fit-content !important'}}>
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

export default function ReportCandidateEditTable({getDatas, updateCandiates, classes}) {
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
          setType={updateCandiates}
          classes={classes}
        />
      ))}
    </Box>
  );
}