import React from 'react';
import { Setting } from 'views/Setting';
import { withSession } from 'middlewares';

const SettingPage = ({ user }) => {
  return <Setting user={user} />;
};

export const getServerSideProps = withSession(async function({ req, res }) {
  const user = req.session.get('user');

  if (!user) {
    return {
      redirect: {
        destination: '/logout',
        permanent: false,
      },
    };
  }

  return { props: { user } };
});

export default SettingPage;
