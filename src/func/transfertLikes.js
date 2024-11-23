import { downloadJSON, uploadJSON } from './transfertJSON';
import { getLikedBooks, setLikedBooks } from './handleLocalStorage';
import i18n from '../i18n/i18n';

export function downloadLikedBooks() {
  const likedBooks = getLikedBooks();
  downloadJSON(likedBooks, `${i18n.t('websiteName')}-${i18n.t('fileLikedBooks')}`);
}

export function uploadLikedBooks(event) {
  uploadJSON(event, setLikedBooks);
}
