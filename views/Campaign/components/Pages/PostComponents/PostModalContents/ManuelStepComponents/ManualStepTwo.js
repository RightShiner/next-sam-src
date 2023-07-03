import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Divider,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DropzoneArea } from 'mui-file-dropzone';
import axios from 'axios';

const BUCKET_NAME = 'https://astream-stories-image.s3.amazonaws.com/';

const LinearProgressWithLabel = ({ name }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let timer;
    if (progress !== 100) {
      timer = setTimeout(() => {
        setProgress((prevProgress) => prevProgress + 1);
      }, 1);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [progress]);

  return (
    <Box width="100%" my={2} display="flex" alignItems="center" gap="20px">
      <span style={{ cursor: 'pointer', color: '#6D6D6D' }}>&#10006;</span>
      <img src="/images/preview_upload.png" alt="preview" />
      <Stack spacing="12px" sx={{ width: '100%', minWidth: 35 }}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography
            sx={{ fontSize: '12px', fontWeight: 'bold', color: '#303030' }}
          >
            {name}
          </Typography>
          <Typography
            sx={{ fontSize: '12px', fontWeight: 'bold', color: '#303030' }}
          >{`${Math.round(progress)}%`}</Typography>
        </Box>
        <Box sx={{ width: '100%', mr: 1 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            color={progress === 100 ? 'success' : 'primary'}
          />
        </Box>
      </Stack>
      {progress === 100 && (
        <img src="/images/complete_upload.png" alt="complete" />
      )}
    </Box>
  );
};

const ManualStepTwo = ({ members, catType, property, handleProperty }) => {
  const [files, setFiles] = useState([]);
  const [progressInfos, setProgressInfos] = useState([]);
  const [messages, setMessages] = useState([]);
  const [fileInfos, setFileInfos] = useState([]);

  const handleChange = (files) => {
    setFiles(files);
  };

  const handleDelete = (file) => {
    let newValue = property.display_url.filter((itm) => {
      return itm.id !== file.lastModified;
    });
    handleProperty('display_url', newValue);
  };

  const handleDrop = async (files) => {
    let file = files[0];

    if (files.length > 0) {
      axios
        .post('/api/s3/uploadFile', {
          infId: members[0].accountId,
          name: file.name,
          type: file.type,
        })
        .then((res) => {
          console.log(res.data);
          const url = res.data.url;
          const path = res.data.key;
          const options = {
            headers: {
              'Content-Type': file.type,
              'Access-Control-Allow-Origin': '*',
            },
          };
          axios
            .put(url, file, options)
            .then((res) => {
              console.log('success', res);
            })
            .catch((error) => {
              console.error({ error });
            });
          let fileType = file.type.slice(0, file.type.indexOf('/'));
          let display_url = BUCKET_NAME + path;
          let newData = {
            id: file.lastModified,
            type: fileType,
            url: display_url,
          };
          let newValue = (property?.display_url ?? []).concat(newData);
          handleProperty('display_url', newValue);
        })
        .catch((err) => console.error({ err }));
    }
  };

  return (
    <Stack spacing={5} divider={<Divider flexItem />}>
      <Box>
        <Typography className="section_title">
          写真、動画をアップロード
        </Typography>
        <DropzoneArea
          maxFileSize={10000000000}
          onDrop={handleDrop}
          onDelete={handleDelete}
          onChange={handleChange}
          dropzoneText="ここに、ファイルをドラッグ & ドロップ
        または"
          showPreviews={true}
          showPreviewsInDropzone={false}
          filesLimit={10}
        />
        {files.map((file, key) => {
          return <LinearProgressWithLabel key={key} name={file.name} />;
        })}
      </Box>
      {catType === 'tiktok' && (
        <Box>
          <Typography className="section_title">使用された曲</Typography>
          <TextField
            value={property?.song_used}
            onChange={(e) => handleProperty('song_used', e.target.value)}
            placeholder="曲名を入力できます"
            sx={{
              width: '100%',
              '& input': {
                padding: '11px 16px',
                fontSize: '14px',
              },
            }}
          />
        </Box>
      )}
      <Box>
        <Typography className="section_title">
          投稿文章を入力<span>（この項目は、あとから再編集可能です）</span>
        </Typography>
        <TextField
          multiline
          rows={6}
          value={property?.caption}
          onChange={(e) => handleProperty('caption', e.target.value)}
          placeholder="テキスト"
          sx={{
            width: '100%',
            '& input': {
              padding: '11px 16px',
              fontSize: '14px',
            },
          }}
        />
      </Box>
    </Stack>
  );
};
export default ManualStepTwo;
