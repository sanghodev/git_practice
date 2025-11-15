import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Settings.css';

const Settings = ({ team, onTeamChange }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');

  const handleAddMember = () => {
    if (newMemberName.trim()) {
      onTeamChange([...team, { id: Date.now(), name: newMemberName.trim() }]);
      setNewMemberName('');
    }
  };

  const handleRemoveMember = (id) => {
    onTeamChange(team.filter((member) => member.id !== id));
  };

  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)} className="settings-button">
        {t('settings')}
      </button>
    );
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>{t('settings')}</h2>
        <div>
          <h3>{t('team_management')}</h3>
          <ul>
            {team.map((member) => (
              <li key={member.id}>
                {member.name}
                <button onClick={() => handleRemoveMember(member.id)}>{t('remove_member')}</button>
              </li>
            ))}
          </ul>
          <input
            type="text"
            value={newMemberName}
            onChange={(e) => setNewMemberName(e.target.value)}
            placeholder={t('enter_name')}
          />
          <button onClick={handleAddMember}>{t('add_member')}</button>
        </div>
        <button onClick={() => setIsOpen(false)}>Close</button>
      </div>
    </div>
  );
};

export default Settings;
