const templates = {
  input: {
    background: 'none',
    border: 'none',
    // color: auto;
    borderRadius: 0,
    // border-bottom: auto;
    // font-family: auto;
    fontSize: '1.2em',
    outline: 'none',
    padding: .4,
    width: '100%',
    // @media (max-width: $break-md) { font-size: 1em; padding: .4em 0}
  }
}

module.exports = {
  label: {
    display: 'block',
    fontSize: '1.1em'
  },
  input: templates.input,
  textarea: {
    ...templates.input,
    minHeight: '42px'
  },
  wordCount: {
    margin: 0,
    textAlign: 'right'
  }
}