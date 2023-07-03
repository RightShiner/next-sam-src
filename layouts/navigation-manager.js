import Lang from 'constants/lang';

const locale = process.env.NEXT_PUBLIC_REGION == 'SG' ? 'en' : 'jp';

const pages = {
  navigation: [
    {
      title: Lang[locale].nav.accountresearch,
      href: '/account/research',
      icon: '/images/svgs/search.svg',
    },
    {
      title: Lang[locale].nav.insightlist,
      href: '/insight/list',
      icon: '/images/svgs/bookmark.svg',
      isInsight: true,
    },
    {
      title: Lang[locale].nav.campaignlist,
      href: '/campaign/list',
      icon: '/images/svgs/payment.svg',
    },
    {
      title: Lang[locale].nav.keyaccount,
      href: '/keyaccount',
      icon: '/images/svgs/record.svg',
    },
    {
      title: Lang[locale].nav.academy,
      href: '/academy',
      icon: '/images/svgs/trending-up.svg',
    },
  ],
  settings: [
    {
      title: Lang[locale].nav.bookMeeting,
      href: 'https://meetings.hubspot.com/aisha-mannami',
      icon: '/images/calendar.png',
    },
    {
      title: Lang[locale].nav.plan,
      href: '/setting',
      icon: '/images/svgs/gear.svg',
    },
    {
      title: Lang[locale].nav.question,
      target: '_blank',
      href:
        process.env.NEXT_PUBLIC_REGION == 'SG'
          ? 'https://intercom.help/astream_sg/en'
          : 'https://intercom.help/astream/en/',
      icon: '/images/svgs/question.svg',
    },
    {
      title: Lang[locale].nav.terms,
      target: '_blank',
      href: '/terms',
      icon: '/images/svgs/agree.svg',
    },
    {
      title: Lang[locale].nav.policy,
      target: '_blank',
      href: '/policy',
      icon: '/images/svgs/policy.svg',
    },
    {
      title: Lang[locale].nav.logout,
      href: '/logout',
      icon: '/images/svgs/logout.svg',
    },
  ],
  users: [
    {
      title: Lang[locale].nav.user.create,
      href: '/users/create',
      icon: '/images/svgs/usercreate.svg',
    },
    ...((process.env.NEXT_PUBLIC_REGION !== 'SG' && [
      {
        title: Lang[locale].nav.user.trial,
        href: '/users/trial',
        icon: '/images/svgs/usercreate.svg',
      },
    ]) ||
      []),
    {
      title: Lang[locale].nav.user.list,
      href: '/users/userlist',
      icon: '/images/svgs/userlist.svg',
    },
    {
      title: Lang[locale].nav.user.setting,
      href: '/users/plansetting',
      icon: '/images/svgs/usersettings.svg',
    },
    {
      title: Lang[locale].nav.user.announcement,
      href: '/users/announcement',
      icon: '/images/svgs/search-magnifier.svg',
    },
  ],
};

export default pages;
