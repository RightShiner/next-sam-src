import { apiHandler } from 'middlewares';

import Lang from 'constants/lang';
import Constants from 'constants/constants';
import { AnnouncementRepo } from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await updateAnnouncement();
    default:
      throw {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function updateAnnouncement() {
    console.log(`/api/announcements/update`);

    await AnnouncementRepo.updateAnnouncement(req.body._id, req.body);
    return res.status(200).json({ status: 'ok' });
  }
}
