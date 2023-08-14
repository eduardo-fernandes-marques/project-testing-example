import * as React from 'react';

import * as facebookPixel from '@lib/facebookPixel';

import { STEP } from '@utils/constants';

const useFacebookPixel = (options?: facebookPixel.StepViewOptions) => {
  React.useEffect(() => {
    if (options?.pagePath === STEP.EIGHTH.value) facebookPixel.purchase();
    facebookPixel.stepView(options);
  }, [options]);
};

export default useFacebookPixel;
