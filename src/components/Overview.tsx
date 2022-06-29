import { useEffect, useMemo, useState } from "react";
import { BodyPart, DataFeedMessage, DataFeedUpdateT, DeviceDataT, TrackerDataT } from "solarxr-protocol";
import { useAppContext } from "../hooks/app";
import { useWebsocketAPI } from "../hooks/websocket-api";
import { Typography } from "./commons/Typography";
import { TrackerCard } from "./tracker/TrackerCard";
// import { TrackerCard } from "./tracker/TrackerCard";

interface FlatDeviceTracker {
    device?: DeviceDataT;
    tracker: TrackerDataT;
}


export function Overview() {
    const { state } = useAppContext();


    const trackers = useMemo(() => (state.datafeed?.devices || []).reduce<FlatDeviceTracker[]>((curr, device) => ([...curr, ...device.trackers.map((tracker) => ({ tracker, device }))]), []), [state]);
    
    const asignedTrackers = useMemo(() => 
        trackers.filter(({ tracker: { info } }) => {
            return info && info.bodyPart !== BodyPart.NONE
        })
    , [trackers]);

    const unasignedTrackers = useMemo(() => 
        trackers.filter(({ tracker: { info } }) => {
            return info && info.bodyPart === BodyPart.NONE
        })
    , [trackers]);

    return (
        <div className="overflow-y-auto flex flex-col gap-2">
            <div className="flex px-5 pt-3">
                <Typography>Assigned Trackers</Typography>
            </div>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-5 sm:grid-cols-1 px-8">
                {asignedTrackers.map(({ tracker, device }, index) => <TrackerCard key={index} tracker={tracker} device={device}/>)}
            </div>
            {/* {syntheticlist.length > 0 &&
                <>
                    <div className="flex px-5 pt-3">
                        <Typography>External Trackers</Typography>
                    </div>
                    <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-5 sm:grid-cols-1 px-8">
                        {syntheticlist.map((tracker, index) => <TrackerCard key={index} tracker={tracker} />)}
                    </div>
                </>

            } */}
            {unasignedTrackers.length > 0 &&
                <>
                    <div className="flex px-5 pt-3">
                        <Typography>Unassigned Trackers</Typography>
                    </div>
                    <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-5 sm:grid-cols-1 px-8">
                        {unasignedTrackers.map(({tracker, device}, index) => <TrackerCard key={index} tracker={tracker} device={device}/>)}
                    </div>
                </>

            }
        </div>
        
    )
}