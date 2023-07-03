import _ from 'lodash';
import { apiHandler } from 'middlewares';
import { AnnouncementRepo } from 'repositories';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getAllAnnouncement();
    default:
      return {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function getAllAnnouncement() {
    console.log(`/api/announcements`);

    let list = await AnnouncementRepo.getAllAnnouncements();

    return res.status(200).json({ status: 'ok', announcement: list });
  }
}
