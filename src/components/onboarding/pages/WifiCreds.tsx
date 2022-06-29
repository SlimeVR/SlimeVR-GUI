import { NavLink } from "react-router-dom";
import { Button } from "../../commons/Button";
import { CheckBox } from "../../commons/Checkbox";
import { Input } from "../../commons/Input";


export function WifiCredsPage() {


    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-col w-full h-full justify-center items-center">
                <div className="flex gap-10">
                    <div className="flex flex-col max-w-sm gap-3">
                        <NavLink to="/onboarding/home">Go Back to introduction</NavLink>
                        <div className="text-xl">Input WiFi credentials</div>
                        <p>The Trackers will use these credentials to connect wirelessly</p>
                        <p>please use the credentials that you are currently connected to</p>
                    </div>
                    <div className="flex flex-col bg-background-40 gap-3 p-10 rounded-xl max-w-sm">
                        <div>SSID</div>
                        <Input type='text'/>
                        <div>Password</div>
                        <Input type='password'/>
                        <CheckBox label="Tell all nearby trackers to connect with these credentials"></CheckBox>
                    </div>
                </div>
            </div>
            <div className="w-full p-4 flex flex-row">
                <div className="flex flex-grow">
                    <Button variant="primary" to="/">Skip setup</Button>
                </div>
                <div className="flex gap-3">
                    <Button variant="primary" to="/onboarding/connect-trackers">Don't use WiFi</Button>
                    <Button variant="primary" to="/onboarding/connect-trackers">Submit!</Button>
                </div>
            </div>
        </div>
        
    )
}