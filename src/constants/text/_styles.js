/** Default emphasis styles */
exports.EMPHASIS = {
  UNDERLINE: { textDecoration: 'underline' }
};

/** Default section styles */
exports.SECTIONS = {
  BLOCKQUOTE: {
    borderLeft: '3px solid #dadada',
    color: '#dadada',
    paddingLeft: '1em',
    margin: '1em 0'
  },
  DIVIDER: {
    borderStyle: 'solid',
    borderWidth: '1px',
    margin: '2rem 0 1rem'
  },
  LIST_ITEM: {
    display: 'grid',
    gridTemplateColumns: '1.2em 1fr'
  },
  NUMBERED_LIST_ITEM: {
    columnGap: '.8em',
    display: 'grid',
    gridTemplateColumns: '1em 1fr',
    padding: '0.5em 0'
  }
};
