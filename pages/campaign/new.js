import React from 'react';
import { New } from 'views/Campaign';
import {withSession} from 'middlewares';

const NewPage = ({user}) => {
  return <New userInfo={user} />;
};

export const getServerSideProps = withSession(async function({req, res}) {
  const user = req.session.get('user')

  if (!user) {
    return {
      redirect: {
        destination: '/logout',
        permanent: false,
      },
    }
  }

  return {props: {user}};
});

export default NewPage;
