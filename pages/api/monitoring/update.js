import { apiHandler } from 'middlewares';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import { MonitoringRepo } from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await setPosts();
    case 'PUT':
      return await deletePosts();
    default:
      return {
        status: Constants.errors.badrequest,
        message: Lang.communcation_errs.e009,
      };
  }

  async function setPosts() {
    console.log(`/api/monitoring/update`);

    const { data } = req.body;

    let result = await MonitoringRepo.setPosts(data);

    if (result) {
      return res.status(200).json({ status: 'ok' });
    } else {
      return res.status(400).json({ status: 'error' });
    }
  }

  async function deletePosts() {
    console.log(`/api/monitoring/update`);

    const { data } = req.body;

    let result = await MonitoringRepo.deletePosts(data);

    if (result) {
      return res.status(200).json({ status: 'ok' });
    } else {
      return res.status(400).json({ status: 'error' });
    }
  }
}
