import React from 'react';
import { Question } from 'views/Question';
import { withSession } from 'middlewares';

const QuestionPage = ({ user }) => {
  return <Question user={user} />;
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

export default QuestionPage;
