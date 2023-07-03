import { apiHandler } from 'middlewares';

import Lang from 'constants/lang';
import Constants from 'constants/constants';
import { AnnouncementRepo } from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await createAnnouncement();
    default:
      throw {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function createAnnouncement() {
    console.log(`/api/announcements/create`);

    const { text, from, to, status, users, link } = req.body;

    const announcementId = await AnnouncementRepo.createAnnouncement(
      text,
      from,
      to,
      status,
      users,
      link,
    );

    if (announcementId === -1)
      return res.status(200).json({
        status: 'err',
        msg: 'Unexpected error',
      });

    return res.status(200).json({
      status: 'ok',
      id: announcementId,
    });
  }
}
