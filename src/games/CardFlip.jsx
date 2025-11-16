import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './CardFlip.css';

// A large pool of potential card outcomes
const createCardPool = (t) => [
  { type: 'dud', text: t('card_dud') },
  { type: 'one_more_try', text: t('card_one_more') },
  { type: 'you_treat', text: t('card_you_treat') },
  { type: 'pass', text: t('card_pass') },
  // Add more variations here to reach ~50
  ...Array.from({ length: 46 }, (_, i) => ({
    type: 'dud',
    text: `${t('card_dud')} #${i + 2}`,
  })),
];

const CardFlip = ({ menus }) => {
  const { t } = useTranslation();
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState(new Set());
  const [result, setResult] = useState('');
  const [gameId, setGameId] = useState(0);

  useEffect(() => {
    const cardPool = createCardPool(t);
    const shuffled = [...cardPool].sort(() => 0.5 - Math.random());
    const gameCards = shuffled.slice(0, menus.length > 1 ? menus.length : 6);
    // Defer state update to next tick
    setTimeout(() => setCards(gameCards), 0);
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
      setResult(`Card says: ${card.text}`);
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
              <div className={`card-back card-type-${card.type}`}>{card.text}</div>
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
