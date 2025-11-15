import React from 'react';
import './GameContainer.css';
import Roulette from '../games/Roulette';
import Ladder from '../games/Ladder';
import BombTimer from '../games/BombTimer';
import CardFlip from '../games/CardFlip';

const GameContainer = ({ game, menus }) => {
  const renderGame = () => {
    switch (game) {
      case 'roulette':
        return <Roulette menus={menus} />;
      case 'ladder':
        return <Ladder menus={menus} />;
      case 'bomb_timer':
        return <BombTimer menus={menus} />;
      case 'card_flip':
        return <CardFlip menus={menus} />;
      default:
        return <p>Select a game to start</p>;
    }
  };

  return <div className="game-container">{renderGame()}</div>;
};

export default GameContainer;
