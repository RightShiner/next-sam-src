const styles = theme => ({
  candidateItem: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",

    '&:Hover': {
      // backgroundColor: theme.palette.clrVariables.cyanBlack
      boxShadow: '0 4px 24px rgba(31, 31, 31, 0.16)',
      cursor: 'pointer',
      transition: 'box-shadow .2s',
      // -webkit-user-select: none;
      userSelect: 'none'
    }
  },
  feedtableCell: {
    padding: '4px',
    fontSize: '0.7rem',
  },
  feedtableTextField: {
    '& input': {
      padding: '4px'
    }
  },
  staticCaption: {
    fontSize: '12px'
  }
});

export default styles;