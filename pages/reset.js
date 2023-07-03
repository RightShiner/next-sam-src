import React from 'react';
import { Reset } from 'views/Reset';
import { UserRepo } from 'repositories';
import { Base64 } from 'js-base64';

const ResetPage = ({ isreset }) => {
  return <Reset isreset={isreset} />;
};

export async function getServerSideProps(context) {
  const { param } = context.query;
  const email = Base64.decode(param);

  let status = await UserRepo.resetPassword(email);

  return { props: { isreset: status } };
}

export default ResetPage;
