import {apiHandler} from 'middlewares';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import {UserTagsRepo} from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await appendTag();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function appendTag() {
    console.log(`/api/influencers/appendTag`);

    const {name, color, tagId} = req.body;
    const newId = await UserTagsRepo.appendTag(req.user.id, name, color, tagId);
    return res.status(200).json({
      status: 'ok',
      data: newId
    });
  }
}
