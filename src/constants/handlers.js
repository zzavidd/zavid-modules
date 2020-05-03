/**
 * Handlers for DOM field elements.
 * @module zavid-modules/handlers
 * @param {React.Component} component - The component whose state requires updating.
 */
module.exports = (component) => {
  return {
    
    /** 
     * Handle changes to text input fields.
     * @param {Event} event - The text change DOM event.
     */
    handleText: (event) => {
      const { name, value } = event.target;
      component.setState({[name]: value});
    },

   /** 
     * Handle selection of radio values.
     * @param {*} value - The selected value.
     * @param {Event} event - The radio button click DOM event.
     */
    handleRadio: (value, event) => {
      const { name } = event.target;
      component.setState({[name]: value});
    },

    /**
     * Handles checking of checkboxes.
     * @param {Event} event - The checkbox click DOM event.
     */
    handleCheckbox: (event) => {
      const { name, checked } = event.target;
      component.setState({[name]: checked})
    },

    /**
     * Handles checking of checkbox buttons.
     * @param {Event} event - The checkbox button click DOM event.
     */
    handleCheckboxButton: (event) => {
      const { name, checked } = event;
      component.setState({[name]: !checked})
    },

    /**
     * Handles the selection of dates.
     * @param {string} date - The date value.
     * @param {string} [name=date] - The name of the element.
     */
    handleDate: (date, name = 'date') => { component.setState({[name]: date}); },

    /**
     * Handles the selection of time.
     * @param {string} time - The time value.
     * @param {string} [name=time] - The name of the element.
     */
    handleTime: (time, name = 'time') => { component.setState({[name]: time}); },

    /**
     * Handles the upload of images with a file selector.
     * @param {string} file - The base64 string of the image.
     * @param {string} [name=image] - The name of the element.
     */
    handleFile: (file, name = 'image') => { component.setState({[name]: file}); },

    /**
     * Handles a rating selection.
     * @param {Event} event - The click on the rator DOM element.
     */
    handleRatingChange: (event) => {
      const rating = parseInt(event.currentTarget.value)
      component.setState({ rating });
    },
    
    /**
     * Assigns social media handles.
     * @param {Object} socials - The mapping of social media platforms to usernames.
     */
    confirmSocials: (socials) => {component.setState({socials})},

    /**
     * Clears the selection of a country.
     * @param {string} countryField - The name of the country field element.
     */
    clearSelection: (countryField) => { component.setState({[countryField]: ''})}
  }
}