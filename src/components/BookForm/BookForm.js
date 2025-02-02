import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import fetchJSON from '../../func/fetchJSON';
import { formatFileName } from '../../func/formatData';
import getLanguage from '../../i18n/getLanguage';
import { getMainCategoriesSrc, getSubcategoriesSrc } from '../../func/getExternalSrc';
import { getRandomizerUrl } from '../../func/getInternalUrl';
import getUrlFilterParams from '../../func/getUrlFilterParams';
import i18n from '../../i18n/i18n';
import { imgSearchButton } from '../../assets/Images';
import { PROMOTIONAL_CATEGORIES } from '../../constants';
import { sendEventGA } from '../../analytics';
import './bookForm.css';

let allMainCats = null;
let allSubcats = null;

function BookForm({ inFilling = () => {}, onSearch = () => {} }) {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const onCloseTimerRef = useRef(null);

  const currentYear = new Date().getFullYear();
  const urlFilterParams = getUrlFilterParams();

  const [listOfMainCategories, setListOfMainCategories] = useState([]);
  const [listOfSubcategories, setListOfSubcategories] = useState([]);
  const [isWattpad, setIsWattpad] = useState(urlFilterParams.mainCategory === 'wattpad');
  const [isPromotion, setIsPromotion] = useState(
    PROMOTIONAL_CATEGORIES.some((cat) => urlFilterParams.mainCategory.includes(cat)),
  );

  const [mainCategory, setMainCategory] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [sortByNewest, setSortByNewest] = useState(false);
  const [keywords, setKeywords] = useState('');
  const [minOfPages, setMinOfPages] = useState('');
  const [maxOfPages, setMaxOfPages] = useState('');
  const [minYear, setMinYear] = useState('');
  const [maxYear, setMaxYear] = useState('');

  function handleMainCatChange(event) {
    let selectedCategoryValue;
    if (event && event.target) {
      selectedCategoryValue = event.target.value;
    } else {
      selectedCategoryValue = event;
    }

    setMainCategory(selectedCategoryValue);
    setSubcategory('');
    inFilling(selectedCategoryValue !== '');

    const toWattpadCat = selectedCategoryValue.toLowerCase() === 'wattpad';
    setIsWattpad(toWattpadCat);

    if (toWattpadCat) {
      setMinOfPages('');
      setMaxOfPages('');
      setMinYear('');
      setMaxYear('');
      setSortByNewest(false);
    }

    const toPromoCat = PROMOTIONAL_CATEGORIES.some(
      (cat) => selectedCategoryValue.includes(cat),
    );
    setIsPromotion(toPromoCat);

    if (!toPromoCat) {
      setSortByNewest(false);
    }

    if (event && event.target) {
      event.target.blur();
    }
  }

  function handleSubcatChange(event) {
    setSubcategory(event.target.value);
    event.target.blur();
  }

  useEffect(() => {
    setMainCategory(urlFilterParams.mainCategory);
    setSubcategory(urlFilterParams.subcategory);
    setSortByNewest(urlFilterParams.sortByNewest);
    setKeywords(urlFilterParams.keywords);
    setMinOfPages(urlFilterParams.minOfPages);
    setMaxOfPages(urlFilterParams.maxOfPages);
    setMinYear(urlFilterParams.minYear);
    setMaxYear(urlFilterParams.maxYear);

    const fetchCategories = async () => {
      if (!allMainCats || !allSubcats) {
        const { data: importedMainCats } = await fetchJSON(getMainCategoriesSrc());
        const { data: importedSubcats } = await fetchJSON(getSubcategoriesSrc());
        allMainCats = importedMainCats || {};
        allSubcats = importedSubcats || {};
      }

      const currentMainCats = allMainCats[getLanguage()] || allMainCats.fr || [];
      const currentSubcats = allSubcats[getLanguage()] || allSubcats.fr || {};
      setListOfMainCategories(currentMainCats);
      setListOfSubcategories(currentSubcats);

      if (Array.isArray(currentMainCats) && currentMainCats.length > 0
      && formatFileName(currentMainCats.join(', ')).includes(urlFilterParams.mainCategory)) {
        handleMainCatChange(urlFilterParams.mainCategory);

        if (currentSubcats[urlFilterParams.mainCategory]
        && formatFileName(currentSubcats[urlFilterParams.mainCategory].join(', ')).includes(urlFilterParams.subcategory)) {
          setSubcategory(urlFilterParams.subcategory);
        } else {
          setSubcategory('');
        }
      } else {
        handleMainCatChange('');
      }
    };

    fetchCategories();

    i18n.on('languageChanged', fetchCategories);

    return () => {
      i18n.off('languageChanged', fetchCategories);

      if (onCloseTimerRef.current) {
        clearTimeout(onCloseTimerRef.current);
      }
    };
  }, [location]);

  function onClickSearch() {
    sendEventGA({
      category: `Randomizer in ${getLanguage() || 'null'}`,
      action: `Randomize ${mainCategory || 'null'} in ${getLanguage() || 'null'}`,
      label: `Randomize below ${subcategory || 'null'}`,
    });

    onSearch();
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      navigate(getRandomizerUrl({
        mainCategory,
        subcategory,
        sortByNewest,
        keywords,
        minOfPages,
        maxOfPages,
        minYear,
        maxYear,
      }));

      onClickSearch();
    }
  }

  return (
    <div className="bookForm">
      {/* Main category */}
      <div className="input-container">
        {mainCategory
          ? <label htmlFor="bookForm-mainCategory">{t('bookFormLabelMainCategory')}</label>
          : (
            <label
              className="label bookForm-text bookForm-text-label"
              htmlFor="bookForm-mainCategory"
            >
              {t('bookFormText1')}
            </label>
          )}
        <select
          value={formatFileName(mainCategory)}
          onChange={handleMainCatChange}
          id="bookForm-mainCategory"
        >
          <option value="">{t('inputSelect')}</option>
          {listOfMainCategories && listOfMainCategories.map((category) => (
            <option
              value={formatFileName(category)}
              key={formatFileName(category)}
            >
              {category}
            </option>
          ))}
        </select>
      </div>

      {mainCategory && (
        <>
          {!isWattpad && (
            <p className="bookForm-text">{t('bookFormText3')}</p>
          )}

          {/* Sort by newest */}
          {isPromotion && (
            <div className="input-container input-container-checkbox">
              <input
                className="input-checkbox"
                type="checkbox"
                checked={sortByNewest}
                onChange={(event) => { setSortByNewest(event.target.checked); }}
                id="bookForm-sortByNewest"
              />
              <label className="label-checkbox" htmlFor="bookForm-sortByNewest">
                {t('bookFormLabelSortByNewest')}
              </label>
            </div>
          )}

          {/* Subcategory */}
          {(
            (!getLanguage().includes('en') && !isPromotion)
            || listOfSubcategories[formatFileName(mainCategory)]
          ) && (
            <div className="input-container">
              {isWattpad && !subcategory && (
                <label
                  className="label bookForm-text bookForm-text-label"
                  htmlFor="bookForm-subcategory"
                >
                    {t('bookFormText2')}
                </label>
              )}
              {(!isWattpad || (isWattpad && subcategory)) && (
                <label htmlFor="bookForm-subcategory">{t('bookFormLabelSubcategory')}</label>
              )}
              <select
                value={formatFileName(subcategory)}
                onChange={handleSubcatChange}
                disabled={!listOfSubcategories[formatFileName(mainCategory)]
                  || listOfSubcategories[formatFileName(mainCategory)].length === 0}
                id="bookForm-subcategory"
              >
                {listOfSubcategories[formatFileName(mainCategory)]
                  && listOfSubcategories[formatFileName(mainCategory)].length > 0 ? (
                    <>
                      <option value="">{t('inputSelect')}</option>
                      {listOfSubcategories[formatFileName(mainCategory)].sort().map((category) => (
                        <option
                          value={formatFileName(category)}
                          key={formatFileName(category)}
                        >
                          {category}
                        </option>
                      ))}
                    </>
                  ) : (
                    <option value="">{t('generalNoOptions')}</option>
                  )}
              </select>
            </div>
          )}

          {isWattpad && subcategory && (
            <p className="bookForm-text">{t('bookFormText3')}</p>
          )}

          {/* Keywords */}
          {(!isWattpad || (isWattpad && subcategory)) && (
            <div className="input-container">
              <label htmlFor="bookForm-keywords">{t('bookFormLabelKeywords')}</label>
              <input
                type="text"
                value={keywords}
                onChange={(event) => { setKeywords(event.target.value); }}
                onKeyDown={handleKeyDown}
                id="bookForm-keywords"
              />
            </div>
          )}

          {/* Number of pages */}
          {!isWattpad && (
            <div className="input-container">
              <label htmlFor="bookForm-nbPages-min">{t('bookFormLabelNbPages')}</label>
              <div className="input-double">
                <input
                  type="number"
                  value={minOfPages}
                  onChange={(event) => { setMinOfPages(event.target.value); }}
                  onKeyDown={handleKeyDown}
                  placeholder={t('inputMin')}
                  min="0"
                  max="9999"
                  step="1"
                  id="bookForm-nbPages-min"
                />
                <input
                  type="number"
                  value={maxOfPages}
                  onChange={(event) => { setMaxOfPages(event.target.value); }}
                  onKeyDown={handleKeyDown}
                  placeholder={t('inputMax')}
                  min="0"
                  max="9999"
                  step="1"
                  id="bookForm-nbPages-max"
                />
              </div>
            </div>
          )}

          {/* Publication years */}
          {!isWattpad && (
            <div className="input-container">
              <label htmlFor="bookForm-years-min">{t('bookFormLabelYears')}</label>
              <div className="input-double">
                <input
                  type="number"
                  value={minYear}
                  onChange={(event) => { setMinYear(event.target.value); }}
                  onKeyDown={handleKeyDown}
                  placeholder={t('inputMin')}
                  min="1900"
                  max={currentYear}
                  step="1"
                  id="bookForm-years-min"
                />
                <input
                  type="number"
                  value={maxYear}
                  onChange={(event) => { setMaxYear(event.target.value); }}
                  onKeyDown={handleKeyDown}
                  placeholder={t('inputMax')}
                  min="1900"
                  max={currentYear}
                  step="1"
                  id="bookForm-years-max"
                />
              </div>
            </div>
          )}

          {(!isWattpad || (isWattpad && subcategory)) && (
            <Link
              className="bookForm-search-button"
              to={getRandomizerUrl({
                mainCategory,
                subcategory,
                sortByNewest,
                keywords,
                minOfPages,
                maxOfPages,
                minYear,
                maxYear,
              })}
              onClick={() => onClickSearch()}
            >
              <img src={imgSearchButton} alt="search-button" title={t('tooltipSearch')} />
            </Link>
          )}
        </>
      )}
    </div>
  );
}

BookForm.propTypes = {
  inFilling: PropTypes.func,
  onSearch: PropTypes.func,
};

export default BookForm;
