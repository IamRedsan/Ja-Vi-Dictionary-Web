'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
const chartData = [
  { month: 'Tháng 1', count: 186 },
  { month: 'Tháng 2', count: 305 },
  { month: 'Tháng 3', count: 237 },
  { month: 'Tháng 4', count: 73 },
  { month: 'Tháng 5', count: 209 },
  { month: 'Tháng 6', count: 214 },
];

const chartConfig = {
  count: {
    label: 'Số lượng',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function Chart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Biểu đồ vùng</CardTitle>
        <CardDescription>
          Số lượng người dùng đăng ký mới 6 tháng gần nhất.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(6)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator='line' />}
            />
            <Area
              dataKey='count'
              type='natural'
              fill='var(--color-count)'
              fillOpacity={0.4}
              stroke='var(--color-count)'
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className='flex w-full items-start gap-2 text-sm'>
          <div className='grid gap-2'>
            <div className='flex items-center gap-2 font-medium leading-none'>
              Tháng này tăng 2% <TrendingUp className='h-4 w-4' />
            </div>
            <div className='flex items-center gap-2 leading-none text-muted-foreground'>
              Tháng 1 - Tháng 7, 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
