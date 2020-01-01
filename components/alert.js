const { toast, cssTransition } = require('react-toastify');
const classNames = require('classnames');

const css = require('../assets/styles.scss');

// const css = require('node-sass');
// css.render({ file: 'styles.scss' });

/** Alert transition styles */
const animation = cssTransition({
  enter: css.fadeIn,
  exit: css.fadeOut,
  duration: 500
});

/** Alert toast configurations */
toast.configure({
  autoClose: 2500,
  className: css.toastContainer,
  closeButton: false,
  draggable: false,
  hideProgressBar: true,
  position: toast.POSITION.BOTTOM_CENTER,
  transition: animation
});

/** Default CSS classes */
const classes = ['alert', css.message];

module.exports = (styles) => {
  classes.push(styles);
  
  return {
    alert: {
      /**
       * Show success alert message.
       * @param {string} message The message included in the alert.
       */
      success: (message) => {
        toast(message, { className: classNames('alert-success', classes) });
      },
  
      /**
       * Show error alert message.
       * @param {string} message The message included in the alert.
       */
      error: (message) => {
        toast(message, { className: classNames('alert-danger', classes) });
      },
  
      /**
       * Show information alert message.
       * @param {string} message The message included in the alert.
       */
      info: (message) => {
        toast(message, { className: classNames('alert-primary', classes) });
      }
    },
    
    /**
     * Temporarily keep alert message in session storage.
     * @param {string} message The message included in the alert.
     */
    setAlert: (message) => {
      sessionStorage.setItem('alert', JSON.stringify(message));
    },
  
    /** Check for any alerts in session storage to show. */
    checkAlert: () => {
      const notification = JSON.parse(sessionStorage.getItem('alert'));
      if (notification){
        const { type, message } = notification;
        alert[type](message);
        sessionStorage.clear();
      }
    },
  
    /**
     * Display an error message as a result of a failed request.
     * @param {Object} err The error object returned as a response.
     */
    displayErrorMessage: (err) => {
      if (process.env.NODE_ENV !== 'production'){
        alert.error(err.toString());
      } else {
        alert.error('Something went wrong. Please try again later.');
        console.error(err.toString());
      }
    }
  }
}