import React, { Component, useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import * as css from './form.styles';

const ITextArea = ({
  className,
  name,
  placeholder,
  value,
  minRows,
  onChange
}) => {
  return (
    <TextareaAutosize
      name={name}
      placeholder={placeholder}
      className={className}
      style={css.textarea}
      rows={minRows}
      value={value || ''}
      onChange={onChange}
    />
  );
};

/** For shorter text inputs */
export const ShortTextArea = (props) => {
  return <ITextArea minRows={1} {...props} />;
};

/** For long text inputs with word counters */
export const LongTextArea = (props) => {
  const { onChange, value, wordCountClassName } = props;

  const [wordCount, setWordCount] = useState(value ? value.length : 0);

  const handleTextChange = (event) => {
    onChange(event);
    const text = event.target.value;
    setWordCount(text.length);
  };

  render() {
    return (
      <div>
        <ITextArea minRows={3} {...this.props} />
        <label className={this.props.wordCountClassName} style={css.wordCount}>
          {this.state.wordCount}
        </label>
      </div>
    );
  }
}

// const ITextArea = ({
//   className,
//   name,
//   placeholder,
//   value,
//   minRows,
//   onChange
// }) => {
//   return (
//     <TextareaAutosize
//       name={name}
//       placeholder={placeholder}
//       className={className}
//       style={css.textarea}
//       rows={minRows}
//       value={value || ''}
//       onChange={onChange}
//     />
//   );
// };

// /** For shorter text inputs */
// export const ShortTextArea = (props) => {
//   return <ITextArea minRows={1} {...props} />;
// };

// /** For long text inputs with word counters */
// export const LongTextArea = (props) => {
//   const { onChange, value, wordCountClassName } = props;

//   const [wordCount, setWordCount] = useState(value ? value.length : 0);

//   const handleTextChange = (event) => {
//     onChange(event);
//     const text = event.target.value;
//     setWordCount(text.length);
//   };

//   return (
//     <div>
//       <ITextArea minRows={3} {...props} onChange={handleTextChange} />
//       <label className={wordCountClassName} style={css.wordCount}>
//         {wordCount}
//       </label>
//     </div>
//   );
// };
