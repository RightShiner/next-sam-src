const styles = (theme) => ({
  container: {
    margin: '8px',
    padding: '10px 7px',
    maxWidth: '240px',
    height: 'fit-content',
    position: 'relative',
    boxShadow:
      '1px 1px 1px 0px rgb(0 0 0 / 20%), 0 6px 20px 0 rgb(0 0 0 / 19%)',
  },

  avatar: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: '10px',
    marginTop: '100px',
    borderBottom: '1px solid #c4c4c4',

    '& a': {
      fontSize: '1.5em',
      color: 'purple',
      whiteSpace: 'nowrap',
      marginLeft: '0.5em',
      textDecoration: 'none',
      transition: '300ms',

      '&:hover': {
        color: 'red',
      },
    },
  },

  title: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '100px',
    paddingBottom: '25px',
  },

  subGroup: {
    display: 'flex',
    alignItems: 'center',

    '& a': {
      fontSize: '1em',
      color: 'purple',
      whiteSpace: 'nowrap',
      marginLeft: '0.5em',
      textDecoration: 'none',
      transition: '300ms',
      marginRight: '2em',

      '&:hover': {
        color: 'red',
      },
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    '& .MuiAvatar-root': {
      width: '1.4em',
      height: '1.4em',
      marginRight: '.8em',
    },

    '& a': {
      width: '8em',
      color: 'purple',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      textDecoration: 'none',
      transition: '300ms',

      '&:hover': {
        color: 'red',
      },
    },

    '& .MuiButtonBase-root': {
      height: '30px!important',
      border: '1px solid #5cafdf',
      padding: '0 .7em',
    },
  },

  video: {
    position: 'relative',
    // height: '235px',

    '& .play': {
      top: '50%',
      right: '50%',
      width: '25px',
      zIndex: '100',
      position: 'absolute',
      cursor: 'pointer',

      '& .MuiSvgIcon-root': {
        color: 'white',
        fontSize: '3.5em',
        transition: '300ms',

        '&:hover': {
          color: '#bfb4b4',
          zIndex: '111',
        },
      },
    },
  },

  media: {
    position: 'relative',
    cursor: 'pointer',
    transition: '300ms',

    '& .MuiButtonBase-root ': {
      color: '#afafaf',
      backgroundColor: '#494949',
      borderRadius: '50%!important',
    },

    '& img': {
      borderRadius: '7px',
      objectFit: 'contain',
    },

    '&:hover': {
      opacity: '0.7',
      zIndex: 1,
    },
  },

  story: {
    position: 'relative',
    transition: '300ms',

    '& .MuiButtonBase-root ': {
      color: '#afafaf',
      backgroundColor: '#494949',
      width: '10px',
      height: '10px!important',
      borderRadius: '50%!important',
    },

    '& img': {
      borderRadius: '7px',
    },
  },

  detail: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '.5em',

    '& #engagement': {
      width: '20px',
      height: '10px',
      backgroundImage: "url('/images/engagement.png')",
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
    },
    '& p': {
      fontSize: '13px',
      fontWeight: '600',
    },
  },

  content: {
    '& #title': {
      fontSize: '12px',
    },
    '& #detail': {
      fontSize: '12px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'pre',
      maxHeight: '4em',
    },
  },

  footer: {
    display: 'flex',
    justifyContent: 'space-between',

    '& p': {
      fontWeight: '600',
      fontSize: '12px',
    },
    '& .heart': {
      width: '15px',
      height: '10px',
      backgroundImage: "url('/images/heart.png')",
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
    },
    '& #comment': {
      width: '15px',
      height: '10px',
      backgroundImage: "url('/images/comment.png')",
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
    },
    '& #play': {
      width: '11px',
      height: '10px',
      backgroundImage: "url('/images/play.png')",
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
    },
  },

  item: {
    display: 'flex',
    alignItems: 'baseline',
  },

  typeTopRight: {
    top: '7px',
    right: '7px',
    width: '25px',
    height: '25px',
    display: 'flex',
    zIndex: '1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    position: 'absolute',
    backgroundColor: 'white',

    '& img': {
      border: '1px solid #1377eb',
      borderRadius: '50%!important',
      width: '20px',
      height: '20px',
      padding: '1px',
    },

    '& .MuiSvgIcon-root': {
      color: '#0071b2',
      width: '17px',
    },
  },

  purpleButton: {
    color: 'purple',
    borderColor: 'purple',
    transition: '300ms',

    '&:hover': {
      color: 'white',
      backgroundColor: 'purple',
      borderColor: 'purple',
    },
  },

  modalAvatar: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',

    '& .MuiAvatar-root': {
      width: '1.4em',
      height: '1.4em',
      marginRight: '.8em',
    },

    '& a': {
      width: '8em',
      color: 'purple',
      whiteSpace: 'pre',
      textDecoration: 'none',
      transition: '300ms',

      '&:hover': {
        color: 'red',
      },
    },
  },

  person: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',

    '& a': {
      whiteSpace: 'pre',
      textDecoration: 'none',
      fontSize: '13px',
      transition: '300ms',

      '&:hover': {
        color: 'red',
      },
    },
  },
});

export default styles;
