export default function isSafari() {
  const { userAgent } = navigator;
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream;
  const isSafariNavigator = /Safari/.test(userAgent) && !/CriOS|FxiOS|EdgiOS/.test(userAgent);

  return isIOS && isSafariNavigator;
}
