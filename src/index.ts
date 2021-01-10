import * as zDate from './constants/date';
import * as zNumber from './constants/number';
import * as zString from './constants/string';
import * as zText from './constants/text';

import * as zTabler from './components/tabler';

export = {
  zDate,
  zNumber,
  zString,
  zText,

  zComponents: {
    ...zTabler
  }
};
