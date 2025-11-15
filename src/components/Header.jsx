import React from 'react';
import { useTranslation } from 'react-i18next';
import './Header.css';

const Header = ({ theme, onThemeChange, onLanguageChange }) => {
  const { t, i18n } = useTranslation();

  return (
    <header className="header">
      <h1>{t('title')}</h1>
      <div className="controls">
        <div>
          <label>{t('theme')}: </label>
          <select onChange={onThemeChange} value={theme}>
            <option value="cute">{t('cute')}</option>
            <option value="minimal">{t('minimal')}</option>
          </select>
        </div>
        <div>
          <label>{t('language')}: </label>
          <select onChange={onLanguageChange} value={i18n.language}>
            <option value="en">English</option>
            <option value="ko">한국어</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;
