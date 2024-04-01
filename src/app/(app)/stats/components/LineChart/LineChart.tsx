import { memo, useMemo } from 'react';
import { format } from 'date-fns';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart as Chart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { IWish } from '@/api/models/Wish';

type Props = {
  wishes: IWish[];
};

export const LineChart = memo(({ wishes }: Props) => {
  const data = useMemo(() => {
    // Group wishes by days
    const wishesByDay = wishes.reduce((acc: Record<string, IWish[]>, wish) => {
      const date = wish.dateCreated.split('T')[0]; // Extract date without time
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(wish);
      return acc;
    }, {});

    // Count wishes per day
    return Object.keys(wishesByDay).map((date) => ({
      name: format(date, 'd MMM y'),
      Count: wishesByDay[date].length,
    }));
  }, [wishes]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <Chart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="Count"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </Chart>
    </ResponsiveContainer>
  );
});

LineChart.displayName = 'LineChart';
