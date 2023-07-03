import React, {useRef} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';

import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';

import Keyword from 'constants/lang';

const Question = ({user}) => {

  const questionRef = useRef();

  const sendQuestion = (e) => {
    toast.success('お問合せありがとうございます。1営業日以内にお返事いたします。');
  }
  return (
    <Fixed>
      <Container className='research content-wrapper'>
        <Box marginTop={2}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 700,
            }}
          >
            {Keyword.nav.question}
          </Typography>
        </Box>
        <Box>
          <TextField
            multiline
            rows="10"
            variant="outlined"
            size="small"
            sx={{width: '80%', marginTop: '10px', fontSize: '14px', padding: '8px'}}
            inputRef={questionRef}
          />
        </Box>
        <Box sx={{width: '80%', display: 'flex', justifyContent:'center'}}>
          <Button className="active" onClick={sendQuestion}>送信</Button>
        </Box>
      </Container>
    </Fixed>
  );
};

export default Question;
