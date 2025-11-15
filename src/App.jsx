import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './styles/cute.css';
import './styles/minimal.css';
import './App.css';
import Layout from './components/Layout';
import Header from './components/Header';
import Settings from './components/Settings';
import GameSelection from './components/GameSelection';
import GameContainer from './components/GameContainer';
import RestaurantList from './components/RestaurantList';
import { getCurrentPosition } from './services/geolocation';
import { fetchNearbyRestaurants } from './services/places';

function App() {
  const { t, i18n } = useTranslation();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'cute');
  const [selectedGame, setSelectedGame] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [locationError, setLocationError] = useState(null);
  const [team, setTeam] = useState(() => JSON.parse(localStorage.getItem('team')) || []);
  const [votes, setVotes] = useState(() => JSON.parse(localStorage.getItem('votes')) || {});

  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('team', JSON.stringify(team));
  }, [team]);

  useEffect(() => {
    localStorage.setItem('votes', JSON.stringify(votes));
  }, [votes]);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [i18n]);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const handleFetchRestaurants = async () => {
    try {
      setLocationError(null);
      const position = await getCurrentPosition();
      const fetchedRestaurants = await fetchNearbyRestaurants(position.lat, position.lng);
      setRestaurants(fetchedRestaurants);
    } catch (error) {
      setLocationError(error.message);
    }
  };

  const handleVote = (menuItemId) => {
    setVotes((prevVotes) => ({
      ...prevVotes,
      [menuItemId]: (prevVotes[menuItemId] || 0) + 1,
    }));
  };

  const getVotedMenus = () => {
    const allMenus = restaurants.flatMap((r) => r.menu);
    return allMenus.filter((menu) => votes[menu.id] > 0);
  };

  return (
    <Layout>
      <Header
        theme={theme}
        onThemeChange={handleThemeChange}
        onLanguageChange={handleLanguageChange}
      />
      <main>
        <button onClick={handleFetchRestaurants}>{t('fetch_nearby_restaurants')}</button>
        {locationError && <p>Error: {locationError}</p>}
        <RestaurantList restaurants={restaurants} votes={votes} onVote={handleVote} />
        <GameSelection onSelectGame={setSelectedGame} />
        <GameContainer game={selectedGame} menus={getVotedMenus()} />
      </main>
      <Settings team={team} onTeamChange={setTeam} />
    </Layout>
  );
}

export default App;
