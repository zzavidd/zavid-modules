export * from './functions';
export * from './builder';

/**
 * GUIDE TO ADDING NEW FORMAT FEATURES:
 * 
 * To add a new feature to the rich-text formatting:
 * 
 * #1: Add a new constant to the emphasis or section
 * constant map.
 * 
 * #2: Add its corresponding regex expressions to
 * the emphasis or section regex map.
 * 
 * #3: Define the resulting substitution.
 * For emphasis, {@see formatText}
 * For section, {@see applyEmphasisFormatting}
 * 
 * #4. (Sections only) Define deformatting for
 * emphasis substitutions. {@see deformatText}
 */

 /**
 * STACKED FORMATTING TIPS:
 * 
 * Think about it as if you were literally wrapping
 * what you're formatting with HTML elements.
 * 
 * Hyperlinks should incase everything! Always be on
 * the outside!
 */