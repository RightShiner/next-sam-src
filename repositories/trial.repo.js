import Constants from '../constants/constants';
import Lang from '../constants/lang';
const mongoose = require('mongoose');
const { Trial, User } = require('models');
const toObjectId = mongoose.Types.ObjectId;

const TrialRepo = {
  findAll,
  findOneByTrialId,
  createTrial,
  deleteTrial,
  updateTrial,
  findAllTrialUsers,
};

async function findAll() {
  try {
    return await Trial.find()
      .sort({ createdAt: 1 })
      .lean();
  } catch (e) {
    console.log(e);
    throw {
      status: Constants.errors.error,
      message: Lang.communcation_errs.e049,
    };
  }
}

async function findOneByTrialId(id) {
  try {
    return await Trial.findOne({ trialId: id });
  } catch (e) {
    console.log(e);
    throw {
      status: Constants.errors.error,
      message: Lang.communcation_errs.e049,
    };
  }
}

async function createTrial({ trialId, limit, usage, disabled }) {
  try {
    await Trial.create({
      trialId,
      limit,
      usage,
      disabled,
    });
  } catch (e) {
    console.log(e);
    throw {
      status: Constants.errors.error,
      message: Lang.communcation_errs.e049,
    };
  }
}

async function deleteTrial(id) {
  try {
    await Trial.deleteOne({
      _id: toObjectId(id),
    });
  } catch (e) {
    console.log(e);
    throw {
      status: Constants.errors.error,
      message: Lang.communcation_errs.e049,
    };
  }
}

async function updateTrial(id, body) {
  try {
    await Trial.updateOne(
      {
        _id: toObjectId(id),
      },
      {
        $set: body,
      },
    );
  } catch (e) {
    console.log(e);
    throw {
      status: Constants.errors.error,
      message: Lang.communcation_errs.e049,
    };
  }
}

async function findAllTrialUsers() {
  try {
    return await User.find({
      $and: [{ trialId: { $exists: true } }, { trialId: { $ne: '' } }],
    })
      .sort({ createdAt: 1 })
      .lean();
  } catch (e) {
    console.log(e);
    throw {
      status: Constants.errors.error,
      message: Lang.communcation_errs.e049,
    };
  }
}

export default TrialRepo;
