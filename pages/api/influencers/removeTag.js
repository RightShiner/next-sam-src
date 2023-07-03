import {apiHandler} from 'middlewares';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import {UserTagsRepo} from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return await removeTag();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function removeTag() {
    console.log(`/api/influencers/removeTag`);

    const {selId} = req.body;
    await UserTagsRepo.removeTag(req.user.id, selId);
    return res.status(200).json({
      status: 'ok',
    });
  }
}
