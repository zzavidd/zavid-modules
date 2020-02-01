import React, { Component } from 'react';
import * as css from './form.styles';

/** Template for text inputs */
class Input extends Component {
  render() {
    return (
      <input
        {...this.props}
        style={css.input}
        type={this.props.type}
        name={this.props.name}
        placeholder={this.props.placeholder}
        className={this.props.className}
        autoComplete={'off'}
        value={this.props.value || ''}
        ref={this.props.ref}
        onChange={this.props.onChange}
      />
    );
  }
}

/** For inline text inputs */
export class TextInput extends Component {
  render() {
    return <Input {...this.props} type={'text'} />;
  }
}