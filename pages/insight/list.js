import _ from 'lodash';
import React from 'react';
import { SearchList } from 'views/Insight';
import { UserTagsRepo } from 'repositories';
import { withSession } from 'middlewares';

const ListPage = ({ user, tags }) => {
  return <SearchList user={user} tags={tags} />;
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

  let tags = await UserTagsRepo.getList(user.id);
  tags = _.map(tags, (itm) => {
    return { _id: itm._id.toString(), name: itm.name, color: itm.color };
  });

  return {
    props: {
      user,
      tags,
    },
  };
});

export default ListPage;
