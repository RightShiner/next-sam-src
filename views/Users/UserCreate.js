import _ from 'lodash';
import React from 'react';
import Fixed from 'layouts/Fixed';
import Container from 'layouts/Fixed/components/Container';
import CreateComponent from './components/CreateComponent';

const UserCreate = () => {
  return (
    <Fixed hideAnnouncement={true}>
      <Container>
        <CreateComponent />
      </Container>
    </Fixed>
  );
};

export default UserCreate;
