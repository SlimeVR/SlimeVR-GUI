import { NavLink } from "react-router-dom";
import { Button } from "../../commons/Button";
import { SlimeVRIcon } from "../../commons/icon/SimevrIcon";



export function HomePage() {
    
    return (
        <div className="flex flex-col gap-5 h-full items-center w-full justify-center">
            <SlimeVRIcon></SlimeVRIcon>
            <div className="text-lg">Welcome to SlimeVR</div>
            <div className="flex flex-col items-center">
                <p className="text-sm">Bringing full-body tracking</p>
                <p className="text-sm">to everyone</p>
            </div>
            <Button variant="primary" to="/onboarding/wifi-creds">Lets get setup!</Button>
            <NavLink to="/">Skip setup</NavLink>
        </div>
    )
}