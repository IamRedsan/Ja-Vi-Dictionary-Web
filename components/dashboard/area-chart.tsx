import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

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
import { Skeleton } from '@/components/ui/skeleton';

interface ChartProps {
  chartData: {
    month: string;
    count: number;
  }[];
  title: string;
  user: number;
  loading: boolean; // Added loading prop
}

const chartConfig = {
  count: {
    label: 'Số lượng',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function Chart({ chartData, title, user, loading }: ChartProps) {
  // Đảm bảo biểu đồ không hiển thị khi không có giá trị
  const minCount = Math.min(...chartData.map((item) => item.count));

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {loading ? <Skeleton className='h-6 w-1/3' /> : 'Biểu đồ vùng'}
        </CardTitle>
        <CardDescription>
          {loading ? (
            <Skeleton className='h-4 w-2/3' />
          ) : (
            'Số lượng người dùng đăng ký mới 6 tháng gần nhất.'
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className='h-40 w-full' />
        ) : (
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
              {/* Thêm YAxis để kiểm soát phạm vi hiển thị */}
              <YAxis
                domain={[Math.max(0, minCount), 'auto']}
                tickCount={5}
                axisLine={false}
                tickLine={false}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator='line' />}
              />
              <Area
                dataKey='count'
                type='linear'
                fill='var(--color-count)'
                fillOpacity={0.4}
                stroke='var(--color-count)'
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter>
        {loading ? (
          <Skeleton className='h-5 w-full' />
        ) : (
          <div className='flex w-full items-start gap-2 text-sm'>
            <div className='grid gap-2'>
              <div className='flex items-center gap-2 font-medium leading-none'>
                {`${
                  user - chartData[5].count === 0
                    ? `Tháng này tăng thêm ${chartData[5].count} người dùng`
                    : `Tháng này tăng ${
                        chartData[5].count / user - chartData[5].count * 100
                      }%`
                }`}
              </div>
              <div className='flex items-center gap-2 leading-none text-muted-foreground'>
                {title}
              </div>
            </div>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
