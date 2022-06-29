import classNames from "classnames";
import { useEffect, useMemo, useRef, useState } from "react";
import { BodyPart, DeviceDataT, TrackerDataT, TrackerStatus } from "solarxr-protocol";
import { WifiIcon } from "../commons/icon/WifiIcon";
import { BatteryIcon } from "../commons/icon/BatteryIcon";
import { TrackerSettings } from "./TrackerSettings";
import { IconButton } from "../commons/ButtonIcon";
import { GearIcon } from "../commons/icon/GearIcon";
import { QuaternionFromQuatT } from "../../maths/quaternion";


const statusLabel = {
    [TrackerStatus.NONE]: 'No Status',
    [TrackerStatus.BUSY]: 'Busy',
    [TrackerStatus.ERROR]: 'Error',
    [TrackerStatus.DISCONNECTED]: 'Disconnected',
    [TrackerStatus.OCCLUDED]: 'Occluded',
    [TrackerStatus.OK]: 'Connected',
}

function TrackerBig({ device, tracker, trackerName, statusClass, velocity }: { tracker: TrackerDataT, device?: DeviceDataT, trackerName: string | Uint8Array, statusClass: string, velocity: number}) {
    return (
        <div className="flex flex-col justify-center rounded-md py-3 pr-4 pl-4 w-full gap-2 bg-purple-gray-700 bg-background-30 box-border my-8 px-6 h-52" style={{'boxShadow': `0px 0px ${velocity * 15}px ${velocity * 15}px #183951`, }}>
        <div className="flex justify-center">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="28" height="28" rx="2" fill="#56407B"/>
                <path d="M18.5981 6.05798L18.1461 7.57104C18.0991 7.72904 18.0361 7.92496 18.0061 8.00696C17.8731 8.3476 17.7678 8.69847 17.6911 9.05603C17.6078 9.35662 17.595 9.67231 17.6538 9.97864C17.7126 10.285 17.8414 10.5737 18.0301 10.822C18.0651 10.866 18.2771 11.2161 18.5031 11.6021C18.7291 11.9881 18.9321 12.3339 18.9581 12.3719C19.0375 12.4967 19.1065 12.6279 19.1641 12.764C19.2954 13.1107 19.3199 13.4887 19.2346 13.8494C19.1492 14.2101 18.9578 14.5369 18.6851 14.788C18.3588 15.1236 17.9785 15.4021 17.5601 15.6119C16.885 15.93 16.3258 16.4504 15.9601 17.101C15.8219 17.345 15.6665 17.579 15.4951 17.801C15.3751 17.967 15.1531 18.292 15.0011 18.524C14.7241 18.945 14.5201 19.2441 14.3791 19.4301C14.0713 19.8357 13.7085 20.1964 13.3011 20.502L12.9011 20.796C12.4511 21.131 12.4491 21.132 12.2011 21.146C12.0364 21.1349 11.8735 21.1855 11.7441 21.288C11.6483 21.3637 11.5381 21.4192 11.4201 21.451C11.3022 21.4829 11.179 21.4904 11.0581 21.473C10.8581 21.473 10.8231 21.4731 10.7951 21.451C10.7435 21.4122 10.7026 21.3609 10.6761 21.302C10.6746 21.2885 10.6682 21.276 10.6581 21.267C10.6411 21.254 10.6301 21.26 10.5821 21.306C10.5023 21.376 10.4081 21.4276 10.3061 21.457C10.2078 21.4797 10.1066 21.4871 10.0061 21.479H9.7921L9.7121 21.438C9.67073 21.4185 9.63235 21.3933 9.5981 21.363L9.5641 21.328H9.3391C9.0311 21.328 8.9941 21.32 8.8991 21.228C8.84921 21.1797 8.79222 21.1392 8.7301 21.108C8.61137 21.0413 8.50891 20.9491 8.4301 20.838C8.41279 20.7935 8.40728 20.7453 8.4141 20.698L8.4201 20.604L8.5061 20.515C8.5961 20.423 8.6061 20.39 8.5811 20.337C8.53854 20.293 8.48119 20.2662 8.4201 20.262C8.32553 20.2388 8.24225 20.1828 8.1851 20.104C8.09834 20.0317 8.03903 19.9318 8.0171 19.821C7.98191 19.6196 8.00125 19.4124 8.0731 19.2209C8.1321 19.0639 8.1321 19.064 8.3671 19.063C8.57004 19.0815 8.77415 19.0437 8.9571 18.954C9.02435 18.9097 9.10263 18.8851 9.1831 18.8829C9.2331 18.8829 9.2711 18.862 9.5831 18.671C9.83458 18.5055 10.1027 18.3666 10.3831 18.257L10.4881 18.223L10.5591 18.0229C10.7588 17.4891 10.9019 16.9357 10.9861 16.3719C11.0496 15.9465 11.1422 15.5259 11.2631 15.113C11.3728 14.7304 11.5064 14.355 11.6631 13.989C12.0182 13.0652 12.2417 12.096 12.3271 11.11C12.3801 10.764 12.4431 10.3661 12.4661 10.2271C12.4891 10.0881 12.5171 9.89894 12.5281 9.80994C12.5391 9.72094 12.5631 9.51606 12.5821 9.35706C12.6011 9.19806 12.6291 8.96499 12.6421 8.83899C12.6551 8.71299 12.6771 8.51101 12.6901 8.38501C12.7441 7.88501 12.8191 7.11596 12.8711 6.53796C12.8901 6.31196 12.9111 6.09799 12.9151 6.06299L12.9221 6H18.6161L18.5981 6.05798Z" fill="white"/>
            </svg>
        </div>
        <div className="flex justify-center text-field-title">{trackerName}</div>
        <div className="flex justify-center text-default gap-2">
            <div className="flex flex-col justify-center">
                <div className={classNames("w-2 h-2 rounded-full", statusClass)}></div>
            </div>
            <div className="justify-center">{statusLabel[tracker.status]}</div>
        </div>
        <div className="flex text-default justify-center gap-5 flex-wrap">
            {device && device.hardwareStatus &&
                <>
                    {device.hardwareStatus.batteryPctEstimate &&
                        <div className="flex gap-2">
                            <div className="flex flex-col justify-around">
                                <BatteryIcon value={device.hardwareStatus.batteryPctEstimate / 100}/>
                            </div>
                            <div className="flex">{((device.hardwareStatus.batteryPctEstimate)).toFixed(0)} %</div>
                        </div>
                    }
                    <div className="flex gap-2">
                        {device.hardwareStatus.rssi && <div className="flex flex-col justify-around">
                            <WifiIcon value={device.hardwareStatus?.rssi} />
                        </div>}
                        {device.hardwareStatus.ping && <div className="flex">{device.hardwareStatus.ping} ms</div>}
                    </div>
                
                </>
            }
            {/* <div className="flex w-1/3 gap-0.5 justify-around flex-col">
                <div className="w-full rounded-full h-1 bg-purple-gray-600">
                    <div className="h-1 rounded-full bg-accent-darker" style={{width: `${velocity * 100}%`}}></div>
                </div>
            </div> */}
        </div>
        {/* {tracker.info?.editable && 
            <div className="flex flex-col flex-shrink justify-around">
                <IconButton className="fill-purple-gray-300" icon={<GearIcon/>}/>
            </div>
        } */}
    </div>
    )
}

function TrackerSmol({ device, tracker, trackerName, statusClass, velocity }: { tracker: TrackerDataT, device?: DeviceDataT, trackerName: string | Uint8Array, statusClass: string, velocity: number}) {
    return (
        <div className="flex flex-col justify-center rounded-md py-3 pr-4 pl-4 w-full gap-2 bg-purple-gray-700 bg-background-30 box-border my-8 px-6 h-52" style={{'boxShadow': `0px 0px ${velocity * 15}px ${velocity * 15}px #183951`, }}>
        </div>
    )
}

export function TrackerCard({ tracker, device, smol = false }:  { tracker: TrackerDataT, device?: DeviceDataT, smol?: boolean }) {

    const previousRot = useRef<{ x: number, y: number, z: number, w: number }>(tracker.rotation!)
    const [velocity, setVelocity] = useState<number>(0);
    const [rots, setRotation] = useState<number[]>([]);

    const statusClass = useMemo(() => {
        const statusMap: { [key: number]: string } = {
            [TrackerStatus.NONE]: 'bg-background-20',
            [TrackerStatus.BUSY]: 'bg-status-warning',
            [TrackerStatus.ERROR]: 'bg-status-error',
            [TrackerStatus.DISCONNECTED]: 'bg-background-20',
            [TrackerStatus.OCCLUDED]: 'bg-status-warning',
            [TrackerStatus.OK]: 'bg-status-online'
        }
        return statusMap[tracker.status];
    }, [tracker.status]);

    useEffect(() => {
        if (tracker.rotation) {
            const rot = QuaternionFromQuatT(tracker.rotation).mul(QuaternionFromQuatT(previousRot.current).inverse());
            const dif = Math.min(1, (rot.x ** 2 + rot.y ** 2 + rot.z ** 2) * 2.5)
            // Use sum of rotation of last 3 frames (0.3sec) for smoother movement and better detection of slow movement.
            if (rots.length === 3) {
                rots.shift();
            }
            rots.push(dif);
            setRotation(rots);
            setVelocity(Math.min(1, Math.max(0, rots.reduce((a, b) => a + b))));
            previousRot.current = tracker.rotation;
        }
    }, [tracker.rotation])

    const trackerName = useMemo(() => {
        if (device?.customName)
            return device.customName;
        if (tracker.info?.bodyPart)
            return BodyPart[tracker.info?.bodyPart];
        return device?.hardwareInfo?.displayName || 'NONE';

    }, [tracker.info, device?.customName, device?.hardwareInfo?.displayName])

    return (
        <TrackerSettings tracker={tracker} device={device} >
            <>
                {smol && <TrackerBig tracker={tracker} device={device} trackerName={trackerName} statusClass={statusClass} velocity={velocity}></TrackerBig>}
                {!smol && <TrackerSmol tracker={tracker} device={device} trackerName={trackerName} statusClass={statusClass} velocity={velocity}></TrackerSmol>}
            </>
        </TrackerSettings>
    )

}