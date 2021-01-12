import * as zDate from './constants/date';
import * as zNumber from './constants/number';
import * as zString from './constants/string';
import * as zText from './constants/text';

import * as zIcon from './components/icon';
import * as zLoader from './components/loader';
import * as zResponsive from './components/responsive';
import * as zTabler from './components/tabler';
import * as zTransitioner from './components/transitioner';

export = {
  zDate,
  zNumber,
  zString,
  zText,

  zComponents: {
    ...zIcon,
    ...zLoader,
    ...zResponsive,
    ...zTabler,
    ...zTransitioner
  }
};
