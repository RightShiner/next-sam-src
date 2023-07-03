import React from 'react';
import { Detail } from 'views/Campaign';
import { CampaignRepo } from 'repositories';
import { withSession } from 'middlewares';

const DetailPage = ({ data, user }) => {
  return (
    <Detail
      userInfo={user}
      cmpId={data.id}
      cmpName={data.name}
      cmpSns={data.sns}
    />
  );
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

  const id = req.url.substring('/campaign/detail/'.length);
  const campInfo = await CampaignRepo.getCampaignBrief(id);

  const data = {
    id,
    name: campInfo?.name ?? '',
    sns: campInfo?.sns ?? '',
  };
  return { props: { data, user } };
});

export default DetailPage;
