import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import i18n from './i18n/i18n';

export default function SetLang() {
  const [searchParams] = useSearchParams();
  const urlParamLang = searchParams.get('lang');

  useEffect(() => {
    if (urlParamLang) {
      i18n.changeLanguage(urlParamLang);
    }
  }, [urlParamLang]);

  return null;
}
