import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { userService } from 'services';

const Signout = () => {
  const router = useRouter();

  useEffect(() => {
    userService.logout().then((response) => {
      router.push({ pathname: '/signin-cover' });
    });
  }, []);

  return <p>Log out</p>;
};

export default Signout;
