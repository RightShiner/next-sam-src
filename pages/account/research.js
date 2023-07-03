import _ from 'lodash';
import React from 'react';
import { Research } from 'views/Account';
import { CampaignRepo, UserRepo } from 'repositories';
import { withSession } from 'middlewares';

const ResearchPage = ({ user, isshown, campLists }) => {
  return (
    <Research userInfo={user} firstLogin={isshown} campaigns={campLists} />
  );
};

export const getServerSideProps = withSession(async function({ req, res }) {
  const user = await req.session.get('user');

  if (!user) {
    return {
      redirect: {
        destination: '/logout',
        permanent: false,
      },
    };
  }

  const isAgreed = await UserRepo.isAgreed(user.id);
  const records = await CampaignRepo.getCampaignList(user.id);
  const campLists = records
    ?.filter((record) => (record.visible ?? true) && !(record.deleted ?? false))
    ?.map((itm) => ({
      id: itm._id.toString(),
      name: itm.name,
      sns: itm.sns,
    }));

  return {
    props: {
      user,
      isshown: !isAgreed,
      campLists,
    },
  };
});

export default ResearchPage;
