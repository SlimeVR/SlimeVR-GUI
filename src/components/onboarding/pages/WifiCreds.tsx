import { ArrowLink } from "../../commons/ArrowLink";
import { Button } from "../../commons/Button";
import { CheckBox } from "../../commons/Checkbox";
import { Input } from "../../commons/Input";
import { Typography } from "../../commons/Typography";


export function WifiCredsPage() {
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-col w-full h-full justify-center items-center">
                <div className="flex gap-10">
                    <div className="flex flex-col max-w-sm gap-3">
                        <ArrowLink to="/onboarding/home">Go Back to introduction</ArrowLink>
                        <Typography variant="main-title">Input WiFi credentials</Typography>
                        <Typography color="secondary">The Trackers will use these credentials to connect wirelessly</Typography>
                        <Typography color="secondary">please use the credentials that you are currently connected to</Typography>
                    </div>
                    <div className="flex flex-col bg-background-70 gap-3 p-10 rounded-xl max-w-sm">
                        <Input type='text' label="SSID" placeholder="Enter SSID"/>
                        <Input type='password' label="Password" placeholder="Enter password"/>
                        <CheckBox variant="toggle" label="Tell all nearby trackers to connect with these credentials"></CheckBox>
                    </div>
                </div>
            </div>
            <div className="w-full py-4 flex flex-row">
                <div className="flex flex-grow">
                    <Button variant="secondary" to="/">Skip setup</Button>
                </div>
                <div className="flex gap-3">
                    <Button variant="secondary" to="/onboarding/connect-trackers">Don't use WiFi</Button>
                    <Button variant="primary" to="/onboarding/connect-trackers">Submit!</Button>
                </div>
            </div>
        </div>
        
    )
}