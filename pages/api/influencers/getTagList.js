import {apiHandler} from 'middlewares';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import {UserTagsRepo} from 'repositories';

export default apiHandler(handler);

async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return await getTagList();
    default:
      throw {status: Constants.errors.badrequest, message: Lang.communcation_errs.e009};
  }

  async function getTagList() {
    console.log(`/api/influencers/getTagList`);

    const tags = await UserTagsRepo.getList(req.user.id);
    return res.status(200).json({
      status: 'ok',
      data: tags
    });
  }
}
