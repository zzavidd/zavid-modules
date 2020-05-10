const templates = {
  /** Provide color, font size and family, padding */
  input: {
    background: 'none',
    border: 'none',
    borderRadius: 0,
    outline: 'none',
    width: '100%'
  }
};

module.exports = {
  label: {
    display: 'block'
    // fontSize: '1.1em'
  },
  input: templates.input,
  textarea: {
    ...templates.input,
    minHeight: '42px'
  },
  wordCount: {
    margin: 0,
    textAlign: 'right',
    width: '100%'
  }
};
