import classnames from 'classnames';
import { ReactChild } from 'react';
import {
    useMatch,
    NavLink,
} from "react-router-dom";
import { CubeIcon } from './commons/icon/CubeIcon';
import { GearIcon } from './commons/icon/GearIcon';

export function NavButton({ to, children, match, icon }: { to: string, children: ReactChild, match?: string, icon: ReactChild }) {

    const doesMatch = useMatch({
        path: match || to,
    });

    return (
        <NavLink to={to} className={classnames("flex flex-col justify-center gap-4 w-[75px] h-[75px] rounded-md group select-text text-emphasised", { 'bg-accent-background-10': doesMatch, 'hover:bg-background-30': !doesMatch })}>
            <div className="flex justify-around">
                <div className={classnames("scale-150", { 'fill-accent-lighter': doesMatch, 'fill-background-50': !doesMatch })}>{icon}</div>
            </div>
            <div className={classnames('text-center', { 'text-purple-gray-100': doesMatch, 'text-purple-gray-300': !doesMatch })}>{children}</div>
        </NavLink>
    )
}


export function Navbar({ children }: { children?: ReactChild }) {
    return (
        <div data-tauri-drag-region className='flex flex-col p-2 px-4'>
            <div className="flex flex-col flex-grow gap-4">
                <NavButton to="/" icon={<CubeIcon></CubeIcon>}>Home</NavButton>
                <NavButton to="/proportions" icon={<GearIcon></GearIcon>}>Body proportions</NavButton>
                <NavButton to="/onboarding/home" icon={<GearIcon></GearIcon>}>Setup Wizard</NavButton>
            </div>
            <NavButton to="/settings/trackers" icon={<GearIcon></GearIcon>}>Settings</NavButton>
        </div>
    )
}