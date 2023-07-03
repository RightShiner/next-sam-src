import React from 'react';
import ContentLoader from 'react-content-loader';

const WaitingLoader = () => {
  return (
    <ContentLoader 
      speed={3}
      width={'100%'}
      height={'100%'}
      viewBox="0 0 100% 100%"
      backgroundColor="#f3f3f3"
      foregroundColor="#1377EB"
    >
      <circle cx="250" cy="100" r="100" />
      <rect x="170" y="220" width="160" height="30" rx="3" />
      <rect x="100" y="260" width="300" height="100" rx="3" />
      <rect x="50" y="400" width="180" height="30" rx="3" />
      <rect x="250" y="400" width="180" height="30" rx="3" />
      <rect x="50" y="450" width="180" height="30" rx="3" />
      <rect x="250" y="450" width="180" height="30" rx="3" />
      <rect x="50" y="500" width="180" height="30" rx="3" />
      <rect x="250" y="500" width="180" height="30" rx="3" />
    </ContentLoader>
  );
};

export default WaitingLoader;
