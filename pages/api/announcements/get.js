import _ from 'lodash';
import { apiHandler } from 'middlewares';
import { AnnouncementRepo } from 'repositories';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getAnnouncement();
    default:
      return {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function getAnnouncement() {
    console.log(`/api/announcements/get`);

    const { id } = req.query;

    let list = await AnnouncementRepo.getAnnouncements(id);

    return res.status(200).json({ status: 'ok', announcement: list });
  }
}
