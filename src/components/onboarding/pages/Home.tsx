import { NavLink } from 'react-router-dom';
import { Button } from '../../commons/Button';
import { SlimeVRIcon } from '../../commons/icon/SimevrIcon';
import { Typography } from '../../commons/Typography';

export function HomePage() {
  return (
    <div className="flex flex-col gap-5 h-full items-center w-full justify-center">
      <SlimeVRIcon></SlimeVRIcon>
      <Typography variant="main-title">Welcome to SlimeVR</Typography>
      <div className="flex flex-col items-center">
        <Typography color="secondary">Bringing full-body tracking</Typography>
        <Typography color="secondary">to everyone</Typography>
      </div>
      <Button variant="primary" to="/onboarding/wifi-creds">
        Lets get setup!
      </Button>
      <NavLink to="/">
        <Typography color="secondary">Skip setup</Typography>
      </NavLink>
    </div>
  );
}