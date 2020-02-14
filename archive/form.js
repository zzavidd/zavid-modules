import React, { Component } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
// import { Form, Row } from 'react-bootstrap';
import classNames from 'classnames';

// import { Icon } from '~/components/icon.js';

// /** The heading of the form */
// export class Heading extends Component {
//   constructor() {
//     super();
//     this.state = { isLoaded: false };
//   }

//   componentDidMount() {
//     this.setState({ isLoaded: true });
//   }

//   render() {
//     return (
//         <div className={css.formHeading}>{this.props.children}</div>
//     );
//   }
// }

// /** Grouping the for components */
// export class Group extends Component {
//   constructor() {
//     super();
//     this.state = { isLoaded: false };
//   }

//   componentDidMount() {
//     this.setState({ isLoaded: true });
//   }

//   render() {
//     const classes = classNames(css.group, this.props.className);
//     return (
//         <Form.Group as={Row} className={classes} style={this.props.style}>
//           {this.props.children}
//         </Form.Group>
//     );
//   }
// }

/** For labels headlining form fields */
export class Label extends Component {
  render() {
    const { children, className } = this.props;
    return <label className={className} style={css.label}>{children}</label>;
  }
}

const common = {
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

const css = {
  label: {
    display: 'block',
    fontSize: '1.1em'
  },
  input: common.input,
  textarea: {
    ...common.input,
    minHeight: '42px'
  },
  wordCount: {
    margin: 0,
    textAlign: 'right'
  }
}

/***************************
 * INPUTS
 **************************/

/** Template for text inputs */
class Input extends Component {
  render() {
    const classes = classNames(this.props.className);
    return (
      <input
        {...this.props}
        style={css.input}
        type={this.props.type}
        name={this.props.name}
        placeholder={this.props.placeholder}
        className={classes}
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

// /** For username inputs */
// export class UsernameInput extends Component {
//   render() {
//     return <Input {...this.props} autoCapitalize={'off'} />;
//   }
// }

// /** For password inputs */
// export class PasswordInput extends Component {
//   render() {
//     return <Input {...this.props} type={'password'} />;
//   }
// }

// export class ClickInput extends Component {
//   render() {
//     return (
//       <button
//         onClick={this.props.onClick}
//         className={css.invisible_button}
//         style={{ width: '100%', padding: '0' }}
//       >
//         <Input {...this.props} readOnly />
//       </button>
//     );
//   }
// }

// /** For number selections */
// export class NumberPicker extends Component {
//   render() {
//     return <Input {...this.props} type={'number'} min={1} />;
//   }
// }

// export class SearchBar extends Component {
//   render() {
//     return (
//       <div className={css.searchContainer}>
//         <Icon name={'search'} color={'grey'} />
//         <input
//           type={'text'}
//           className={css.searchBar}
//           onChange={this.props.onChange}
//           placeholder={this.props.placeholder}
//           value={this.props.value}
//           style={{ width: this.props.width }}
//         />
//       </div>
//     );
//   }
// }

// /***************************
//  * TEXTAREAS
//  **************************/

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

/** For inline long text inputs */
// export class ShortTextArea extends Component {
//   render() {
//     return <TextArea minRows={1} {...this.props} />;
//   }
// }

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

// /***************************
//  * OTHERS
//  **************************/

// /** For dropdown menus */
// export class Select extends Component {
//   render() {
//     const { name, placeholder, items, value, onChange } = this.props;
//     return (
//       <select
//         className={css.select}
//         name={name}
//         value={value || ''}
//         onChange={onChange}
//         style={{ color: value === '' && '#8E8E8E' }}
//       >
//         <option value={''} disabled>
//           {placeholder}
//         </option>
//         {items.map((item, index) => {
//           return (
//             <option key={index} value={item.value || item.label || item}>
//               {item.label || item}
//             </option>
//           );
//         })}
//       </select>
//     );
//   }
// }

// /** For checkboxes */
// export class Checkbox extends Component {
//   render() {
//     const classes = classNames(css.checkbox, this.props.className);
//     return (
//       <label className={classes}>
//         <input
//           type={'checkbox'}
//           checked={this.props.checked}
//           onChange={this.props.onChange}
//           className={css.box}
//           {...this.props}
//         />
//         <div>{this.props.label}</div>
//       </label>
//     );
//   }
// }