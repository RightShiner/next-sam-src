import _ from 'lodash';
import moment from 'moment';
import React from 'react';
import { List } from 'views/Campaign';
import { withSession } from 'middlewares';
import { CampaignRepo } from 'repositories';

const ListPage = ({ campaigns, user }) => {
  return <List campaigns={campaigns} user={user} />;
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

  const cmpList = await CampaignRepo.getCampaignDetailList(user.id);
  return {
    props: { campaigns: cmpList, user: user },
  };
});

export default ListPage;
