import React, { Component } from 'react';
import * as css from './form.styles';

/** For labels headlining form fields */
export class Label extends Component {
  render() {
    const { children, className } = this.props;
    return (
      <label className={className} style={css.label}>
        {children}
      </label>
    );
  }
}
