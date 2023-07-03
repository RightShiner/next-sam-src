import React from 'react';
import { Detail, Disabled } from 'views/Trial';
import { TrialRepo } from 'repositories';

const DetailPage = ({ success, trialId }) => {
  if (!success) {
    return <Disabled />;
  }
  return <Detail trialId={trialId} />;
};

export async function getServerSideProps({ req, res, query }) {
  const id = query.id;
  const trial = await TrialRepo.findOneByTrialId(id);

  if (!trial) {
    return { props: { success: false } };
  }

  const isAvailable = !trial.disabled && trial.usage < trial.limit;

  if (!isAvailable) {
    return { props: { success: false } };
  }

  return { props: { success: true, trialId: trial.trialId } };
}

export default DetailPage;
