import React from 'react';
import { useTranslation } from 'react-i18next';
import './GameSelection.css';

const GameSelection = ({ onSelectGame }) => {
  const { t } = useTranslation();

  return (
    <div className="game-selection">
      <h2>{t('select_game')}</h2>
      <select onChange={(e) => onSelectGame(e.target.value)}>
        <option value="">{t('select_a_game')}</option>
        <option value="roulette">{t('roulette')}</option>
        <option value="ladder">{t('ladder')}</option>
        <option value="bomb_timer">{t('bomb_timer')}</option>
        <option value="card_flip">{t('card_flip')}</option>
      </select>
    </div>
  );
};

export default GameSelection;
