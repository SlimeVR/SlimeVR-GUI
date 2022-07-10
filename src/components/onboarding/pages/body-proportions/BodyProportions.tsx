import classNames from 'classnames';
import { ReactChild, useEffect, useMemo, useState } from 'react';
import {
  RpcMessage,
  SkeletonBone,
  SkeletonConfigRequestT,
  SkeletonConfigResponseT,
} from 'solarxr-protocol';
import { useWebsocketAPI } from '../../../../hooks/websocket-api';
import { Typography } from '../../../commons/Typography';

export const skeletonBoneLabels = {
  [SkeletonBone.NONE]: 'None',
  [SkeletonBone.HEAD]: 'Head shift',
  [SkeletonBone.NECK]: 'Neck length',
  [SkeletonBone.TORSO]: 'Torso length',
  [SkeletonBone.CHEST]: 'Chest distance',
  [SkeletonBone.WAIST]: 'Waist distance',
  [SkeletonBone.HIP_OFFSET]: 'Hip offset',
  [SkeletonBone.HIPS_WIDTH]: 'Hips width',
  [SkeletonBone.LEGS_LENGTH]: 'Legs length',
  [SkeletonBone.KNEE_HEIGHT]: 'Knee height',
  [SkeletonBone.FOOT_LENGTH]: 'Foot length',
  [SkeletonBone.FOOT_SHIFT]: 'Foot shift',
  [SkeletonBone.SKELETON_OFFSET]: 'Skeleton offset',
  [SkeletonBone.CONTROLLER_DISTANCE_Z]: 'Controller distance z',
  [SkeletonBone.CONTROLLER_DISTANCE_Y]: 'Controller distance y',
  [SkeletonBone.FOREARM_LENGTH]: 'Forearm distance',
  [SkeletonBone.SHOULDERS_DISTANCE]: 'Shoulders distance',
  [SkeletonBone.SHOULDERS_WIDTH]: 'Shoulders width',
  [SkeletonBone.UPPER_ARM_LENGTH]: 'Upper arm length',
  [SkeletonBone.ELBOW_OFFSET]: 'Elbow offset',
};

function IncrementButton({ children }: { children: ReactChild }) {
  return (
    <div className="p-3 bg-background-60 hover:bg-background-50 rounded-lg w-16 h-16 flex flex-col justify-center items-center">
      <Typography variant="main-title" bold>
        {children}
      </Typography>
    </div>
  );
}

export function BodyProportions() {
  const { useRPCPacket, sendRPCPacket } = useWebsocketAPI();
  const [config, setConfig] = useState<SkeletonConfigResponseT | null>(null);
  const [selectedBone, setSelectedBone] = useState(SkeletonBone.HEAD);
  const bodyParts = useMemo(() => {
    return (
      config?.skeletonParts.map(({ bone, value }) => ({
        bone,
        label: skeletonBoneLabels[bone],
        value,
      })) || []
    );
  }, [config]);

  useRPCPacket(
    RpcMessage.SkeletonConfigResponse,
    (data: SkeletonConfigResponseT) => {
      setConfig(data);
    }
  );

  useEffect(() => {
    sendRPCPacket(
      RpcMessage.SkeletonConfigRequest,
      new SkeletonConfigRequestT()
    );
  }, []);

  return (
    <div className="relative w-full">
      <div className="flex flex-col overflow-y-scroll overflow-x-hidden max-h-[450px] w-full px-1  gap-3">
        {bodyParts.map(({ label, bone, value }) => (
          <div className="flex" key={bone}>
            <div
              className={classNames(
                'flex gap-2 transition-opacity duration-300',
                selectedBone != bone && 'opacity-0'
              )}
            >
              <IncrementButton>-10</IncrementButton>
              <IncrementButton>-1</IncrementButton>
            </div>
            <div
              className="flex flex-grow flex-col px-2"
              onClick={() => setSelectedBone(bone)}
            >
              <div
                key={bone}
                className={classNames(
                  'p-3  rounded-lg h-16 flex w-full items-center justify-between px-6 transition-colors duration-300',
                  (selectedBone == bone && 'bg-background-60') ||
                    'bg-background-70'
                )}
              >
                <Typography variant="section-title" bold>
                  {label}
                </Typography>
                <Typography variant="main-title" bold>
                  {Number(value * 100)
                    .toFixed(1)
                    .replace(/[.,]0$/, '')}{' '}
                  CM
                </Typography>
              </div>
            </div>
            <div
              className={classNames(
                'flex gap-2 transition-opacity duration-300',
                selectedBone != bone && 'opacity-0'
              )}
            >
              <IncrementButton>+1</IncrementButton>
              <IncrementButton>+10</IncrementButton>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 h-20 w-full pointer-events-none">
        <div className="w-full h-full bg-gradient-to-b from-transparent to-background-80 opacity-100"></div>
      </div>
    </div>
  );
}
