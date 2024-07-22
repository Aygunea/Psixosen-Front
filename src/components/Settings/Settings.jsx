import React from 'react';
import SettingsTitle from './SettingsTitle';
import Common from './Common';

const Settings = () => {

  return (
    // <div className="h-full flex flex-col xs:px-6 px-8 ">
    <div className="h-full flex flex-col">
      <SettingsTitle />
      <div className="flex-grow overflow-y-auto scrollbar-hide">
      <Common />
      </div>
    </div>
  );
};

export default Settings;