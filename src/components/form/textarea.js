import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import * as css from './form.styles';

class ITextArea extends Component {
  constructor(props) {
    super(props);
    this.state = { rows: props.minRows };
  }

  handleTextChange = (event) => {
    this.props.onChange(event);
    const text = event.target.value;
    this.setState({ wordCount: text.length });
  };

  render() {
    const { className, name, placeholder, value } = this.props;
    return (
      <TextareaAutosize
        name={name}
        placeholder={placeholder}
        className={className}
        style={css.textarea}
        rows={this.state.rows}
        value={value || ''}
        onChange={this.handleTextChange}
      />
    );
  }
}

/** For shorter text inputs */
export class ShortTextArea extends Component {
  render() {
    return <ITextArea minRows={1} {...this.props} />;
  }
}

/** For long text inputs with word counters */
export class LongTextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordCount: props.value ? props.value.length : 0
    };
  }

  static getDerivedStateFromProps(props) {
    return { wordCount: props.value ? props.value.length : 0 };
  }

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
