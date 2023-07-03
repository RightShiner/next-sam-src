import React from 'react';
import { Edit } from 'views/Campaign';
import { CampaignRepo } from 'repositories';
import { withSession } from 'middlewares';

const EditPage = ({ data, user }) => {
  return (
    <Edit
      userInfo={user}
      cmpId={data.id}
      cmpName={data.name}
      cmpSns={data.sns}
      cmpGenre={data.type}
      cmpList={data.list}
      cmpMembers={data.members}
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

  const id = req.url.substring('/campaign/edit/'.length);
  const campInfo = await CampaignRepo.getCampaignBrief(id);

  const data = {
    id,
    name: campInfo?.name ?? '',
    sns: campInfo?.sns ?? '',
    type: campInfo?.type ?? '',
    list: campInfo?.list ?? '',
    members: campInfo?.members ?? [],
  };
  return { props: { data, user } };
});

export default EditPage;
