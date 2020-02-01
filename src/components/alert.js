const { toast, cssTransition } = require('react-toastify');
const classNames = require('classnames');

/** Alert transition styles */
const animation = cssTransition({
  enter: 'fadeIn',
  exit: 'fadeOut',
  duration: 500
});

/** Alert toast configurations */
toast.configure({
  autoClose: 2500,
  className: 'toastContainer',
  closeButton: false,
  draggable: false,
  hideProgressBar: true,
  position: toast.POSITION.BOTTOM_CENTER,
  style: {
    left: '0 !important',
    margin: '0 !important',
    padding: '0 1em !important',
    width: '100% !important'
  },
  transition: animation
});

/** Default CSS classes */
const classes = ['alert', 'message'];

module.exports = {
  // classes.push(styles);
  
  // return {
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
        module.exports.alert[type](message);
        sessionStorage.clear();
      }
    },
  
    /**
     * Display an error message as a result of a failed request.
     * @param {Object} err The error object returned as a response.
     */
    displayErrorMessage: (err) => {
      if (process.env.NODE_ENV !== 'production'){
        module.exports.alert.error(err.toString());
      } else {
        module.exports.alert.error('Something went wrong. Please try again later.');
        console.error(err.toString());
      }
    }
  // }
  }