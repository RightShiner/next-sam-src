import React from 'react';
import { KeyAccount } from 'views/KeyAccount';
import { withSession } from 'middlewares';
const { User } = require('models');
const mongoose = require('mongoose');
const toObjectId = mongoose.Types.ObjectId;

const KeyAccountPage = ({ user, userInfo }) => {
  return <KeyAccount userInfo={user} userPlanInfo={userInfo} />;
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

  const userInfo = await User.findOne({ _id: toObjectId(user.id) });

  return {
    props: {
      user: {
        name: userInfo?.name,
        email: userInfo?.email,
        company: userInfo?.company,
      },
      userInfo: user,
    },
  };
});

export default KeyAccountPage;
