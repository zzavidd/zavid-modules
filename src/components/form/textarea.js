import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import * as css from './form.styles';

class TextArea extends Component {
  constructor(props) {
    super(props);
    this.state = { rows: props.minRows };
  }

  handleTextChange = event => {
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
        <TextArea minRows={3} {...this.props} />
        <label style={css.wordCount}>{this.state.wordCount}</label>
      </div>
    );
  }
}