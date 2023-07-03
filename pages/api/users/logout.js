import {withSession} from 'middlewares';

export default withSession(async (req, res) => {
  console.log(`/api/users/logout`);

  req.session.destroy();
  res.json({status: 'ok'});
})