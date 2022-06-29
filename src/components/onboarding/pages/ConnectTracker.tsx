import { NavLink } from "react-router-dom";
import { ArrowLink } from "../../commons/ArrowLink";
import { Button } from "../../commons/Button";


export function ConnectTrackersPage() {


    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-col w-full h-full justify-center items-center">
                <div className="flex gap-10 h-full ">
                    <div className="flex flex-col max-w-sm gap-3">
                        <ArrowLink to="/onboarding/home">Go Back to WiFi credentials</ArrowLink>
                        <div className="text-main-title">Input WiFi credentials</div>
                        <p>The Trackers will use these credentials to connect wirelessly</p>
                        <p>please use the credentials that you are currently connected to</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 overflow-y-scroll">
                        {Array.from({ length: 50 }).map(() => <div className="rounded-xl bg-background-40 w-80 h-14"></div>)}
                    </div>
                </div>
            </div>
            <div className="w-full py-4 flex flex-row">
                <div className="flex flex-grow">
                    <Button variant="primary" to="/">Skip setup</Button>
                </div>
                <div className="flex gap-3">
                    <Button variant="primary" to="/onboarding/connect">I connected all trackers</Button>
                </div>
            </div>
        </div>
    )
}