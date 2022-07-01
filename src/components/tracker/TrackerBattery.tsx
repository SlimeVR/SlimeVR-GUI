import { BatteryIcon } from '../commons/icon/BatteryIcon';
import { Typography } from '../commons/Typography';

export function TrackerBattery({
  value,
  disabled,
}: {
  value: number;
  disabled?: boolean;
}) {
  return (
    <div className="flex gap-2">
      <div className="flex flex-col justify-around">
        <BatteryIcon value={value} disabled={disabled} />
      </div>
      {!disabled && (
        <div className="w-10">
          <Typography color="secondary">
            {(value * 100).toFixed(0)} %
          </Typography>
        </div>
      )}
      {disabled && (
        <div className="flex flex-col justify-center w-10">
          <div className="w-7 h-1 bg-background-30 rounded-full"></div>
        </div>
      )}
    </div>
  );
}
