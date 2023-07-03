import React from 'react';
import { Academy } from 'views/Academy';
import { withSession } from 'middlewares';

const AcademyPage = ({ user }) => {
  return <Academy user={user} />;
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

  return {
    props: { user },
  };
});

export default AcademyPage;
