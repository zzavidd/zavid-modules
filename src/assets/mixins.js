module.exports = {
  /**
   * Scales a component when hovering hover it.
   * @param {number} scale The multiplier to which a component is scaled.
   */
  scaleOnHover: (scale) => {
    return {
      transition: 'transform .2s ease-in-out',
      WebkitTransition: 'transform .2s ease-in-out',
      '& hover': { transform: `scale(${scale})` }
    }
  },

  /**
   * Scale a font according to viewport width.
   * @param {number} size The base font size.
   */
  fontScaler: (size) => {
    return {
      fontSize: `${size}em`
    }
    // @media (max-width: $break-xl) { font-size: ($size * 1.2) + em; }
    // @media (max-width: $break-lg) { font-size: ($size * 1.17) + em; }
    // @media (max-width: $break-sm) { font-size: ($size * 0.85) + em; }
  }
}