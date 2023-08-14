/* eslint-disable prefer-destructuring */

export const ignoreErrors = [
  /^No error$/,
  /__show__deepen/,
  /_avast_submit/,
  /Access is denied/,
  /anonymous function: captureException/,
  /Blocked a frame with origin/,
  /console is not defined/,
  /cordova/,
  /DataCloneError/,
  /Error: AccessDeny/,
  /event is not defined/,
  /feedConf/,
  /myGloFrameList/,
  /SecurityError/,
  /MyIPhoneApp/,
  /snapchat.com/,
  /vid_mate_check is not defined/,
  /win\.document\.body/,
  /window\._sharedData\.entry_data/,
  /ztePageScrollModule/,
  /Network request failed/,
  /Failed to fetch/,
  /NetworkError/,
  /Network Error/,
  /_pcmBridgeCallbackHandler/,
  /_handleMessageFromToutiao/,
  /Error no especificado/,
  /ibFindAllVideos/,
  /ibPauseAllVideos/,
  /timeout of 0ms exceeded/,
];

export const SENTRY_DSN = process.env.SENTRY_DSN;

export const SENTRY_ENABLED =
  process.env.NEXT_PUBLIC_APP_ENV === 'production' || process.env.NEXT_PUBLIC_APP_ENV === 'staging';
