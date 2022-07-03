import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import {
  ChangeSettingsRequestT,
  FilteringSettingsT,
  FilteringType,
  RpcMessage,
  SettingsRequestT,
  SettingsResponseT,
  SteamVRTrackersSettingT,
} from 'solarxr-protocol';
import { useConfig } from '../../../hooks/config';
import { useWebsocketAPI } from '../../../hooks/websocket-api';
import { CheckBox } from '../../commons/Checkbox';
import { SquaresIcon } from '../../commons/icon/SquaresIcon';
import { SteamIcon } from '../../commons/icon/SteamIcon';
import { WrenchIcon } from '../../commons/icon/WrenchIcons';
import { NumberSelector } from '../../commons/NumberSelector';
import { Radio } from '../../commons/Radio';
import { Select } from '../../commons/Select';
import { Typography } from '../../commons/Typography';
import { SettingsPageLayout } from '../SettingsPageLayout';

interface SettingsForm {
  trackers: {
    waist: boolean;
    chest: boolean;
    legs: boolean;
    knees: boolean;
    elbows: boolean;
  };
  filtering: {
    type: number;
    intensity: number;
    ticks: number;
  };
  interface: {
    devmode: boolean;
  };
}

export function GeneralSettings() {
  const { config, setConfig } = useConfig();
  const { state } = useLocation();
  const pageRef = useRef<HTMLFormElement | null>(null);

  const { sendRPCPacket, useRPCPacket } = useWebsocketAPI();
  const { register, reset, control, watch, handleSubmit } =
    useForm<SettingsForm>({
      defaultValues: {
        trackers: {
          waist: false,
          chest: false,
          elbows: false,
          knees: false,
          legs: false,
        },
        filtering: { intensity: 0, ticks: 0 },
        interface: { devmode: false },
      },
    });

  const onSubmit = (values: SettingsForm) => {
    const settings = new ChangeSettingsRequestT();

    if (values.trackers) {
      const trackers = new SteamVRTrackersSettingT();
      trackers.waist = values.trackers.waist;
      trackers.chest = values.trackers.chest;
      trackers.legs = values.trackers.legs;
      trackers.knees = values.trackers.knees;
      trackers.elbows = values.trackers.elbows;
      settings.steamVrTrackers = trackers;
    }

    const filtering = new FilteringSettingsT();
    filtering.type = values.filtering.type;
    filtering.intensity = values.filtering.intensity;
    filtering.ticks = values.filtering.ticks;

    settings.filtering = filtering;
    sendRPCPacket(RpcMessage.ChangeSettingsRequest, settings);

    setConfig({ debug: values.interface.devmode });
  };

  useEffect(() => {
    const subscription = watch(() => handleSubmit(onSubmit)());
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    sendRPCPacket(RpcMessage.SettingsRequest, new SettingsRequestT());
  }, []);

  useRPCPacket(RpcMessage.SettingsResponse, (settings: SettingsResponseT) => {
    reset({
      ...(settings.steamVrTrackers
        ? { trackers: settings.steamVrTrackers }
        : {}),
      ...(settings.filtering ? { filtering: settings.filtering } : {}),
      interface: {
        devmode: config?.debug,
      },
    });
  });

  // Handle scrolling to selected page
  useEffect(() => {
    const typedState: { scrollTo: string } = state as any;
    if (!pageRef.current || !typedState || !typedState.scrollTo) {
      return;
    }
    const elem = pageRef.current.querySelector(`#${typedState.scrollTo}`);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  }, [state]);

  return (
    <form className="flex flex-col gap-3" ref={pageRef}>
      <SettingsPageLayout icon={<SteamIcon></SteamIcon>} id="steamvr">
        <>
          <Typography variant="main-title">SteamVR</Typography>
          <Typography bold>SteamVR trackers</Typography>
          <div className="flex flex-col py-2">
            <Typography color="secondary">
              Enable or disable specific tracking parts.
            </Typography>
            <Typography color="secondary">
              Useful if you want more control over what SlimeVR does.
            </Typography>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-3">
            <CheckBox
              variant="toggle"
              outlined
              control={control}
              name="trackers.waist"
              label="Waist"
            />
            <CheckBox
              variant="toggle"
              outlined
              control={control}
              name="trackers.chest"
              label="Chest"
            />
            <CheckBox
              variant="toggle"
              outlined
              control={control}
              name="trackers.legs"
              label="Feet"
            />
            <CheckBox
              variant="toggle"
              outlined
              control={control}
              name="trackers.knees"
              label="Knees"
            />
            <CheckBox
              variant="toggle"
              outlined
              control={control}
              name="trackers.elbows"
              label="Elbows"
            />
          </div>
        </>
      </SettingsPageLayout>
      <SettingsPageLayout icon={<WrenchIcon></WrenchIcon>} id="mechanics">
        <>
          <Typography variant="main-title">Tracker mechanics</Typography>
          <Typography bold>Filtering</Typography>
          <div className="flex flex-col pt-2 pb-4">
            <Typography color="secondary">
              Choose the filtering type for your trackers.
            </Typography>
            <Typography color="secondary">
              Extrapolation predicts movement while interpolation smoothens
              movement.
            </Typography>
          </div>
          <Typography>Filtering type</Typography>
          <div className="flex lg:flex-row sm:flex-col gap-3 pt-2">
            <Radio
              control={control}
              name="filtering.type"
              label="No filtering"
              desciption="Use measurements as is, will not do any filtering."
              value={FilteringType.NONE}
            ></Radio>
            <Radio
              control={control}
              name="filtering.type"
              label="Smoothing"
              desciption="Smooths the movements but adds some latency."
              value={FilteringType.INTERPOLATION}
            ></Radio>
            <Radio
              control={control}
              name="filtering.type"
              label="Prediction"
              desciption="Reduces latency and makes movements more snappy, but may increase jitter."
              value={FilteringType.EXTRAPOLATION}
            ></Radio>
          </div>
          <div className="flex gap-5 pt-5">
            {/* <Select
              {...register('filtering.type')}
              label="Filtering Type"
              options={[
                { label: 'None', value: 0 },
                { label: 'Interpolation', value: 1 },
                { label: 'Extrapolation', value: 2 },
              ]}
            /> */}

            <NumberSelector
              control={control}
              name="filtering.intensity"
              label="Intensity"
              valueLabelFormat={(value) => `${value} %`}
              min={0}
              max={100}
              step={10}
            />
            <NumberSelector
              control={control}
              name="filtering.ticks"
              label="Latency"
              valueLabelFormat={(value) => `${value} ticks`}
              min={0}
              max={50}
              step={1}
            />
          </div>
        </>
      </SettingsPageLayout>
      <SettingsPageLayout icon={<SquaresIcon></SquaresIcon>} id="interface">
        <>
          <Typography variant="main-title">Interface</Typography>
          <Typography bold>Developer Mode</Typography>
          <div className="flex flex-col">
            <Typography color="secondary">
              This mode can be useful if you need in-depth data or to interact
            </Typography>
            <Typography color="secondary">
              with connected trackers on a more advanced level
            </Typography>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-3">
            <CheckBox
              variant="toggle"
              control={control}
              outlined
              name="interface.devmode"
              label="Developper mode"
            />
          </div>
        </>
      </SettingsPageLayout>
    </form>
  );
}
