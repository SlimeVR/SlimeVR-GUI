import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import {
  ChangeSettingsRequestT,
  FilteringSettingsT,
  RpcMessage,
  SettingsRequestT,
  SettingsResponseT,
  SteamVRTrackersSettingT,
} from 'solarxr-protocol';
import { useConfig } from '../../../hooks/config';
import { useWebsocketAPI } from '../../../hooks/websocket-api';
import { CheckBox } from '../../commons/Checkbox';
import { NumberSelector } from '../../commons/NumberSelector';
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
      <SettingsPageLayout id="steamvr">
        <>
          <Typography variant="main-title">SteamVR</Typography>
          <Typography>SteamVR trackers</Typography>
          <div className="flex flex-col">
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
              label="Legs"
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
      <SettingsPageLayout id="mechanics">
        <>
          <Typography variant="main-title">Tracker mechanics</Typography>
          <Typography>Filtering</Typography>
          <div className="flex flex-col">
            <Typography color="secondary">
              Choose the filtering type for your trackers.
            </Typography>
            <Typography color="secondary">
              Extrapolation predicts movement while interpolation smoothens
              movement.
            </Typography>
          </div>
          <div className="flex  gap-5 pt-5">
            <Select
              {...register('filtering.type')}
              label="Filtering Type"
              options={[
                { label: 'None', value: 0 },
                { label: 'Interpolation', value: 1 },
                { label: 'Extrapolation', value: 2 },
              ]}
            />
            <NumberSelector
              variant="smol"
              control={control}
              name="filtering.intensity"
              label="Intensity"
              valueLabelFormat={(value) => `${value}%`}
              min={0}
              max={100}
              step={10}
            />
            <NumberSelector
              variant="smol"
              control={control}
              name="filtering.ticks"
              label="Ticks"
              min={0}
              max={80}
              step={1}
            />
          </div>
        </>
      </SettingsPageLayout>
      <SettingsPageLayout id="interface">
        <>
          <Typography variant="main-title">Interface</Typography>
          <Typography>Developer Mode</Typography>
          <div className="flex flex-col">
            <Typography color="secondary">
              This mode can be useful if you need indepth data or interact with
            </Typography>
            <Typography color="secondary">
              connected trackers in a more advanced level
            </Typography>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-3">
            <CheckBox
              variant="toggle"
              control={control}
              name="interface.devmode"
              label="Developper mode"
            />
          </div>
        </>
      </SettingsPageLayout>
    </form>
  );
}
