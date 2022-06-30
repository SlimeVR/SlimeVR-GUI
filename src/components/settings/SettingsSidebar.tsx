import { NavLink } from 'react-router-dom';
import { Typography } from '../commons/Typography';

export function SettingsSidebar() {
  return (
    <div className="flex flex-col px-5 w-72 py-5 gap-3 overflow-y-auto bg-background-70 rounded-lg">
      <Typography variant="main-title">Settings</Typography>
      <div className="flex flex-col gap-3">
        <Typography variant="section-title">General</Typography>
        <div className="flex flex-col gap-2">
          <NavLink
            to="/settings/trackers"
            state={{ scrollTo: 'steamvr' }}
            className="pl-5 py-2 hover:bg-purple-gray-700 rounded-lg"
          >
            SteamVR
          </NavLink>
          <NavLink
            to="/settings/trackers"
            state={{ scrollTo: 'mechanics' }}
            className="pl-5 py-2 hover:bg-purple-gray-700 rounded-lg"
          >
            Tracker mechanics
          </NavLink>
          <NavLink
            to="/settings/trackers"
            state={{ scrollTo: 'interface' }}
            className="pl-5 py-2 hover:bg-purple-gray-700 rounded-lg"
          >
            Inerface
          </NavLink>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <Typography variant="section-title">Utilities</Typography>
        <div className="flex flex-col gap-2">
          <NavLink
            to="/settings/serial"
            className="pl-3 py-2 hover:bg-primary-5 rounded-lg"
          >
            Serial Console
          </NavLink>
        </div>
      </div>
    </div>
  );
}
