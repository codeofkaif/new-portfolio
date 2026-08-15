import { ResponsiveContainer, LineChart, Line } from 'recharts';

interface SparklineProps {
  data?: number[];
  color?: string;
}

const defaultData = [10, 15, 8, 22, 18, 30, 25, 40, 35, 50];

export function Sparkline({ data = defaultData, color = '#8B5CF6' }: SparklineProps) {
  const chartData = data.map((val, i) => ({ id: i, value: val }));

  return (
    <div className="w-16 h-8 shrink-0">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
