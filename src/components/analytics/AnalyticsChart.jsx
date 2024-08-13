import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '../../common/chart';

const AnalyticsChart = ({ analyticsData }) => {
  const chartConfig = {
    source: {
      label: 'source',
      color: '#3A87F7',
    },
  };

  return (
    <div>
      <ChartContainer config={chartConfig} className="min-h-[200px] h-52 w-full dark p-1">
        <BarChart accessibilityLayer data={analyticsData}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="source" tickLine={false} tickMargin={5} axisLine={false} tickFormatter={(value) => value.slice(0, 6)} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="visits" fill="var(--color-source)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default AnalyticsChart;
