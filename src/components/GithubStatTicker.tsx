import { NumberTicker } from './ui/number-ticker';

export function GithubStatTicker({ value }: { value: number }) {
  return (
    <NumberTicker
      value={value}
      startValue={Math.max(0, Math.floor(value * 0.25))}
      className="text-3xl font-semibold tabular-nums text-[#FFFFFF]"
    />
  );
}
