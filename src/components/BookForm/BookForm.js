import React, { useEffect, useState } from 'react';

import fetchJson from '../../func/fetchJson';
import { getCategoriesSrc } from '../../func/getSrc';
import { getRandomizerUrl } from '../../func/getUrl';
import getUrlFilterParams from '../../func/getUrlFilterParams';
import i18n from '../../i18n/i18n';
import { imgSearchButton } from '../../assets/Images';
import mainCategories from '../../data/mainCategories.json';
import './bookForm.css';

function BookForm() {
  const currentYear = new Date().getFullYear();
  const urlFilterParams = getUrlFilterParams();

  const [allCategories, setAllCategories] = useState(null);
  const [loadingError, setLoadingError] = useState(false);

  const [mainCategory, setMainCategory] = useState(urlFilterParams.mainCategory || '');
  const [subcategory, setSubcategory] = useState(urlFilterParams.subcategory || '');
  const [keywords, setKeywords] = useState(`${urlFilterParams.keywords && urlFilterParams.keywords[urlFilterParams.keywords.length - 1] !== ',' ? `${urlFilterParams.keywords}, ` : ''}${urlFilterParams.keywords && urlFilterParams.keywords[urlFilterParams.keywords.length - 1] === ',' ? `${urlFilterParams.keywords} ` : ''}${urlFilterParams.author ? `${urlFilterParams.author}, ` : ''}${urlFilterParams.publisher ? `${urlFilterParams.publisher}, ` : ''}${urlFilterParams.collection ? `${urlFilterParams.collection}, ` : ''}`);
  const [minOfPages, setMinOfPages] = useState(urlFilterParams.minOfPages || '');
  const [maxOfPages, setMaxOfPages] = useState(urlFilterParams.maxOfPages || '');
  const [minYear, setMinYear] = useState(urlFilterParams.minYear || '');
  const [maxYear, setMaxYear] = useState(urlFilterParams.maxYear || '');

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await fetchJson(getCategoriesSrc());

      if (Array.isArray(data) && !error) {
        const categoriesFetched = {};
        data.forEach((group) => {
          categoriesFetched[group.mainCategory] = group.subcategories;
        });
        setAllCategories(categoriesFetched);
      } else {
        setLoadingError(error);
      }
    };

    fetchData();
  }, []);

  function handleMainCatChange(event) {
    setMainCategory(event.target.value);
    setSubcategory('');
  }

  return (
    <div className="bookForm">
      {/* Main category */}
      <div className="input-container">
        {!mainCategory
          && <p className="label bookForm-text">{i18n.t('bookFormText1')}</p>}
        {mainCategory
          && <label htmlFor="mainCategory" className="label">{i18n.t('inputMainCategory')}</label>}
        <select
          className="input"
          value={mainCategory || ''}
          onChange={handleMainCatChange}
          id="mainCategory"
        >
          <option value="">{i18n.t('select')}</option>

          {mainCategories.map((category) => (
            <option
              key={category.value}
              value={category.value}
            >
              {category.displayName}
            </option>
          ))}
        </select>
      </div>

      {mainCategory && (
        <>
          <p className="bookForm-text">{i18n.t('bookFormText2')}</p>

          {/* Subcategory */}
          <div className="input-container">
            <label htmlFor="subcategory" className="label">{i18n.t('inputSubcategory')}</label>
            <select
              className="input"
              value={subcategory || ''}
              onChange={(event) => { setSubcategory(event.target.value); }}
              id="subcategory"
              disabled={!allCategories || !allCategories[mainCategory]
                || allCategories[mainCategory].length === 0}
            >
              {!loadingError && !allCategories
                && <option value="">{i18n.t('loading')}</option>}
              {loadingError
                && <option value="">{i18n.t('errorHasOccurred')}</option>}
              {!loadingError && allCategories
              && (!allCategories[mainCategory] || allCategories[mainCategory].length === 0)
                && <option value="">{i18n.t('noOptions')}</option>}
              {!loadingError && allCategories && allCategories[mainCategory]
              && allCategories[mainCategory].length > 0
                && <option value="">{i18n.t('select')}</option>}

              {!loadingError && allCategories && allCategories[mainCategory]
              && allCategories[mainCategory].length > 0
                && allCategories[mainCategory].sort().map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
            </select>
          </div>

          {/* Keywords */}
          <div className="input-container">
            <label htmlFor="keywords" className="label">{i18n.t('inputKeywords')}</label>
            <input
              className="input"
              type="text"
              value={keywords || ''}
              onChange={(event) => { setKeywords(event.target.value); }}
              id="keywords"
            />
          </div>

          {/* Number of pages */}
          <div className="input-container">
            <label htmlFor="nbPages" className="label">{i18n.t('inputNbPages')}</label>
            <div className="input-row">
              <input
                className="input"
                type="number"
                value={minOfPages || ''}
                onChange={(event) => { setMinOfPages(event.target.value); }}
                placeholder={i18n.t('min')}
                min="0"
                max="9999"
                step="1"
                id="nbPages"
              />
              <input
                className="input"
                type="number"
                value={maxOfPages || ''}
                onChange={(event) => { setMaxOfPages(event.target.value); }}
                placeholder={i18n.t('max')}
                min="0"
                max="9999"
                step="1"
                id="nbPages"
              />
            </div>
          </div>

          {/* Publication years */}
          <div className="input-container">
            <label htmlFor="publicationYears" className="label">{i18n.t('inputYears')}</label>
            <div className="input-row">
              <input
                className="input"
                type="number"
                value={minYear || ''}
                onChange={(event) => { setMinYear(event.target.value); }}
                placeholder={i18n.t('min')}
                min="1900"
                max={currentYear}
                step="1"
                id="publicationYears"
              />
              <input
                className="input"
                type="number"
                value={maxYear || ''}
                onChange={(event) => { setMaxYear(event.target.value); }}
                placeholder={i18n.t('max')}
                min="1900"
                max={currentYear}
                step="1"
                id="publicationYears"
              />
            </div>
          </div>

          <a
            className="bookForm-search-button"
            href={getRandomizerUrl({
              mainCategory,
              subcategory,
              keywords,
              minOfPages,
              maxOfPages,
              minYear,
              maxYear,
            })}
          >
            <img src={imgSearchButton} alt="search-button" title={i18n.t('tooltipSearch')} />
          </a>
        </>
      )}
    </div>
  );
}

export default BookForm;
