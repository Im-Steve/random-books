import i18n from './i18n';

export default function getLanguage() {
  return i18n.language.split('-')[0];
}
