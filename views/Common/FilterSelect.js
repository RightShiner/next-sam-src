/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button } from '@mui/material';
import Keyword from 'constants/lang';
import Constants from 'constants/constants';
import { useRouter } from 'next/router';

export default function FilterSelect({ curType, onSelect }) {
  const { locale } = useRouter();
  return (
    <Box>
      <Button
        className={`${
          curType === Constants.snsInstagram ? 'active' : 'inactive'
        }`}
        variant={'outlined'}
        size="medium"
        onClick={(e) => onSelect(Constants.snsInstagram)}
      >
        <svg
          className="manual"
          fill="none"
          height="13"
          width="13"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={`${curType === Constants.snsInstagram ? '#fff' : '#000'}`}
            d="M0 9.68V3.32l.06-.4A3.55 3.55 0 0 1 2.74.12c.19-.06.39-.08.58-.11h6.36l.4.06a3.55 3.55 0 0 1 2.81 2.68c.06.19.08.39.11.58v6.36l-.06.4a3.55 3.55 0 0 1-2.68 2.81c-.19.06-.39.08-.58.11H3.32l-.4-.06a3.55 3.55 0 0 1-2.81-2.68c-.06-.19-.08-.39-.11-.58zm6.5-8.52H3.7a2.44 2.44 0 0 0-2.54 2.51v5.67a2.43 2.43 0 0 0 2.5 2.51h5.7c.28 0 .57-.04.84-.13a2.4 2.4 0 0 0 1.66-2.35V3.65a2.45 2.45 0 0 0-2.53-2.5H6.5z"
          ></path>
          <path
            fill={`${curType === Constants.snsInstagram ? '#fff' : '#000'}`}
            d="M9.85 6.5A3.37 3.37 0 0 1 6.5 9.85 3.36 3.36 0 0 1 3.15 6.5 3.36 3.36 0 0 1 6.5 3.15 3.36 3.36 0 0 1 9.85 6.5zm-1.15 0a2.2 2.2 0 0 0-4.4 0 2.2 2.2 0 0 0 4.4 0zM9.99 2.17c.46 0 .85.38.85.84 0 .46-.38.85-.84.85A.85.85 0 0 1 9.15 3c0-.45.38-.83.84-.84z"
          ></path>
        </svg>
        {Keyword[locale].caption.instagram}
      </Button>
      <Button
        className={`${
          curType === Constants.snsYoutube ? 'active' : 'inactive'
        }`}
        variant={'outlined'}
        size="medium"
        onClick={(e) => onSelect(Constants.snsYoutube)}
      >
        <svg
          className="manual"
          fill="none"
          height="12"
          viewBox="0 0 16 12"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={`${curType === Constants.snsYoutube ? '#fff' : '#000'}`}
            clipRule="evenodd"
            d="M14.2602 0.367059C14.9456 0.564706 15.4859 1.14353 15.6704 1.87765C16.0131 3.21882 15.9999 6.01412 15.9999 6.01412C15.9999 6.01412 15.9999 8.79529 15.6704 10.1365C15.4859 10.8706 14.9456 11.4494 14.2602 11.6471C13.0082 12 7.99997 12 7.99997 12C7.99997 12 3.00493 12 1.7397 11.6329C1.05436 11.4353 0.514001 10.8565 0.329488 10.1224C0 8.79529 0 6 0 6C0 6 0 3.21882 0.329488 1.87765C0.514001 1.14353 1.06754 0.550588 1.7397 0.352941C2.99175 0 7.99997 0 7.99997 0C7.99997 0 13.0082 0 14.2602 0.367059ZM10.6667 6.00001L6.40002 8.72728V3.27274L10.6667 6.00001Z"
            fillRule="evenodd"
          ></path>
        </svg>
        {Keyword[locale].caption.youtube}
      </Button>
      <Button
        className={`${curType === Constants.snsTiktok ? 'active' : 'inactive'}`}
        variant={'outlined'}
        size="medium"
        onClick={(e) => onSelect(Constants.snsTiktok)}
      >
        <svg
          className="manual"
          fill="none"
          height="15"
          viewBox="0 0 12 16"
          width="12"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill={`${curType === Constants.snsTiktok ? '#fff' : '#000'}`}
            clipRule="evenodd"
            d="M9.46167 0C9.71181 2.27047 10.9125 3.62412 13 3.76812V6.32181C11.7902 6.44661 10.7306 6.029 9.49805 5.24177V10.0179C9.49805 16.0853 3.23093 17.9814 0.711344 13.6324C-0.907739 10.834 0.083722 5.92339 5.27752 5.72659V8.41947C4.88185 8.48668 4.45888 8.59228 4.07231 8.73148C2.91712 9.1443 2.26221 9.91712 2.44413 11.2804C2.79432 13.8917 7.33321 14.6645 6.95573 9.56191V0.00480016H9.46167V0Z"
            fillRule="evenodd"
          ></path>
        </svg>
        {Keyword[locale].caption.tiktok}
      </Button>
    </Box>
  );
}

FilterSelect.propTypes = {
  curType: PropTypes.string.isRequired,
  onSelect: PropTypes.func,
};
