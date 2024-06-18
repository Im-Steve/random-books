import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import fetchJSON from '../../func/fetchJSON';
import { formatPath } from '../../func/formatData';
import { getMainCategoriesSrc, getSubcategoriesSrc } from '../../func/getSrc';
import { getRandomizerUrl } from '../../func/getUrl';
import getUrlFilterParams from '../../func/getUrlFilterParams';
import i18n from '../../i18n/i18n';
import { imgSearchButton } from '../../assets/Images';
import mainCategories from '../../data/mainCategories.json';
import subcategories from '../../data/subcategories.json';
import './bookForm.css';

function BookForm({ inFilling = () => {} }) {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const urlFilterParams = getUrlFilterParams();

  const [listOfMainCategories, setListOfMainCategories] = useState(mainCategories);
  const [listOfSubcategories, setListOfSubcategories] = useState(subcategories);
  const [isWattpad, setIsWattpad] = useState(urlFilterParams.mainCategory === 'wattpad');

  const [mainCategory, setMainCategory] = useState(urlFilterParams.mainCategory);
  const [subcategory, setSubcategory] = useState(urlFilterParams.subcategory);
  const [keywords, setKeywords] = useState(urlFilterParams.keywords);
  const [minOfPages, setMinOfPages] = useState(urlFilterParams.minOfPages);
  const [maxOfPages, setMaxOfPages] = useState(urlFilterParams.maxOfPages);
  const [minYear, setMinYear] = useState(urlFilterParams.minYear);
  const [maxYear, setMaxYear] = useState(urlFilterParams.maxYear);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data: importedMainCats } = await fetchJSON(getMainCategoriesSrc());
      const { data: importedSubcats } = await fetchJSON(getSubcategoriesSrc());
      setListOfMainCategories(importedMainCats || mainCategories);
      setListOfSubcategories(importedSubcats || subcategories);
    };

    fetchCategories();
  }, []);

  function handleMainCatChange(event) {
    const selectedCategoryValue = event.target.value;
    setMainCategory(selectedCategoryValue);
    setSubcategory('');
    setIsWattpad(formatPath(selectedCategoryValue) === 'wattpad');
    inFilling(selectedCategoryValue !== '');

    if (formatPath(selectedCategoryValue) === 'wattpad') {
      setMinOfPages('');
      setMaxOfPages('');
      setMinYear('');
      setMaxYear('');
    }

    event.target.blur();
  }

  function handleSubcatChange(event) {
    setSubcategory(event.target.value);
    event.target.blur();
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      const currentURL = window.location.href;

      navigate(getRandomizerUrl({
        mainCategory,
        subcategory,
        keywords,
        minOfPages,
        maxOfPages,
        minYear,
        maxYear,
      }));

      if (currentURL.includes('randomizer')) {
        window.location.reload(true);
      }
    }
  }

  return (
    <div className="bookForm">
      {/* Main category */}
      <div className="input-container">
        {mainCategory
          ? <label>{i18n.t('bookFormLabelMainCategory')}</label>
          : <p className="label bookForm-text bookForm-text-label">{i18n.t('bookFormText1')}</p>}
        <select
          value={formatPath(mainCategory)}
          onChange={handleMainCatChange}
        >
          <option value="">{i18n.t('inputSelect')}</option>
          {listOfMainCategories && listOfMainCategories.map((category) => (
            <option
              value={formatPath(category)}
              key={formatPath(category)}
            >
              {category}
            </option>
          ))}
        </select>
      </div>

      {mainCategory && (
        <>
          {!isWattpad && (
            <p className="bookForm-text">{i18n.t('bookFormText3')}</p>
          )}

          {/* Subcategory */}
          <div className="input-container">
            {isWattpad && !subcategory && (
              <p className="label bookForm-text bookForm-text-label">{i18n.t('bookFormText2')}</p>
            )}
            {(!isWattpad || (isWattpad && subcategory)) && (
              <label>{i18n.t('bookFormLabelSubcategory')}</label>
            )}
            <select
              value={formatPath(subcategory)}
              onChange={handleSubcatChange}
              disabled={!listOfSubcategories[formatPath(mainCategory)]
                || listOfSubcategories[formatPath(mainCategory)].length === 0}
            >
              {listOfSubcategories[formatPath(mainCategory)]
                && listOfSubcategories[formatPath(mainCategory)].length > 0 ? (
                  <>
                    <option value="">{i18n.t('inputSelect')}</option>
                    {listOfSubcategories[formatPath(mainCategory)].sort().map((category) => (
                      <option
                        value={formatPath(category)}
                        key={formatPath(category)}
                      >
                        {category}
                      </option>
                    ))}
                  </>
                ) : (
                  <option value="">{i18n.t('generalNoOptions')}</option>
                )}
            </select>
          </div>

          {isWattpad && subcategory && (
            <p className="bookForm-text">{i18n.t('bookFormText3')}</p>
          )}

          {/* Keywords */}
          {(!isWattpad || (isWattpad && subcategory)) && (
            <div className="input-container">
              <label>{i18n.t('bookFormLabelKeywords')}</label>
              <input
                type="text"
                value={keywords}
                onChange={(event) => { setKeywords(event.target.value); }}
                onKeyDown={handleKeyDown}
              />
            </div>
          )}

          {/* Number of pages */}
          {!isWattpad && (
            <div className="input-container">
              <label>{i18n.t('bookFormLabelNbPages')}</label>
              <div className="input-double">
                <input
                  type="number"
                  value={minOfPages}
                  onChange={(event) => { setMinOfPages(event.target.value); }}
                  onKeyDown={handleKeyDown}
                  placeholder={i18n.t('inputMin')}
                  min="0"
                  max="9999"
                  step="1"
                />
                <input
                  type="number"
                  value={maxOfPages}
                  onChange={(event) => { setMaxOfPages(event.target.value); }}
                  onKeyDown={handleKeyDown}
                  placeholder={i18n.t('inputMax')}
                  min="0"
                  max="9999"
                  step="1"
                />
              </div>
            </div>
          )}

          {/* Publication years */}
          {!isWattpad && (
            <div className="input-container">
              <label>{i18n.t('bookFormLabelYears')}</label>
              <div className="input-double">
                <input
                  type="number"
                  value={minYear}
                  onChange={(event) => { setMinYear(event.target.value); }}
                  onKeyDown={handleKeyDown}
                  placeholder={i18n.t('inputMin')}
                  min="1900"
                  max={currentYear}
                  step="1"
                />
                <input
                  type="number"
                  value={maxYear}
                  onChange={(event) => { setMaxYear(event.target.value); }}
                  onKeyDown={handleKeyDown}
                  placeholder={i18n.t('inputMax')}
                  min="1900"
                  max={currentYear}
                  step="1"
                />
              </div>
            </div>
          )}

          {(!isWattpad || (isWattpad && subcategory)) && (
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
          )}
        </>
      )}
    </div>
  );
}

BookForm.propTypes = {
  inFilling: PropTypes.func,
};

export default BookForm;
