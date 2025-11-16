import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './CardFlip.css';

// Create a pool of all possible event cards
const createEventCardPool = (t) => {
  const keys = Object.keys(t).filter(key => key.startsWith('event_card_'));
  return keys.map(key => ({
    type: key.split('_')[2], // e.g., 'mission', 'destiny'
    text: t(key),
    isEvent: true,
  }));
};

const CardFlip = ({ menus }) => {
  const { t } = useTranslation();
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState(new Set());
  const [result, setResult] = useState('');
  const [gameId, setGameId] = useState(0);

  useEffect(() => {
    const eventCards = createEventCardPool(t);
    const menuCards = menus.map(menu => ({ ...menu, isEvent: false, text: menu.name }));

    let finalCards = [];
    const totalCards = Math.max(menuCards.length, 6);
    const eventCardCount = Math.floor(totalCards * 0.3);
    const menuCardCount = totalCards - eventCardCount;

    if (menuCards.length === 0) {
      finalCards = [...eventCards].sort(() => 0.5 - Math.random()).slice(0, 10);
    } else {
      const selectedMenuCards = [...menuCards].sort(() => 0.5 - Math.random()).slice(0, menuCardCount);
      const selectedEventCards = [...eventCards].sort(() => 0.5 - Math.random()).slice(0, eventCardCount);
      finalCards = [...selectedMenuCards, ...selectedEventCards].sort(() => 0.5 - Math.random());
    }
    // Defer the state update to the next tick to avoid synchronous update within useEffect
    setTimeout(() => setCards(finalCards), 0);
  }, [gameId, menus, t]);

  const shuffleAndDeal = () => {
    setGameId(id => id + 1);
    setFlippedIndices(new Set());
    setResult('');
  };

  const handleFlip = (index) => {
    if (flippedIndices.has(index) || result) return;

    const newFlipped = new Set(flippedIndices);
    newFlipped.add(index);
    setFlippedIndices(newFlipped);

    const card = cards[index];
    setTimeout(() => {
      setResult(card.text);
    }, 600);
  };

  return (
    <div className="card-flip-container">
      <div className="game-board">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${flippedIndices.has(index) ? 'flipped' : ''}`}
            onClick={() => handleFlip(index)}
          >
            <div className="card-inner">
              <div className="card-front">?</div>
              <div className={`card-back ${card.isEvent ? `card-type-${card.type}` : 'card-type-menu'}`}>{card.text}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="game-controls">
        {result && <p className="result-text">{result}</p>}
        <button onClick={shuffleAndDeal}>{t('play_again')}</button>
      </div>
    </div>
  );
};

export default CardFlip;
