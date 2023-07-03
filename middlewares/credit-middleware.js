const jwt = require('jsonwebtoken');
import getConfig from 'next/config';
import Lang from 'constants/lang';
import Constants from 'constants/constants';
import { UserRepo } from 'repositories';

const {serverRuntimeConfig} = getConfig();

export {creditMiddleware};

async function creditMiddleware(apiFunction) {
	await UserRepo.reduceCredit(req.user.id, 5);
    return apiFunction();
}