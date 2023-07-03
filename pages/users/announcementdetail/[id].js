import React from 'react';
import { AnnouncementDetail } from 'views/Users';
import { AnnouncementRepo } from 'repositories';

const AnnouncementDetailPage = ({ announcement }) => {
  return <AnnouncementDetail announcement={announcement} />;
};

export async function getServerSideProps(context) {
  const { id } = context.query;
  let announcement = await AnnouncementRepo.getAnnouncement(id);

  return {
    props: {
      announcement: {
        _id: announcement._id.toString(),
        text: announcement.text,
        from: announcement.from,
        to: announcement.to,
        status: announcement.status,
        users: announcement.users ?? [],
        link: announcement.link,
      },
    },
  };
}

export default AnnouncementDetailPage;
