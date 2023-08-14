import * as React from 'react';

import * as googleTag from '@lib/googleTag';

import * as firebase from '@utils/analytics';
import { STEP } from '@utils/constants';

type Analytics = {
  pagePath: number;
  pageTitle: string;
};

const useAnalytics = ({ pagePath, pageTitle }: Analytics) => {
  React.useEffect(() => {
    if (pagePath === STEP.EIGHTH.value) googleTag.conversion();
    firebase.logEvent('page_view', { page_path: pagePath, page_title: pageTitle });
  }, [pagePath, pageTitle]);
};

export default useAnalytics;
